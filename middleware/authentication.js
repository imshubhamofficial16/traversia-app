const jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {
    try {
        const authHeader = req.get('Authorization');
        if (!authHeader) {
            return res.status(401).json({ message: 'Authentication token is required for this request' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Authentication token is required for this request' });
        }

        const secret = process.env.JWT_SECRET;

        jwt.verify(token, secret, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid or expired token' });
            }

            if (!user) {
                return res.status(403).json({ message: 'Invalid or expired token' });
            }

            req.user = user;
            next();
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { authentication };
