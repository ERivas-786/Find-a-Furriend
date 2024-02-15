import axios from 'axios';
import qs from 'qs';

export var token = ""

let data = qs.stringify({
  'grant_type': 'client_credentials',
  'client_id': 'MgbMYOfKgfzfrO6xI6Vuv8yUgpeysiqpCdwWwk4MvvuoJ5SXRz',
  'client_secret': '2Eo7Hm11yohtCaAsLFx4kWj0yE32GdP9NpLF9v7K' 
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://api.petfinder.com/v2/oauth2/token',
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data : data
};

async function makeRequest() {
  try {
    const response = await axios(config)
    token = response.data["access_token"]
    console.log(token);
  }
  catch (error) {
    console.log(error);
  }
}

makeRequest();

export default makeRequest;
