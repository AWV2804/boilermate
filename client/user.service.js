import axios from 'axios';


API_URL = "http://100.64.134.204:8000/firebase_api/"

class UserService {

    async getTopicVideo() {
      console.log("got into function")
      const url = 'http://100.64.134.204:8000/firebase_api/scrape-youtube-videos/';
      console.log("got into function2")

      const data = {
        department: 'ECE',
        class_name: 'C',
        topic: 'HuffmanTrees'
      };
      
      try {
        const response = await axios.post(url, data);
        console.log(response.data)
        return response.data;
      } catch (error) {
        console.error('Error fetching YouTube videos:', error);
        return null;
      }

      const res = await axios.post(url);
      // const res = await axios.post(`${API_URL}scrape-youtube-videos/`);
      console.log("got into function3")
      if (res.status != 201){
        console.error("we weren't able to get the topic videos")
        return
      }
      console.log(res.data)
      return res.data
    }
}

export default new UserService();
