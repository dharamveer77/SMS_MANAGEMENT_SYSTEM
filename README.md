# SMS Management System Dashboard

This project is a web-based dashboard to manage and monitor an SMS system running on a Linux server. It consists of a Python backend using FastAPI, a React frontend, and utilizes MongoDB for data storage.

## Prerequisites

- Python 3.8+
- Node.js 14+
- MongoDB

## Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dharamveer77/SMS_MANAGEMENT_SYSTEM.git
   cd SMS-Management-System
   
2. **Setup Backend:**
   ```bash
   cd Python
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   pip install -r requirements.txt
   python app.py

3. **Setup Frontend:**
   ```bash
   cd Client\client
   npm install
   npm start

4. **Import or Connect MongoDB Database**


## Running The Application

1. **start Frontend:**
   ```bash
   cd Client\client
   npm start

1. **start Backend:**
   ```bash
   cd Python
   source venv/bin/activate
   python app.py
