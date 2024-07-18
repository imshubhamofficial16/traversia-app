const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../schema/users.schema');

const register = async (req, res) => {
    try {
        const { name, username, password, role } = req.body;

        // Hash the password before saving the user
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser = new User({
            name,
            username,
            password: hashedPassword,
            role
        });

        // Save the user to the database
        await newUser.save();
        res.status(201).json({ message: "User Registered Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) throw new Error('User Not Found');

        // Compare the provided password with the hashed password in the database
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) throw new Error('Incorrect Password');

        // Generate a JWT token
        const token = jwt.sign(
            { userId: user._id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Prepare the response data
        const response = {
            name: user.name,
            username: user.username,
            token,
            role: user.role
        };

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: error.message });
    }
};

module.exports = {
    register,
    login
};
