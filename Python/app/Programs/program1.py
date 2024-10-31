import logging
import argparse

# Set up logging to a file
logging.basicConfig(
    filename='sms_log.log',  # Log file name
    level=logging.INFO,  # Set log level to INFO
    format='%(asctime)s - %(levelname)s - %(message)s'  # Log message format
)

# Function to send OTP via SMS
def send_otp(phone_number, proxy):
    logging.info(f"Sending Message to {phone_number} using proxy {proxy}")
    

    try:
        # response = requests.post("https://your-sms-gateway.com/send", json=data, proxies=proxies)

        logging.info(f"Message sent successfully to {phone_number}")
        return True

    except Exception as e:
        logging.error(f"Error sending SMS: {str(e)}")
        return False

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="SMS SENT")
    parser.add_argument('--phone', required=True)
    parser.add_argument('--proxy', default=None)
    
    args = parser.parse_args()
    

    send_otp(args.phone, args.proxy)
