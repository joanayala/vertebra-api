const { response } = require('express');
const bcrypt = require('bcryptjs');
const { dbConnection } = require('../../database/config');

const { generateJWT } = require('../shared/helpers/jwt');

const login = async (req, res = response) => {
  const { username, password } = req.body;

  try {
    // Check username
    const usernameExist = await dbConnection.query('select * from users where username = $1::text', [username]);
    if (!usernameExist.rowCount > 0) {
      return res.status(500).json({
        status: 500,
        msg: 'The username does not exist, please verify the information.',
      });
    }

    // Check password
    const validPassword = bcrypt.compareSync(password, usernameExist.rows[0].password);
    if (!validPassword) {
      return res.status(500).json({
        status: 500,
        msg: 'The password is invalid, please verify the information.',
      });
    }

    // Check status
    if (!usernameExist.rows[0].status) {
      return res.status(500).json({
        status: 500,
        msg: 'The user is not active.',
      });
    }

    // Generate TOKEN - JWT
    const token = await generateJWT(username);
    dbConnection.query('update users set access_token = $1 where id = $2', [token, usernameExist.rows[0].id]);

    // dbConnection.query('insert into logs (user_id, action) VALUES ($1, $2)', [1, 'crear user']);

    return res.status(200).json({
      status: 200,
      msg: 'The user is logged in',
      rol: usernameExist.rows[0].rol_id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      msg: 'Error al realizar login',
    });
  }
};

const logout = async (req, res = response) => {
  const uid = req.params.id;

  try {
    // Check username
    const idExist = await dbConnection.query('select * from users where id = $1::int', [uid]);
    if (!idExist.rowCount > 0) {
      return res.status(500).json({
        status: 500,
        msg: 'The user ID does not exist, please verify the information.',
      });
    }

    // Generate TOKEN - JWT
    const token = await generateJWT(uid);

    // update user
    dbConnection.query('update users set access_token = $1 where id = $2', [token, uid], (error, results) => {
      if (error) {
        return res.status(500).json({
          status: 500,
          msg: 'Error logout',
        });
      }
      // dbConnection.query('insert into logs (user_id, action) VALUES ($1, $2)', [1, 'crear user']);
      res.status(200).json({
        status: 200,
        msg: 'User logout successfully',
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      msg: 'Error logout',
    });
  }
};

module.exports = {
  login,
  logout,
};
