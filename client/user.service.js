import axios from 'axios';


API_URL = "http://127.0.0.1:8000/firebase_api/";

class UserService {

  async getTopicVideo(department, class_name, topic) {
    // const baseUrl = 'http://100.64.134.204:8000/firebase_api/scrape-youtube-videos/';
    console.log("user_service class:", class_name);
    console.log("user_service topic:", topic);
    const queryParams = new URLSearchParams({ department, class_name, topic });
  
    const urlWithParams = `${API_URL}scrape-website-data/?${queryParams.toString()}`;
    console.log("url: ", urlWithParams);
    const headers = {
      'Accept': '*/*', // This indicates that the client can handle any type of response
      'Content-Type': 'application/json' // Assuming the server expects a JSON payload; adjust if necessary
    };
  
    // The actual Axios POST request
    try {
      const response = await axios.post(urlWithParams, {}, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
      throw error;
    }
  }
  async getUser(username) {
    const queryParams = new URLSearchParams({ username });
  
    const urlWithParams = `${API_URL}handle-user/?${queryParams.toString()}`;
    try {
      const response = await axios.get(urlWithParams, {});
      console.log(response)
      return response.data;
    } catch (error) {
      console.error('Error fgetting user:', error);
      throw error;
    }
  }
  
  async askQuestion(question) {
    const url = `${API_URL}chat/`; // Endpoint for ChatGPT API
    const headers = {
      'Content-Type': 'application/json'
    };
  
    try {
      const response = await axios.post(url, { question }, { headers });
      return response.data;
    } catch (error) {
      console.error('Error asking question:', error);
      throw error;
    }
  }

}

export default new UserService();
