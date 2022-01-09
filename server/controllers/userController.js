const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')
const RegisterValidation = require('../routes/userValidation')
const db = require('../models/dataBase')

module.exports.Login = async (req,res) => {
    const validatedData = RegisterValidation(req.body)
    if (validatedData.error){       
        return res.status(400).json({ message: validatedData.error.details[0].message })
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 8)
    req.body.password = hashedPassword
    try {
        let use = `INSERT INTO users (username, password)
                    SELECT * FROM (SELECT ?, ?) AS tmp
                    WHERE NOT EXISTS (SELECT username FROM users WHERE username=?) LIMIT 1`
        var use_params = [req.body.username, req.body.password, req.body.username]
        let after = `SELECT * FROM users WHERE username=? LIMIT 1`
        let after_params = [req.body.username]
        db.serialize(function() {
            db.all(use, use_params, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    db.all(after, after_params, (err, data) => {
                        if (err) {
                            console.log(err)
                        } else {
                            const jToken = jwt.sign(
                                                    { userId: data[0].userId }, 
                                                    process.env.jwt_secret
                                                )
                            console.log(jToken)
                            res.status(200).header("authorization", jToken).json("User Created Sucessfully")
                            
                        }
                    })
                }
            })
            
        })
    } catch (err) {
        res.status(400).json({ message: err });
    }
}