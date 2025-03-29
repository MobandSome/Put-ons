require('dotenv').config();
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
// const supabase = require('./supabaseCli');
const app = express();
const port = 3000;

app.use(express.json());


// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Supabase URL and anon key from environment variables


// Authentication route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  // console.log(email)
  // console.log(password)
  console.log(supabaseUrl)
  console.log(supabaseAnonKey)

  try {
    // console.log(email);
    console.log(supabaseUrl)
    console.log(supabaseAnonKey)
    // Send request to Supabase API to authenticate the user
    const response = await axios.post(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
      email: email,
      password: password,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,

      },
      body: JSON.stringify({
        email: 'user@example.com',
        password: 'yourpassword'
      })
    });

    access_token = response.data.access_token;
 
    // Return the session and user details
    res.status(200).json({
      session: response.data.access_token,
      message: 'User authenticated successfully',
    });
  } catch (error) {
    console.log(error.apikey)
    res.status(400).json({ error: error.message});
  }
});


app.post('/logout', async (req, res) => {
  const { refreshToken } = req.body;
  console.log(refreshToken)
  try {
    const response = await axios.post(`${supabaseUrl}/auth/v1/logout`, 
      { refresh_token: refreshToken }, 
      { 
        headers: { 
          apikey: supabaseAnonKey,
          'Authorization': `Bearer ${access_token}`, 
          'Content-Type': 'application/json' 
        } ,
        body: JSON.stringify({
          refreshToken: "refreshToken"
        })
      }
    );
    res.status(200).json({ message: 'User logged out successfully',
      confirm: response.data
     });
  } catch (error) {
    res.status(400).json({ error: error.response?.data || 'Logout failed' });
  }
});

app.post('/signUp', async(req, res) => {
  const { email, password } = req.body;
  console.log(email)
  console.log(password)

  try{
    const response = await axios.post(`${supabaseUrl}/auth/v1/signup`, {
      email: email,
      password: password,
    }, {
      headers: {
        apikey: supabaseAnonKey,
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`
  },
  body: JSON.stringify({
    refreshToken: "refreshToken"
  })
});

  res.status(200).json({ message: 'User signed up successfully',
    confirm: response.data
   });
} catch (error) {
  res.status(400).json({ error: error.response?.data || 'Logout failed' });
}
});


app.get('/redirect/google', async (req, res) => {
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=openid%20email%20profile&access_type=offline&prompt=consent`;
  res.redirect(authUrl);
  // res.json({ url: authUrl });
});

app.get('/auth/google/callback', async (req, res) => {
 try {

  const { code } = req.query;

  const response = await axios.post('https://oauth2.googleapis.com/token', {
    code: code,
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    redirect_uri: GOOGLE_REDIRECT_URI,
    grant_type: 'authorization_code',
  });

  const { access_token, refresh_token } = response.data;

  const userInformation = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

   const userData = userInformation.data;

   const supabaseResponse = await axios.post(`${supabaseUrl}/auth/v1/token?grant_type=google`, {
     access_token: access_token,
     refresh_token: refresh_token,
     email: userData.email,
     user_id: userData.sub,
     user_metadata: {
       full_name: userData.name,
       avatar_url: userData.picture,
     },
   }, {
     headers: {
       apikey: supabaseAnonKey,
       'Authorization': `Bearer ${service_role_key}`,
       'Content-Type': 'application/json',
     },
   });

   console.log(supabaseResponse.data);
   res.json({message: 'User authenticated successfully', session: supabaseResponse.data.access_token, userData});
 }
 catch(error) {
  console.error('Google authentication failed:', error.response?.data || error.message);
   res.status(400).json({ error: error.response?.data || 'Google authentication failed' });
 }
}
)

// Start the backend server
app.listen(3000, () => {
  console.log('Backend server running on http://localhost:3000');
});

app.get('/', (req, res) => {
  res.send('Server is working!');
});
