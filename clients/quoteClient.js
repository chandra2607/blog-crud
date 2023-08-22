import axios from 'axios'
const BASE_URL="https://api.quotable.io"
const quoteClient=axios.create({
    baseURL:BASE_URL,
    timeout: 10000,
    headers: {
      'Accept': 'application/json',
    }
  });
  
export default quoteClient;