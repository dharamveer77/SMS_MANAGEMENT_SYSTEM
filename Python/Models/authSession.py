import pymongo
from Database.db import client
import datetime


if client is not None:
    myDB = client['SMS-MANAGEMENT-SYSTEM'] 
    session_schema = {
        'validator': {
            '$jsonSchema': {
                'bsonType': 'object',
                'required': ['id', 'operator', 'reciever', 'recieverOperator', 'sender', 'message', 'proxy', 'status'],
                'properties': {
                    'session_id': {
                        'bsonType': 'string',
                        'description': 'must be a string and is required'
                    },
                    'proxy': {
                        'bsonType': 'string',
                        'description': 'must be a string and is required'
                    },
                    'message': {
                        'bsonType': 'string',
                        'description': 'must be a string and is required'
                    },
                    'operator': {
                        'bsonType': 'string',
                        'description': 'must be a string and is not required'
                    },
                    'reciever': {
                        'bsonType': 'string',
                        'description': 'must be a string and is required'
                    },
                    'recieverOperator': {
                        'bsonType': 'string',
                        'description': 'must be a string and is required'
                    },
                    'sender': {
                        'bsonType': 'string',
                        'description': 'must be a string and is required'
                    },
                    'status': {
                        'bsonType': 'string',
                        'description': 'must be a string and is required'
                    }
                }
            }
        }
    }

    try:
        information = myDB.create_collection('session-information', **session_schema)
        print("Collection 'session-information' created with validation.")
    except pymongo.errors.CollectionInvalid:
        information = myDB['session-information'] 

    def create_sessions(session_id, operator, reciever, recieverOperator, sender, message, proxy, status): 
        
        session_data = {
                "session_id": session_id,
                "proxy": proxy,
                "message": message,
                "operator": operator,
                "reciever": reciever,
                "recieverOperator": recieverOperator,
                "sender": sender,
                "status": status,
                "created_at": datetime.datetime.utcnow(),
                "updated_at": datetime.datetime.utcnow()
            }
            
        information.insert_one(session_data)
        return True, "Session created successfully."