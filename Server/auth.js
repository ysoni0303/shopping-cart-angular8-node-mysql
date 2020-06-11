const jwt = require('jsonwebtoken');
var randtoken = require('rand-token');
require('dotenv').config();
import Sequelize from 'sequelize';
import sequelize from './config/database';

var tokenArr = [];

function jswToken(email) {
    var refreshToken = randtoken.uid(128);
    const payload = {
        email: email,
        refreshToken: refreshToken,
        time: new Date()
    };
    var token = jwt.sign(payload, process.env.jwtSecret, {
        expiresIn: process.env.tokenExpireTime
    });

    tokenArr.push(token);
    tokenArr.push(refreshToken);
    return tokenArr;
}

function refreshToken(email, refreshToken) {
    const payload = {
        email: email,
        refreshToken: refreshToken,
        time: new Date()
    };

    var token = jwt.sign(payload, process.env.jwtSecret, {
        expiresIn: process.env.tokenExpireTime
    });
    return token;
}

async function storeRefreshToken(email, refreshToken) {
    try{
        const updateUser = Promise.resolve(await sequelize.query(`UPDATE users SET 
        accesstoken='${refreshToken}' 
        WHERE email='${email}' `, 
        { type: Sequelize.QueryTypes.SELECT }));   
    }catch(err){
        console.log();
    }
    
}

module.exports = {
    jswToken: jswToken,
    refreshToken: refreshToken,
    storeRefreshToken: storeRefreshToken
}

