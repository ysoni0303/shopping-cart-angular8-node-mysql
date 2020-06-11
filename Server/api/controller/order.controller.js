import orderModel from '../model/order.model';


async function insertOrder(req, res, next) {
    var user_id = req.body.user_id;
    var totalprice = req.body.total_price;
    var orderstatus ='place';
    var transaction_id = req.body.transaction_id;
    var paypal_response = req.body.paypal_response;
    var products=req.body.products;
    var insert_order = '';

    insert_order += `user_id='${user_id}',
    totalprice='${totalprice}',
    orderstatus='${orderstatus}',
    transaction_id='${transaction_id}',
    paypal_response='${paypal_response}'`;


    orderModel.insertOrder(insert_order,products, (data) => {
        if (data) {
            res.status(200).send({ 'status': 'success', 'data': 'Order submitted successfully.' })
        } else {
            res.status(200).send({ 'status': 'failed', 'message': 'Could not inserted!' });
        }

    })
}

async function getOrderByOrderId(req, res, next) {
    var where=`o.id=${req.body.order_id}`
    let orders = await orderModel.getOrderByOrderId(where);
    if (orders.length === 0) {
        res.json({ 'status': 'failed', 'message': 'orders not find' });
        res.end();
        return;
    } else {
        res.json({ 'status': 'success', 'orders': orders });
        res.end();
    }
}

async function getOrderByUserId(req, res, next) {
    var where=`u.id=${req.body.user_id}`
    let orders = await orderModel.getOrderByUserId(where);
    if (orders.length === 0) {
        res.json({ 'status': 'failed', 'message': 'orders not find' });
        res.end();
        return;
    } else {
        res.json({ 'status': 'success', 'orders': orders });
        res.end();
    }
}

module.exports = {
    insertOrder:insertOrder,
    getOrderByUserId:getOrderByUserId,
    getOrderByOrderId:getOrderByOrderId
}
