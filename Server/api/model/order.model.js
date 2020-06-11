import Sequelize from 'sequelize';
import sequelize from '../../config/database';

async function insertOrder(insert_order, products, callback) {
  var orders = Promise.resolve(await sequelize.query(`INSERT INTO orders SET
  ${insert_order} `, { type: Sequelize.QueryTypes.INSERT }));
  if (orders._rejectionHandler0.length === 0)
    callback(orders._rejectionHandler0);
  else {
    var order_id = orders._rejectionHandler0[0];
    if (products.length > 0) {
      var i = 1;
      products.forEach(async (obj) => {
        let insert_product = ``;
        insert_product += `orderid='${order_id}',
        productid='${obj.id}',
        productname='${obj.name}',
        productprice='${obj.price}',
        productqty='${obj.qty}',
        productimg='${obj.imageurl}'`;
        var order_details = Promise.resolve(await sequelize.query(`INSERT INTO orderdetails SET
        ${insert_product} `, { type: Sequelize.QueryTypes.INSERT }));
       
        if(i==products.length)
        callback(order_details._rejectionHandler0);

        i++
      })
    } else {
      callback("Product not found");
    }
  }

}

async function getOrderByOrderId(where) {
  const availability = Promise.resolve(await sequelize.query(`SELECT u.*,
  o.id,o.totalprice,o.orderdate,o.orderstatus,
  od.productname,od.productprice,od.productqty,od.productimg
  FROM orders AS o 
  INNER JOIN orderdetails AS od ON od.orderid=o.id
  INNER JOIN users AS u ON u.id=o.user_id
  WHERE ${where} `, { type: Sequelize.QueryTypes.SELECT }));
  return availability;
}


async function getOrderByUserId(where) {
  const availability = Promise.resolve(await sequelize.query(`SELECT u.id,u.name,
  o.id,o.totalprice,o.orderdate,o.orderstatus
  FROM orders AS o 
  INNER JOIN users AS u ON u.id=o.user_id
  WHERE ${where} `, { type: Sequelize.QueryTypes.SELECT }));
  return availability;
}

module.exports = {
  insertOrder: insertOrder,
  getOrderByUserId: getOrderByUserId,
  getOrderByOrderId: getOrderByOrderId
}