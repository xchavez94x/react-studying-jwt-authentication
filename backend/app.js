const express = require('express')
const app = express()
const port = 8080;
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const CORS = require('cors');

const blogRouter = require('./Routes/BlogRoutes')
const usersRouter = require('./Routes/UsersRoutes')

app.use(bodyParser.json());
app.use(CORS());

app.use('/blog', blogRouter)
app.use("/blog", usersRouter)

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error;
    res.status(status).json({
        message: error.message, 
        status: error.statusCode
    })
}) 

mongoose.connect('mongodb+srv://user-1:1234321@cluster0.3sjha.mongodb.net/react-blog')
    .then( result =>{
        app.listen(port, () => console.log(`Example app listening on port port!`))
    })
    .catch( err => {
        console.log( err )
    })

