// Import the express lirbary
const express = require('express')

// Import the axios library, to make HTTP requests
const axios = require('axios')

const querystring = require('querystring');

// This is the client ID and client secret that you obtained
// while registering the application
const clientID = 'client id here'
const clientSecret = 'client secret here'

// Create a new express application and use
// the express static middleware, to serve all files
// inside the public directory
const app = express()
app.use(express.static(__dirname + '/public'))

app.get('/oauth/redirect', async (req, res) => {
  // The req.query object has the query params that
  // were sent to this route. We want the `code` param
  const requestToken = req.query.code
  console.log('request token', requestToken);

  const {
    data: { access_token: accessToken, id_token: idToken },
  } = await axios.post(
    'https://accounts.dev1.stockx.io/oauth/token',
    querystring.stringify({
      grant_type: 'authorization_code',
      client_id: `${clientID}`,
      client_secret: `${clientSecret}`,
      code: `${requestToken}`,
      redirect_uri: 'http://localhost:8080/oauth/redirect',
    }),
    {
      headers: {'content-type': 'application/x-www-form-urlencoded' },
    },
  );

  res.redirect(`/welcome.html?access_token=${accessToken}`);



  // axios({
  //   // make a POST request
  //   method: 'post',
  //   // to the Github authentication API, with the client ID, client secret
  //   // and request token
  //   url: `https://accounts.dev1.stockx.io/oauth/token?grant_type=authorization_code&client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}&redirect_uri=http://localhost:8080/oauth/redirect`,
  //   // Set the content type header, so that we get the response in JSOn
  //   headers: {
  //     accept: 'application/json'
  //   }
  // }).then((response) => {
  //   // Once we get the response, extract the access token from
  //   // the response body
  //   const accessToken = response.data.access_token
  //   // redirect the user to the welcome page, along with the access token
  //   res.redirect(`/welcome.html?access_token=${accessToken}`)
  // })
})

// Start the server on port 8080
app.listen(8080, ()=>{
  console.log(`Listening on port 8080`)
})
