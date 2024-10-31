import subprocess
import logging

def manage_screen_session(action, session_name, script_path, phone_number=None, proxy=None):
    try:
        args = []
        if phone_number:
            args.append(f"--phone {phone_number}")
        if proxy:
            args.append(f"--proxy {proxy}")
        
        args_str = " ".join(args)
        
        if action == "start":
            command = f"screen -dmS {session_name} python {script_path} {args_str}"
            result = subprocess.run(command, shell=True, capture_output=True, text=True)
            output = subprocess.run("screen -ls", shell=True, capture_output=True, text=True)

            if result.returncode != 0:
                logging.error(f"Command failed: {result.stderr}")
                return {"error": f"Failed to start session: {result.stderr}"}

            return output.stdout

        elif action == "stop":
            subprocess.run(f"screen -S {session_name} -X quit", shell=True, check=True)
            logging.info("Session Stopped")
            return {"message": f"Stopped session {session_name}"}
        
        elif action == "restart":
            subprocess.run(f"screen -S {session_name} -X quit", shell=True, check=True)
            command = f"screen -dmS {session_name} python {script_path} {args_str}"
            logging.info(f"Running command: {command}")
            result = subprocess.run(command, shell=True, capture_output=True, text=True)

            if result.returncode != 0:
                logging.error(f"Command failed: {result.stderr}")
                return {"error": f"Failed to restart session: {result.stderr}"}
            
            return {"message": f"Restarted session {session_name} with script {script_path}"}

    except subprocess.CalledProcessError as e:
        logging.error(f"Subprocess error: {str(e)}")
        return {"error": f"Error executing command: {str(e)}"}
    except Exception as e:
        logging.error(f"General error: {str(e)}")
        return {"error": f"General error: {str(e)}"}
