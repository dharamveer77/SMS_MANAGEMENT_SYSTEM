import axios from "axios";

const url = "http://localhost:8000";

export const authenticateSignup = async (user) => {
  try {
    return await axios.post(`${url}/register`, user);
  } catch (error) {
    console.log("Error while calling Signup API: ", error);
  }
};

export const authenticateLogin = async (user) => {
  try {
    return await axios.post(`${url}/login`, user);
  } catch (error) {
    console.log("Error while calling login API: ", error);
  }
};

export const authenticateLogout = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.post(
      `${url}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log("Error while calling logout API: ", error);
    return null;
  }
};

export const sessionCreation = async (session) => {
  try {
    return await axios.post(`${url}/start_session`, session);
  } catch (error) {
    console.log("Error while calling login API: ", error);
  }
};

export const sessionDestroy = async (data) => {
  try {
    return await axios.post(`${url}/stop_session`, data);
  } catch (error) {
    console.log("Error while calling Session Deactivation API: ", error);
  }
};


export const sessionDetails = async () => {
  try {
      return await axios.get(`${url}/session_information`);
  } catch (error) {
      console.log('Error while getting Session Details', error);
  }
}

export const statBoxDetails = async () => {
  try {
      return await axios.get(`${url}/statbox_data`)
  } catch (error) {
    console.log('Error while getting statBox Details', error);
  }
}
export const getSmsData = async () => {
  try {
      return await axios.get(`${url}/sms_logs`)
  } catch (error) {
    console.log('Error while getting sms logs', error);
  }
}
