import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
  
    // Remove Bearer from string
    token = token.replace(/^Bearer\s+/, "");
  
    if (token) {
      jwt.verify(token, "camargo", (err, decoded) => {
        if (err) {
          return res.json({
            success: false,
            message: 'Token is not valid'
          });
        }
        req.decoded = decoded;
        next();
      });
    } else {
      return res.json({
        success: false,
        message: 'Token not provided'
      });
    }
  };