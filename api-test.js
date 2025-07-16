import axios from 'axios';

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIwMTk3ZDk0ZC03NzA1LTczNjAtYjZmMy04NzMyZTM5ZjRiZGQiLCJqdGkiOiI1ZDg1NzdlZTgwMjlmNGM1MGNmMjlmYzE3ZWE0MTllMmZiNTY3ZTlmODU1MzBjZGVjMWVhYjkyYjkzODZhN2QyZDk1Y2MxYmZhMWYyMWU4YSIsImlhdCI6MTc1MjUxMDE4Mi4zNzU3NjMsIm5iZiI6MTc1MjUxMDE4Mi4zNzU3NywiZXhwIjoxNzg0MDQ2MTgyLjA2NTUxNiwic3ViIjoiMSIsInNjb3BlcyI6W119.af1AbkgR6zeBcvCXpYg1zXdwo5BVLHGCZ_DvTHxp-kfCeGy8-CTjRaRrjBe84y98NUKAazsjgY7EjhpDGRRpRarfAJreD9xlPYfyZpEEFY1gTx3vPhrGBp04MzdLnELQBdzPTiSKmZsUMkozMy6QrJssqkjYUnExGoa-jOUWGtHW5mjrhm5dQnMutrsOJbjuaJ9T7reUBNf4ENq_m20-10uhk74nlzS9UC2jBfAaQfHIkXofwaiM2sTdBKEoh3L4ixXzwaeSZ6aQMauwT8diHs02IZOBIp1-Av6REkFfbQL_RCt5Xte6NHZeu21SL3p5oV1hQHZioptAGO_AYhHjO7NJecTt6qmp12JSSCqAsGXpaozqyZ1EvALSS97KAFnPAO_JlFRxe_wsHVE4cZvNiFBGqXDGGuspicFgO8dlVeuZBfvp0LuvjQEg_kwaPegt3leIYgq9Y3LoVfXHf5Na1-xI0cZTZqAvwTolId2HIPg-uktDzrCLTayfq6Jfu1aKP1e-Tug9ZpmR0NJckK4UFnpZTg6O8Cszx-PoGXXj4C_TNqxBZVGaQKrUKqf6f-Hr4S1bjw6royH8GlvWZkgBpwbYBHlvGQVWc50zpv2EZmxOSqz2CiKZynJVsh-XUtqGltlhBYdU5bmIiYRtm66iEbgaTs_j_ji525Vy-2z_qrw';
const url = 'http://127.0.0.1:8000/api/category?perPage=2&page=1&is_active=1&unpaginated=1';

axios.get(url, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error('Error:', error.response ? error.response.data : error.message);
});