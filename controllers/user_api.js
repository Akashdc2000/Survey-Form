const userModel = require('../models/users_model')


const bcrypt = require('bcrypt');
const saltRounds = 10;


//Add new User
const register = async (request, response) => {

    const { firstname, lastname, email, mobile,password } = request.body;

    const existingUser = await userModel.findOne({ email: email })
    if (existingUser) {
        return response.status(400).json({ message: 'User already exists' });
    }

    const hashPassword = await bcrypt.hash(password, saltRounds);
    const result = await userModel.create({
        firstname: firstname,
        lastname: lastname,
        email: email,
        mobile:mobile,
        password: hashPassword
    })
    result.save((error, doc) => {
        if (error)
            response.send(error);
        else
            response.send(doc)
    })
}


//Get all Users
const getall = async (request, response) => {
    try {
        const result = await userModel.find({});
        response.status(200).json({
            "msg": `Total ${result.length} Users`,
            "Users": result
        })
    } catch (error) {
        response.send(error)
    }
}


//Login 
const login = async (request, response) => {
    const { email, password } = request.body;

    const existingUser = await userModel.findOne({ email: email })
    if (!existingUser) {
        return response.status(401).json({ message: 'User Not exists' });
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
        return response.status(401).json({ message: 'Invalid Credentials' });
    }
    response.status(201).json({ "msg": "Login Successfully done..." })

}


//Update User Details

const update = async (request, response) => {
    const { firstname, lastname, email,mobile, password } = request.body;

    const hashPassword = await bcrypt.hash(password, saltRounds);

    const user = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        mobile:mobile,
        password: hashPassword
    }

    const id = request.params._id
    try {
        userModel.findByIdAndUpdate(id, user,(error, doc) => {
            if (error) response.status(404).json(error)
            if (!doc)
                response.status(404).json({ "msg": "User Not Present in Database...." })
            else
                response.status(200).json({
                    "msg": `Following User Updated Succesfully...`,
                    "User": user
                })
        });

    } catch (error) {
        response.status(404).json({ "msg": "User Not Present in Database...." })
    }
}

//Delete User Details
const deleteUser = async (request, response) => {

    const id = request.params._id;
    try {
        userModel.findByIdAndDelete(id, (error, doc) => {
            if (error) response.status(404).json(error)
            if (!doc)
                response.status(404).json({ "msg": "User Not Present in Database...." })
            else
                response.status(200).json({
                    "msg": `Following User Deleted Succesfully...`,
                    "User": doc
                })
        });

    } catch (error) {
        response.status(404).json({ "msg": "User Not Present in Database...." })
    }
}

module.exports = {
    getall, register, update, login, deleteUser
}
