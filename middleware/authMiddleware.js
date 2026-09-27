const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {

    //     authHeader.split(' ')[1] — splits "Bearer eyJhbG..." into ["Bearer", "eyJhbG..."], we take index [1], the actual token.
    // jwt.verify() — unlike jwt.sign() (used in login to create a token), verify() checks the token's signature against your JWT_SECRET and confirms it hasn't expired. Throws an error if invalid/expired/tampered.
    // next() — this is Express's way of saying "this middleware passed, continue to the actual route handler." Without calling next(), the request would hang forever.
    // req.user = decoded — this makes the logged-in user's id and role available to any route handler that runs after this middleware.

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'unauthorized: no token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}

module.exports = authMiddleware;