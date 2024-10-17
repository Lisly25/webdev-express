const bcrypt = require('bcrypt')
const { Pool } = require('pg')
const saltRounds = 10

// PostgreSQL connection configuration
const pool = new Pool({
    user: 'youruser',
    host: 'localhost',
    database: 'pokemon-db',
    password: 'yourpassword',
    port: 5432,
  })

// Register a new user
const registerUser = async (req, res) => {
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
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Username already taken' }); // 409 Conflict
    }
    console.error(error)
    res.status(500).send('Error registering user')
  }
}

// Login user
const loginUser = async (req, res) => {
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
}

module.exports = { registerUser, loginUser }