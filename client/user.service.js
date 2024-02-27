import axios from 'axios';


API_URL = "http://100.64.134.204:8000/firebase_api/";

class UserService {

  // async getTopicVideo() {
  //   console.log("got into function")
  //   const url = 'http://100.64.134.204:8000/firebase_api/scrape-youtube-videos/';
  //   // const url = 'http://127.0.0.1:8000/firebase_api/scrape-youtube-videos/';
  //   console.log(url)

  //   const data = {
  //     department: 'ECE',
  //     class_name: 'C',
  //     topic: 'HuffmanTrees'
  //   };

  //   try {
  //     const response = await axios.post(url);
  //     console.log(response.data)
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error fetching YouTube videos:', error);
  //     return null;
  //   }

  //   // const res = await axios.post(url);
  //   // // const res = await axios.post(`${API_URL}scrape-youtube-videos/`);
  //   // console.log("got into function3")
  //   // if (res.status != 201){
  //   //   console.error("we weren't able to get the topic videos")
  //   //   return
  //   // }
  //   // console.log(res.data)
  //   // return res.data
  // }

  async getTopicVideo(department, class_name, topic) {
    // const baseUrl = 'http://100.64.134.204:8000/firebase_api/scrape-youtube-videos/';
  
    const queryParams = new URLSearchParams({ department, class_name, topic });
  
    const urlWithParams = `${API_URL}scrape-youtube-videos/?${queryParams.toString()}`;
  
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
      console.error('Error fetching YouTube videos:', error);
      throw error;
    }
  }


}

export default new UserService();
