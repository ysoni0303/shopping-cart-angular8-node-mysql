import userModel from '../model/user.model';
import md5 from 'md5';
function login(req, res) {
    userModel.userLogin(req.body, (data) => {
        res.status(200).send({
            status: data.status,
            message: data.message,
            token: data.token,
            data: data.data
        })
    })
}

async function getUserInfo(req, res, next) {
    const user = await userModel.getUserInfo(req.query.user_id);
    if (user.length === 0) {
        res.json({ 'status': 'failed', 'message': 'User not find' });
        res.end();
        return;
    } else {
        res.json({ 'status': 'success', 'users': user });
        res.end();
    }
}

async function registerUser(req, res, next) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var mobileno = req.body.mobileno;
    var address = req.body.address;
    var city = req.body.city;
    var state = req.body.state;
    var country = req.body.country;
    var zipcode=req.body.zipcode;
    var insert_arr = '';
    var where = `u.email='${email}' AND u.status='1'`
    var exists_user = await userModel.checkUserAlreadyExists(where);
    if (exists_user > 0) {
        res.json({ 'status': 'failed', 'message': 'User is already exist with this email id.' });
        res.end();
        return;
    }
    insert_arr += `name='${name}',
                    email='${email}',
                    password=md5('${password}'),
                    mobileno='${mobileno}',
                    address='${address}',
                    city='${city}',
                    state='${state}',
                    country='${country}',
                    zipcode='${zipcode}'`;
    var user = await userModel.registerUser(insert_arr);

    if (user > 0) {
        res.json({ 'status': 'success', 'message':"User added successfuly ",'data': user });
    } else {
        res.json({ 'status': 'failed', 'message': 'Could not inserted!' });
    }
    res.end();
}


async function resetPassword(req, res, next) {
    if (req.body.flag == "check password") {
        const { email, password } = req.body;
        let where = `u.email='${email}' 
        AND u.password=md5('${password}') AND u.status='1'`;
        const exists_user = await userModel.checkUserAlreadyExists(where);
        if (exists_user > 0) {
            res.json({ 'status': 'success', 'message': 'Password matched.' });
        } else {
            res.json({ 'status': 'failed', 'message': 'Password mismatch!' });
        }
        res.end();
    } else if (req.body.flag == "update password") {
        const { email, password } = req.body;
        let update_arr = `password=md5('${password}')`;
        let user_where = `email='${email}'`;
        const update_user = await userModel.userUpdateDetails(update_arr, user_where);
        res.json({ 'status': 'success', 'message': 'Password changed successfully.' });
        res.end();
    }
}

module.exports = {
    login:login,
    getUserInfo: getUserInfo,
    registerUser:registerUser,
    resetPassword:resetPassword
}
