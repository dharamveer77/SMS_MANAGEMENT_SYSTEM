import bcrypt
import pymongo
import jwt
import datetime
from Config.config import Config
from Database.db import client

if client is not None:
    myDB = client['SMS-MANAGEMENT-SYSTEM']

    user_schema = {
        'validator': {
            '$jsonSchema': {
                'bsonType': 'object',
                'required': ['username', 'email', 'password'],
                'properties': {
                    'username': {
                        'bsonType': 'string',
                        'minLength': 1,
                        'description': 'must be a string and is required'
                    },
                    'email': {
                        'bsonType': 'string',
                        'description': 'must be a string and is not required'
                    },
                    'password': {
                        'bsonType': 'string',
                        'minLength': 6,
                        'description': 'must be a string and is required'
                    }
                }
            }
        }
    }

    try:
        information = myDB.create_collection('users', **user_schema)
        print("Collection 'users' created with validation.")
    except pymongo.errors.CollectionInvalid:
        information = myDB['users']  

    def create_user(username, email, password):
        # Check if the user already exists
        if information.find_one({"email": email}):
            return False, "Email already exists."
        
        if information.find_one({"username": username}):
            return False, "Username already exists."

        # Hash the password
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        
        # Create user data
        user_data = {
            "username": username,
            "email": email,
            "password": hashed_password.decode('utf-8'),  # Store as string
            "created_at": datetime.datetime.utcnow(),
            "updated_at": datetime.datetime.utcnow()
        }
        
        # Insert user data into the collection
        information.insert_one(user_data)
        return True, "User created successfully."

    def get_user_by_email(email):
        return information.find_one({"email": email})

    def verify_password(hashed_password, password):
        return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))

    def generate_jwt(user_id):
        token = jwt.encode({
            'id': str(user_id),
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        }, Config.JWT_SECRET_KEY, algorithm='HS256')
        return token
else:
    print("Failed to initialize the database. Exiting.")
