const Users  = require('../Models/UserModel');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.saveUser = (req, res, next) => {

    console.log(req.body)
    const fullName = req.body.fullName;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const age = req.body.age;

    if( password !== confirmPassword) {

        const error = new Error("Passwords are not identical");
        error.statusCode = 401;
        throw error

    } else if( password === confirmPassword ) {

        Users.findOne({ email: email })
        .then( user => {
            if( user ) {
                const error = new Error('"User already existed please choose a different email"')
                return res.status(422).json({
                    message: error
                })
            }
            return bcrypt.hash(password, 12)
                
        })
        .then( hashedPass => {
            const registeredUser = new Users({
                fullName: fullName,
                email: email,
                password: hashedPass,
                age: age
            })
            return registeredUser.save()
        })
        .then( result => {
            res.status(200).json({
                message: "User successfully registered"
            })
        })
        .catch( err => {
            const error = new Error(err);
            error.statusCode = 500;
            res.status(500).json({
                error: error
            })
            next(error);
        })
    }
    
}

exports.usersLogin = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;

    try {
        const user = await Users.findOne({ email: email })
        if(!user) {
            const error = new Error("The user with the specified email doesn't exist");
            error.statusCode = 404;
            throw error;
        }

        loadedUser = user;

        const hashedPassword = await bcrypt.compare(password, user.password);
        if( !hashedPassword ) {
            const error = new Error('Wrong password');
            error.statusCode = 401;
            throw error
        }
        const token = jwt.sign({
            email: loadedUser.email,
            userId: loadedUser._id.toString()
        }, 
        "someSecretToken",
        { expiresIn: '10m' }
        )

        res.status(200).json({
                message: "Logged in successfully",
                token: token,
                userId: token.userId
            })

    } catch (err) {
        const error = new Error(err);
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error)
    }
    

}

exports.logout = (req, res, next) => {
    return jwt.destroy("token")
        .then( result => {
            res.json({
                message: "destroyed"
            })
            .catch( err => {
                return next(err)
            })
        })

}