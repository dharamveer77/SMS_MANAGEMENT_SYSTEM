import requests
import subprocess
from datetime import datetime, timedelta, timezone
from Config.config import Config




def send_telegram_message(message):
    url = f"https://api.telegram.org/bot{Config.TELEGRAM_BOT_TOKEN}/sendMessage"
    payload = {
        'chat_id': Config.CHAT_ID,
        'text': message,
        'parse_mode': 'HTML'
    }
    response = requests.post(url, data=payload)
    return response.ok

def get_success_rate(country_operator, time_range_minutes=60):
    time_threshold = datetime.now(timezone.utc) - timedelta(minutes=time_range_minutes)

    total_sms_count = sms_log.count_documents({
        "country_operator": country_operator,
        "timestamp": {"$gte": time_threshold}
    })

    if total_sms_count == 0:
        return 0

    successful_sms_count = sms_log.count_documents({
        "country_operator": country_operator,
        "status": True,
        "timestamp": {"$gte": time_threshold}
    })

    success_rate = (successful_sms_count / total_sms_count) * 100
    return round(success_rate, 2)

def check_success_rate(country_operator, success_rate_threshold=80):
    success_rate = get_success_rate(country_operator)
    if success_rate < success_rate_threshold:
        message = (
            f"⚠️ <b>Alert:</b> Success rate for {country_operator} "
            f"has dropped to {success_rate}% at {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
        )
        send_telegram_message(message)

def check_program_status(program_name):
    try:
        output = subprocess.check_output(["screen", "-list", program_name], text=True)
        if program_name not in output:
            raise subprocess.CalledProcessError(1, ["screen", "-list", program_name])
    except subprocess.CalledProcessError:
        message = (
            f"❌ <b>Alert:</b> Program {program_name} has stopped unexpectedly "
            f"at {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
        )
        send_telegram_message(message)
