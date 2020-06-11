import Sequelize from 'sequelize';
import sequelize from '../../config/database';
import md5 from 'md5';
import auth from '../../auth';

async function userLogin(query, callback) {
  const username = query.username;
  const password = query.password;
  let user = {};
  const encrypted_password = md5(password);

  var check_user = Promise.resolve(await sequelize.query(`SELECT u.* 
  FROM users u where u.email='${username}' 
  AND u.password='${encrypted_password}'  
  `, { type: Sequelize.QueryTypes.SELECT }));

  if (check_user._rejectionHandler0.length === 0) {
    user['status'] = 'failed';
    user['message'] = 'Incorrect email or password !';
    callback(user);
  } else {
    var active_user = Promise.resolve(await sequelize.query(`SELECT u.* 
                      FROM users u where u.email='${username}' 
                      AND u.password='${encrypted_password}'  
                     `, { type: Sequelize.QueryTypes.SELECT }));
    let userData = active_user._rejectionHandler0;
    if (userData[0].status == 0) {
      user['status'] = 'failed';
      user['message'] = 'You are not an active user!';
      callback(user);
    } else {
      var token_arr = auth.jswToken(userData[0].email);
      auth.storeRefreshToken(userData[0].email, token_arr[1]);
      user['status'] = 'success';
      user['message'] = 'Login successfully.';
      user['data'] = userData;
      user["token"] = token_arr[0];
      user['refresh_token'] = token_arr[1];
      callback(user);
    }

  }
}

const getUserInfo = async (id) => {
  var user = Promise.resolve(await sequelize.query(`SELECT * FROM users WHERE id=${id} AND status='1' `, { type: Sequelize.QueryTypes.SELECT }));
  return user;
};

async function registerUser(insert_qry) {
  var insert_user = Promise.resolve(await sequelize.query(`INSERT INTO users SET
  ${insert_qry} `, { type: Sequelize.QueryTypes.INSERT }));
  if (insert_user._rejectionHandler0.length === 0)
    return insert_user._rejectionHandler0;
  else
    return insert_user._rejectionHandler0[0];
}

const userUpdateDetails = async (update_arr, where) => {
  var updateUser = Promise.resolve(await sequelize.query(`UPDATE users SET
  ${update_arr} WHERE ${where} `, { type: Sequelize.QueryTypes.UPDATE }));
  return updateUser;
};

async function checkUserAlreadyExists(where) {
  var userData = Promise.resolve(await sequelize.query(`SELECT count(u.id) as user_counts 
  FROM users u 
  WHERE ${where} `, { type: Sequelize.QueryTypes.SELECT }));
  if (userData._rejectionHandler0[0].user_counts > 0)
    return userData._rejectionHandler0[0].user_counts;
  else
    return 0;
}

module.exports = {
  userLogin:userLogin,
  getUserInfo: getUserInfo,
  registerUser: registerUser,
  checkUserAlreadyExists: checkUserAlreadyExists,
  userUpdateDetails:userUpdateDetails
}