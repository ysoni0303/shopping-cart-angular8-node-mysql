import productModel from '../model/product.model';
var request = require('request');
var querystring = require('querystring');

async function getProductList(req, res, next) {
    let products = await productModel.getProductList();
    if (products.length === 0) {
        res.json({ 'status': 'failed', 'message': 'Product not find' });
        res.end();
        return;
    } else {
        res.json({ 'status': 'success', 'products': products });
        res.end();
    }
}

async function getProductById(req, res, next) {
    let products = await productModel.getProductListById(req.query.id);
    if (products.length === 0) {
        res.json({ 'status': 'failed', 'message': 'Product not find' });
        res.end();
        return;
    } else {
        res.json({ 'status': 'success', 'product': products });
        res.end();
    }
}

function paypal(req, res) {
    var config = {
        "VERSION": process.env.PAYPAL_VERSION,
        "SIGNATURE": process.env.PAYPAL_SIGNATURE,
        "USER": process.env.PAYPAL_USER,
        "PWD": process.env.PAYPAL_PWD,
        "METHOD": "DoDirectPayment",
        "PAYMENTACTION": "Sale",
        "AMT": req.body.AMT,
        "CREDITCARDTYPE": req.body.CREDITCARDTYPE,
        "ACCT": req.body.ACCT,
        "EXPDATE": req.body.EXPDATE,
        "CVV2": req.body.CVV2,
        "FIRSTNAME": req.body.FIRSTNAME,
        "LASTNAME": req.body.LASTNAME,
        "STREET": req.body.STREET,
        "CITY": req.body.CITY,
        "STATE": req.body.STATE,
        "ZIP": req.body.ZIP,
        "COUNTRYCODE": req.body.COUNTRYCODE
    }
   
    var postData = querystring.stringify(config);
    // console.log("postData>>",postData)
    var options = {
        method: 'POST',
        uri: process.env.PAYPAL_API,
        body: postData,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length
        }
    };
    request(options, (error, response, body) => {
        // console.log("res=",response);
        res.json({ status: "success", "data": body });
        res.end();
    });

}

module.exports = {
    getProductList:getProductList,
    getProductById:getProductById,
    paypal:paypal
}
