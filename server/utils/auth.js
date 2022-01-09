const jwt = require('jsonwebtoken')
const db = require("../models/dataBase");

const auth = async (req,res,next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ','')
        console.log(token)
        const decoded = jwt.verify(token , process.env.jwt_secret)
        console.log(decoded)
        var findUser = `SELECT userId, username FROM users WHERE userId=?`;
        db.all(findUser, decoded.userId, (error, loggedUser) => {
            if (error) {
                console.log(error)
            } else {
                if (!loggedUser) {
                    return res.status(400).json({message: "No user exists with given id"});
                }
                else {
                    req.loggedUser = loggedUser
                    next();
                }
            }
        })
    } catch (e) {
        res.status(401).send({error : 'Please authenticate'})
    }
}

module.exports = auth