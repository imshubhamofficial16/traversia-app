const User = require('../schema/users.schema');
const { PERMISSION } = require('../constant');

const {
    SHOULD_VIEW_ALL_USERS,
    SHOULD_VIEW_OWN_USERS,
    SHOULD_UPDATE_USERS,
    SHOULD_UPDATE_OWN_USERS,
    SHOULD_DELETE_ALL_USERS,
    SHOULD_DELETE_OWN_USERS
} = PERMISSION;

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.user;
        const permissions = role.permissions;

        if (permissions.includes(SHOULD_VIEW_ALL_USERS)) {
            const user = await User.findById(id);
            if (!user) throw new Error('User not found');
            res.status(200).json(user);
        } else if (permissions.includes(SHOULD_VIEW_OWN_USERS) && req.user._id === id) {
            const user = await User.findOne({ _id: id });
            if (!user) throw new Error('User not found');
            res.status(200).json(user);
        } else {
            throw new Error('You are not authorized to view the user');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}


const getUsers = async (req, res) => {
    try {
        const { role } = req.user;
        const permissions = role.permissions;

        if (permissions.includes(SHOULD_VIEW_ALL_USERS)) {
            const users = await User.find();
            res.status(200).json(users);
        } else if (permissions.includes(SHOULD_VIEW_OWN_USERS)) {
            const users = await User.find({ _id: req.user._id });
            res.status(200).json(users);
        } else {
            throw new Error('You are not authorized to view users');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

/**
 * Update a user based on permissions.
 * @param {Object} req - The request object containing parameters and body.
 * @param {Object} res - The response object to send back data.
 * @returns {Object} JSON object with updated user data or error message.
 */
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const { role } = req.user;
        const permissions = role.permissions;

        if (permissions.includes(SHOULD_UPDATE_USERS)) {
            const updatedUser = await User.findByIdAndUpdate(id, body, { new: true });
            if (!updatedUser) throw new Error('User not found');
            res.status(200).json(updatedUser);
        } else if (permissions.includes(SHOULD_UPDATE_OWN_USERS) && req.user._id === id) {
            const updatedUser = await User.findByIdAndUpdate(req.user._id, body, { new: true });
            if (!updatedUser) throw new Error('User not found');
            res.status(200).json(updatedUser);
        } else {
            throw new Error('You are not authorized to update the user');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}


const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.user;
        const permissions = role.permissions;

        if (permissions.includes(SHOULD_DELETE_ALL_USERS)) {
            const deletedUser = await User.findByIdAndDelete(id);
            if (!deletedUser) throw new Error('User not found');
            res.status(200).json({ message: 'User deleted successfully' });
        } else if (permissions.includes(SHOULD_DELETE_OWN_USERS) && req.user._id === id) {
            const deletedUser = await User.findByIdAndDelete(req.user._id);
            if (!deletedUser) throw new Error('User not found');
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            throw new Error('You are not authorized to delete the user');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}
