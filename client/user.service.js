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
      console.log(response)
      return response.data;
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
      throw error;
    }
  }

  // async getTopicVideo() {

  //   // Set up the query parameters
  //   const queryParams = new URLSearchParams({
  //     department: 'ECE',
  //     class_name: 'ece 26400 - advanced C programming',
  //     topic: 'Huffman Trees'
  //   });

  //   // Combine the base URL with the serialized query parameters
  //   const urlWithParams = `${API_URL}?${queryParams.toString()}`;

  //   // Set up the headers
    // const headers = {
    //   'Accept': '*/*', // This indicates that the client can handle any type of response
    //   'Content-Type': 'application/json' // Assuming the server expects a JSON payload; adjust if necessary
    // };

  //   // Set up the Axios POST request with headers
  //   axios.post(urlWithParams, {}, { headers: headers })
  //     .then(response => {
  //       console.log('Data:', response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error:', error);
  //     });
  // }

  // async getTopicVideo(department, class_name, topic) {

  //   const queryParams = new URLSearchParams({
  //     department: department,
  //     class_name: class_name,
  //     topic: topic
  //   });

  //   const urlWithParams = `${API_URL}?${queryParams.toString()}`;

  //   const headers = {
  //     'Accept': '*/*',
  //     'Content-Type': 'application/json'
  //   };

  //   try {
  //     const response = await axios.post(urlWithParams, {}, { headers: headers })
  //     console.log(response.data)
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error fetching YouTube videos:', error);
  //     return null;
  //   }
  // }
}

export default new UserService();
