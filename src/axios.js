import axios from 'axios';

const instant = axios.create({
  baseURL: 'https://my-burger-9ae73.firebaseio.com/'
});

export default instant;