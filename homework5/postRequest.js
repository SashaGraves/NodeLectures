const axios = require('axios');
axios.post('http://localhost:8080/token', 
{ 
  username: 'Aleksandra Kulikova',
  password: 'Aleksandra_Kulikova@epam.com'
})
.then(res => {
  console.log(res.data);
})
.catch(error => {
  console.error(error)
});