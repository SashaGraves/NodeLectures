const axios = require('axios');
axios.post('http://localhost:8080/token', 
{ 
  username: 'Aleksandra_Kulikova@epam.com',
  password: 'Aleksandra_Kulikova'
})
.then(res => {
  console.log(res.data);
})
.catch(error => {
  console.error(error)
});