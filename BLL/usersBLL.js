const usersModel = require('../models/UsersModel');
const bcrypt = require('bcrypt');
const registerUser = async (user) => {
    try {
        // Check if the user already exists
        const existingUser = await usersModel.findOne({ fullname: user.fullname });
        if (existingUser) {
            throw new Error("User already exists");
        }
        else {
        // Save the new user to the database
        let newUser = new usersModel(user);   
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(user.password, 10);
                // Save the new user to the database
        newUser = new usersModel({ ...user, password: hashedPassword });
        // Save the new user to the database
        newUser.password = hashedPassword;
        await newUser.save();
        return { message: "User registered successfully" };
        }
    } catch (error) {
        return { error: error.message };
    }
}

const getAllUsers = async () => {
    try {
        const users = await usersModel.find();
        return users;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    registerUser,
    getAllUsers
};
