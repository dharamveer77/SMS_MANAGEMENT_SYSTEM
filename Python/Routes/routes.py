import re
from flask import Blueprint, request, jsonify
from flask_pymongo import PyMongo
from app.process_manager import manage_screen_session
from Models.authUser import create_user, get_user_by_email, verify_password, generate_jwt
from Models.authSession import create_sessions
from Database.db import client, initialize_database
from bson import ObjectId


api = Blueprint('api', __name__)
mongo = PyMongo()

client = initialize_database()
myDB = client['SMS-MANAGEMENT-SYSTEM']

# Session Start / Stop / Restart
@api.route('/start_session', methods=['POST'])
def start_screen_session():
    data = request.json
    session_created = create_sessions(
        session_id=data.get('id'),
        proxy=data.get('proxy'),
        message=data.get('message'),
        operator=data.get('operator'),
        reciever=data.get('reciever'),
        recieverOperator=data.get('recieverOperator'),
        sender=data.get('sender'),
        status=data.get('status')
    )
    session_name = data.get('id')
    script_path = "app/Programs/program1.py"
    phone_number = data.get('reciever')
    proxy = data.get('proxy')


    response = manage_screen_session('start', session_name, script_path, phone_number, proxy)
    if not response:
        return jsonify({"message": "Session Failed"}), 401
    
    return jsonify({"message": response}), 201

@api.route('/stop_session', methods=['POST'])
def stop_session():
    data = request.json
    session_name = data.get('session_id')
    session_status = data.get('status')

    # Check if required parameter is present
    if not session_name:
        return jsonify({"error": "Missing required parameter: session_name"}), 400
    
    response = manage_screen_session('stop', session_name, script_path=None, phone_number=None, proxy=None)

    try:
        session_id = ObjectId(session_name)
        status = session_status
    except Exception as e:
        return jsonify({"error": "Invalid session_id format"}), 400
    
    result =myDB['session-information'].update_one(
        {"_id": session_id}, 
        {"$set": {"status": status}} 
    )

    # Handle errors from the subprocess manager
    if result.matched_count == 0:
        return jsonify({"error": "Session not found"}), 404

    return jsonify("message", "Session stopped"), 200


# User Login Authentication
@api.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    

    user_created = create_user(
        username=data.get('username'),
        email=data.get('email'),
        password=data.get('password'),
    )
    
    if not user_created:
        return jsonify({"message": "User already exists"}), 400  # User exists response

    return jsonify({"message": "User created"}), 201

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = get_user_by_email(data.get('email'))
    
    if user and verify_password(user['password'], data.get('password')):
        token = generate_jwt(user['_id'])
        return jsonify({"token": token, "success": True}), 200

    return jsonify({"message": "Login failed"}), 401

@api.route('/logout', methods=['POST'])
def logout():
    return jsonify({"message": "Logged out successfully."}), 200


@api.route('/session_information', methods=['GET'])
def get_all_sessions(): 
    sessions = myDB['session-information'].find()
    session_list = []
    for session in sessions:
        session['_id'] = str(session['_id']) 
        session_list.append(session)

    return jsonify(session_list), 200


@api.route('/statbox_data', methods=['GET'])
def get_statbox_data():
    details = myDB['sms-information'].find_one() 

    if details:
        
        details['_id'] = format(details['_id'])

       
        data = {
            "totalSmsSent": details.get("totalSmsSent"),
            "totalSmsSentProgress": details.get("totalSmsSentProgress"),
            "totalSmsSentIncrease": details.get("totalSmsSentIncrease"),
            "smsSendingRate": details.get("smsSendingRate"),
            "smsSendingRateProgress": details.get("smsSendingRateProgress"),
            "smsSendingRateIncrease": details.get("smsSendingRateIncrease"),
            "smsFailureRate": details.get("smsFailureRate"),
            "smsFailureRateProgress": details.get("smsFailureRateProgress"),
            "smsFailureRateIncrease": details.get("smsFailureRateIncrease"),
            "totalDeliveries": details.get("totalDeliveries"),
            "totalDeliveriesProgress": details.get("totalDeliveriesProgress"),
            "totalDeliveriesIncrease": details.get("totalDeliveriesIncrease"),
            "createdAt": details.get("createdAt"),
            "updatedAt": details.get("updatedAt"),
        }

        return jsonify(data), 200

    return jsonify({"error": "No data found"}), 404


def parse_log_file(file_path):
    sms_data = []

    with open(file_path, 'r') as file:
        for line in file:
            # Use regex to extract relevant information
            match_send = re.search(r'(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}),\d{3} - INFO - Sending Message to (\d+) using proxy (\d+)', line)
            match_success = re.search(r'(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}),\d{3} - INFO - Message sent successfully to (\d+)', line)

            if match_send:
                timestamp = match_send.group(1)
                phone_number = match_send.group(2)
                proxy = match_send.group(3)

                sms_data.append({
                    "timestamp": timestamp,
                    "action": "sending",
                    "phone_number": phone_number,
                    "proxy": proxy
                })

            elif match_success:
                timestamp = match_success.group(1)
                phone_number = match_success.group(2)

                sms_data.append({
                    "timestamp": timestamp,
                    "action": "sent",
                    "phone_number": phone_number
                })

    return sms_data

@api.route('/sms_logs', methods=['GET'])
def get_smslog():
    log_file_path = './sms_log.log'  # Replace with your actual log file path
    sms_logs = parse_log_file(log_file_path)
    return jsonify(sms_logs), 200


