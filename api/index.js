const path = require('path');
const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')

const port = process.env.PORT
const app = express();

const connect = async () => {
    try {
        const conn = await mongoose.connect(process.env.URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch(error) {
        console.log(error)
    }
}


connect()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/user', require('./routes/user.route'))
app.use('/api/group', require('./routes/group.route'))
app.use('/api/event', require('./routes/event.route'))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
  
    app.get('*', (req, res) =>
      res.sendFile(
        path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
      )
    );
  } else {
    app.get('/', (req, res) => res.send('Please set to production'));
  }


app.listen(port, () => console.log(`Server started on port ${port}`))