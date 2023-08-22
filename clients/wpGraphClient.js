import axios from 'axios'
const BASE_URL="http://graphql-with-wp.test/graphql"
const wpGrpahClient=axios.create({
    baseURL:BASE_URL,
    timeout: 10000,
    headers: {
      'Accept': 'application/json',
    }
  });
  
export default wpGrpahClient;