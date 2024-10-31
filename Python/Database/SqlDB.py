#I made it earlier but i don't use this file for any Database Configuration

import re
import mysql.connector
from mysql.connector import Error


def insert_sms_log(date, sender_number, proxy):
    try:
        connection = mysql.connector.connect(
            host='localhost',         
            user='user',
            password="root@123",
            database='sms_management_system'
        )

        if connection.is_connected():
            cursor = connection.cursor()


            sql_insert_query = """INSERT INTO sms_log (date, sender_number, proxy) VALUES (%s, %s, %s)"""
            data_tuple = (date, sender_number, proxy)


            cursor.execute(sql_insert_query, data_tuple)
            connection.commit() 
            print("Record inserted successfully into sms_log table")

    except Error as e:
        print("Error while connecting to MySQL", e)

    finally:

        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed")

def parse_sms_log(file_path):
    with open(file_path, 'r') as file:
        for line in file:
            send_message_match = re.search(r'INFO - Sending Message to (\d+) using proxy (\d+)', line)
            sent_successfully_match = re.search(r'INFO - Message sent successfully to (\d+)', line)

            if send_message_match:

                phone_number = send_message_match.group(1)
                proxy_number = send_message_match.group(2)
                timestamp = line.split(' - ')[0]

                insert_sms_log(timestamp, phone_number, proxy_number)

            if sent_successfully_match:
                phone_number = sent_successfully_match.group(1)
                timestamp = line.split(' - ')[0]

log_file_path = '../sms_log.log'
parse_sms_log(log_file_path)
