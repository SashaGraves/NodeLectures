const axios = require('axios');
axios.get('http://localhost:8080/', {headers: {
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFsZWtzYW5kcmEgS3VsaWtvdmEiLCJpYXQiOjE2MTI3ODgyMDgsImV4cCI6MTYxMjgwOTgwOH0.eDTWYx1D_trJDHHLnW9tpieRKWM27PgWbOSBMrvyOW0'
}})
.then(res => {
  console.log(res.data);
})
.catch(error => {
  console.error(error)
});