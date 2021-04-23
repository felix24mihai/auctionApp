const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { loginValidation } = require('./validation')
const databaseConfig = require('../config/config.js');
const reqeust_promise = require('request-promise');

const signToken = function token(payload) {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, privatekey, { algorithm: "RS256" }, function(err, token2) {
        if (err) reject(err);
        else resolve(token2)
      });
    })
  }

const loginUser = async (req,res) => {
   // Data validation before creating a user
    const { error } = loginValidation(req.query);
    if (error)
        return res.status(400).send(error.details[0].message);
    let uri = databaseConfig.database_config.protocol+databaseConfig.database_config.url+":"+databaseConfig.database_config.port + 
              databaseConfig.database_config.read_api+`?email=${req.query.email}&password=${req.query.password}`;
    reqeust_promise(uri ).then(body => {
        var token = jwt.sign(body, databaseConfig.server_options.private_key);
        res.status(200).send({jwt:token});
        }).catch(err => {
        console.log(err);
        res.status(400).send(err);
        });


  

};

module.exports = {loginUser};