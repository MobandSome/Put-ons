require('dotenv').config();
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
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

// Start the backend server
app.listen(3000, () => {
  console.log('Backend server running on http://localhost:3000');
});

app.get('/', (req, res) => {
  res.send('Server is working!');
});
