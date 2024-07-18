const Items = require('../schema/items.schema');
const { PERMISSION } = require('../constant');

const {
    SHOULD_VIEW_ALL_ITEMS,
    SHOULD_VIEW_OWN_ITEMS,
    SHOULD_UPDATE_ITEMS,
    SHOULD_UPDATE_ALL_ITEMS,
    SHOULD_UPDATE_OWN_ITEMS,
    SHOULD_DELETE_ALL_ITEMS,
    SHOULD_DELETE_OWN_ITEMS
} = PERMISSION;


const createItem = async (req, res) => {
    try {
        const { name, description, owner } = req.body;
        const user = req.user;

        const newItem = new Items({
            name,
            description,
            owner: owner || user._id,
        });

        const response = await newItem.save();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;

        const { role } = user;
        const permissions = role.permissions;

        let item;

        if (permissions.includes(SHOULD_VIEW_ALL_ITEMS)) {
            item = await Items.findById(id);
        } else if (permissions.includes(SHOULD_VIEW_OWN_ITEMS)) {
            item = await Items.findOne({ _id: id, owner: user._id });
        } else {
            throw new Error('You are not authorized to access the item');
        }

        res.status(200).json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const getItems = async (req, res) => {
    try {
        const user = req.user;
        const { role } = user;
        const permissions = role.permissions;

        let items;

        if (permissions.includes(SHOULD_VIEW_ALL_ITEMS)) {
            items = await Items.find();
        } else if (permissions.includes(SHOULD_VIEW_OWN_ITEMS)) {
            items = await Items.find({ owner: user._id });
        } else {
            throw new Error('You are not authorized to access the items');
        }

        res.status(200).json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const user = req.user;

        const { role } = user;
        const permissions = role.permissions;

        let item;

        if (permissions.includes(SHOULD_UPDATE_ALL_ITEMS)) {
            item = await Items.findByIdAndUpdate(id, body, { new: true });
        } else if (permissions.includes(SHOULD_UPDATE_OWN_ITEMS) && user._id.toString() === id) {
            item = await Items.findByIdAndUpdate(id, body, { new: true });
        } else {
            throw new Error('You are not authorized to update the item');
        }

        res.status(200).json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;

        const { role } = user;
        const permissions = role.permissions;

        let item;

        if (permissions.includes(SHOULD_DELETE_ALL_ITEMS)) {
            item = await Items.findByIdAndDelete(id);
        } else if (permissions.includes(SHOULD_DELETE_OWN_ITEMS) && user._id.toString() === id) {
            item = await Items.findByIdAndDelete(id);
        } else {
            throw new Error('You are not authorized to delete the item');
        }

        res.status(200).json({ message: 'Item deleted successfully', item });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createItem,
    getItemById,
    getItems,
    updateItem,
    deleteItem
};
