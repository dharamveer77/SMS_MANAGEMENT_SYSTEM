from flask_pymongo import PyMongo
from Config.config import Config
import pymongo

mongo = PyMongo()

def initialize_database():
    try:
        client = pymongo.MongoClient(Config.MONGO_URI)
        client.admin.command('ping')
        print("Database connected successfully.")
        return client
    except Exception as e:
        print("Database connection failed:", e)
        return None


client = initialize_database()