import Sequelize from 'sequelize';
import sequelize from '../../config/database';

const getProductList = async () => {
   let product = Promise.resolve(await sequelize.query(`SELECT id,name,price,imageurl from products where status='1' `, { type: Sequelize.QueryTypes.SELECT }));
  return product;
};


const getProductListById = async (id) => {
  let product = Promise.resolve(await sequelize.query(`SELECT id,name,price,imageurl from products where id=${id} AND status='1' `, { type: Sequelize.QueryTypes.SELECT }));
 return product;
};

module.exports = {
  getProductList:getProductList,
  getProductListById:getProductListById

}