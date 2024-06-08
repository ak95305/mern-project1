const Validator = require('validatorjs')
const User = require('../models/user');
const HttpError = require('../models/http-error');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// get salt for bcrypt
const salt = bcrypt.genSaltSync(10);

const signup = async (req, res, next) => {
    let { email, password, name } = req.body;

    const data = {
        email: email,
        password: password,
        name: name
    }

    const rules = {
        email: 'required|email',
        password: 'required',
        name: 'required|min:3'
    }

    const validation = new Validator(data, rules)
    
    if(validation.fails()){
        const errors = validation.errors
        res.status(400)
        res.json({errors: errors})
    }

    let user;
    try{
        user = await User.findOne({ email: email })
        if(user === null) {
            user = new User({
                name: name,
                email: email,
                password: bcrypt.hashSync(password, salt)
            });
            user = await user.save()
        } else {
            const error = new HttpError('User Already Exits!', 400)
            return next(error)
        }
    } catch (err) {
        console.log(err)
        const error = new HttpError("Unable to signup user", 400)
        return next(error)
    }

    res.status(200)
    res.json({ user })
}

const login = async (req, res, next) => {
    const { email, password } = req.body

    const data = {
        email: email,
        password: password,
    }

    const rules = {
        email: 'required|email',
        password: 'required',
    }

    const validation = new Validator(data, rules)
    
    if(validation.fails()){
        const errors = validation.errors
        res.status(400)
        res.json({errors: errors})
    }

    let user;
    try{
        user = await User.findOne({ email: email })
        if(user == null){
            const error = new HttpError("User not found!", 404)
            return next(error)
        }
        if(bcrypt.compareSync(password, user.password)){
            user.token = jwt.sign({ userId: user.id, email: user.email }, "secret", { expiresIn: '1h', algorithm: 'HS256' });
    
            await user.save()

            res.status(200)
            res.json({ user })
        } else {
            const error = new HttpError("Password not correct", 400)
            return next(error)
        }

    } catch (err) {
        console.log(err)
        const error = new HttpError("Unable to login user", 400)
        return next(error)
    }
}

const logout = async (req, res, next) => {
    if(req.userData == undefined) {
        const error = new HttpError('User not logged in', 400)
        return next(error)
    }

    try{
        const user = await User.findOne({ id: req.userData.id })
        
        user.token = null
        user.save()
        
    } catch (err) {
        const error = new HttpError('User not logged in', 400)
        return next(error)
    }

    res.status(200)
    res.json({ userData: req.userData })
}


exports.signup = signup
exports.login = login   
exports.logout = logout   