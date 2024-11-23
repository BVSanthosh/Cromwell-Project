const jwt = require('jsonwebtoken');

//middleware for authenticating JWT tokens and is used for protected routes
exports.authenticateToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Access Denied'
        });
    }

    try {
        jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
            if (error) {
                return res.status(401).json({
                    success: false,
                    message: 'Access Denied'
                });
            }

            req.userId = decoded.id;
            next();
        });
    } catch(error) {
        console.error(`Error verifying token: ${error}`);
        res.status(403).json({
            success: false,
            message: 'Invalid Token'
        });
    }
}