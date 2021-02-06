const { response } = require('express');
const bcrypt = require('bcryptjs');
const { dbConnection } = require('../../database/config');

const { generateJWT } = require('../shared/helpers/jwt');

const getUsers = async (req, res) => {
  try {
    const listUsers = await dbConnection.query('select * from users order by id desc');

    // dbConnection.query('insert into logs (user_id, action) VALUES ($1, $2)', [1, 'listo users']);

    res.status(200).json({
      status: 200,
      users: listUsers.rows,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      msg: 'Error listing users',
    });
  }
};

const createUser = async (req, res = response) => {
  const { username, password, rol_id } = req.body;

  try {
    const usernameExist = await dbConnection.query('select * from users where username = $1::text', [username]);
    if (usernameExist.rowCount > 0) {
      return res.status(500).json({
        status: 500,
        msg: 'The username already exists, please verify the information.',
      });
    }

    const rolExist = await dbConnection.query('select * from roles where id = $1::int', [rol_id]);
    if (!rolExist.rowCount > 0) {
      return res.status(500).json({
        status: 500,
        msg: 'The rol does not exists, please verify the information.',
      });
    }

    // encrypt password
    const salt = bcrypt.genSaltSync();
    //const passwordBcrypt = bcrypt.hashSync(password, salt);
    const passwordBcrypt = password;

    // Generate TOKEN - JWT
    const token = await generateJWT(username);

    // save user
    dbConnection.query('insert into users (username, password, rol_id, access_token) VALUES ($1, $2, $3, $4) RETURNING id', [username, passwordBcrypt, rol_id, token], (error, results) => {
      if (error) {
        return res.status(500).json({
          status: 500,
          msg: 'Error created user',
        });
      }
      // dbConnection.query('insert into logs (user_id, action) VALUES ($1, $2)', [1, 'crear user']);
      res.status(200).json({
        status: 200,
        msg: 'User created successfully',
        id: results.rows[0].id,
      });
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      msg: 'Error creating user',
    });
  }
};

const updateUser = async (req, res = response) => {
  const uid = req.params.id;

  const idExist = await dbConnection.query('select * from users where id = $1::int', [uid]);
  if (!idExist.rowCount > 0) {
    return res.status(500).json({
      status: 500,
      msg: 'The user ID does not exists, please verify the information.',
    });
  }

  const { username, password, rol_id, status } = req.body;

  const usernameExist = await dbConnection.query('select * from users where username = $1::text', [username]);
  if (usernameExist.rowCount > 0) {
    if (!usernameExist.rows[0].username === username) {
      return res.status(500).json({
        status: 500,
        msg: 'The username already exists, please verify the information.',
      });
    }
  }

  const rolExist = await dbConnection.query('select * from roles where id = $1::int', [rol_id]);
  if (!rolExist.rowCount > 0) {
    return res.status(500).json({
      status: 500,
      msg: 'The rol does not exists, please verify the information.',
    });
  }

  // encrypt password
  const salt = bcrypt.genSaltSync();
  //const passwordBcrypt = bcrypt.hashSync(password, salt);
  const passwordBcrypt = password;

  // update user
  dbConnection.query('update users set username = $1, password = $2, rol_id = $3, status = $4 where id = $5', [username, passwordBcrypt, rol_id, status, uid], (error, results) => {
    if (error) {
      return res.status(500).json({
        status: 500,
        msg: 'Error updating user',
      });
    }
    // dbConnection.query('insert into logs (user_id, action) VALUES ($1, $2)', [1, 'crear user']);
    res.status(200).json({
      status: 200,
      msg: 'User updated successfully',
    });
  });
};

const deleteUser = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const idExist = await dbConnection.query('select * from users where id = $1::int', [uid]);
    if (!idExist.rowCount > 0) {
      return res.status(500).json({
        status: 500,
        msg: 'The user ID does not exists, please verify the information.',
      });
    }

    // delete user
    dbConnection.query('delete from users  where id = $1', [uid], (error, results) => {
      if (error) {
        return res.status(500).json({
          status: 500,
          msg: 'Error deleted user',
        });
      }
      // dbConnection.query('insert into logs (user_id, action) VALUES ($1, $2)', [1, 'crear user']);
      res.status(200).json({
        status: 200,
        msg: 'User deleted successfully',
      });
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      msg: 'Error deleting user',
    });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
