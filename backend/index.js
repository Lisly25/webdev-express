const express = require('express')
const axios = require('axios')
const { Pool } = require('pg')
const bcrypt = require('bcrypt')
const saltRounds = 10

const port = 3000;
const app = express()

app.use(express.json())

// PostgreSQL connection configuration
const pool = new Pool({
    user: 'youruser',
    host: 'localhost',
    database: 'pokemon-db',
    password: 'yourpassword',
    port: 5432,
  })

app.get('/', async (req, res) => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=42')
      res.json(response.data.results)
    } catch (error) {
      console.error(error)
      res.status(500).send('Error fetching data from PokeAPI')
    }
})
/* app.get('/', async (req, res) => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=42')
      res.json(response.data.results)
    } catch (error) {
      console.error(error)
      res.status(500).send('Error fetching data from PokeAPI')
    }
}) */

app.post('/register', async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).send('Username and password are required')
  }

  try {
    const hash = await bcrypt.hash(password, saltRounds)
    const query = 'INSERT INTO users (username, password) VALUES ($1, $2)'
    await pool.query(query, [username, hash])
    res.status(201).send('User registered')
  } catch (error) {
    console.error(error)
    res.status(500).send('Error registering user')
  }
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).send('Username and password are required')
  }

  try {
    const query = 'SELECT * FROM users WHERE username = $1'
    const result = await pool.query(query, [username])

    if (result.rows.length === 0) {
      return res.status(401).send('Invalid username or password')
    }

    const user = result.rows[0]
    const match = await bcrypt.compare(password, user.password)

    if (match) {
      // TODO: Implement session management
      res.send('Login successful')
    } else {
      res.status(401).send('Invalid username or password')
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Error logging in')
  }
})


app.listen(port, () => {
  console.log(`Hello from port ${port}`)
})
