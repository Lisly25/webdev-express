const express = require('express')
const session = require('express-session')
const { registerUser, loginUser, logoutUser, isAuthenticated } = require('./userController')
const pokemonRoutes = require("./routes/pokemonRoutes");
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const { handleError } = require("./middlewares/errorMiddleware");

const port = 3000
const app = express()

app.use(express.json())


app.use(session({
  secret: 'yourSecretKey', // Replace with your own secret key
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60, // Session duration (1 hour)
    secure: false, // Set to true if using HTTPS
    httpOnly: true // Prevents JavaScript access to the cookie
  }
}))

// Base URL endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'Hello from internal API'
  })
})

app.use("/api/pokemon", pokemonRoutes);
app.use("/api/user", userRoutes);
app.use("/api/profile", profileRoutes);

app.post('/api/register', registerUser)
app.post('/api/login', loginUser)
app.post('/api/logout', logoutUser)

// Check if the user is logged in
app.get('/api/auth/check', (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

//middleware
app.use(handleError);

app.listen(port, () => {
  console.log(`Hello from port ${port}`)
})
