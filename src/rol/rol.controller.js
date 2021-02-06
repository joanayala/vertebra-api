const { response } = require('express');
const { dbConnection } = require('../../database/config');

const { generateJWT } = require('../shared/helpers/jwt');

//List roles
const getRoles = async (req, res) => {
  try {
    const listRoles = await dbConnection.query('select * from roles order by id asc');

    const insertRolLog = dbConnection.query('insert into logs (user_id, action) VALUES ($1, $2) RETURNING id', [1, 'List.roles'], (error, results) => {
      res.status(200).json({
        status: 200,
        id_log: results.rows[0].id,
        roles: listRoles.rows,
      });
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      msg: 'Error listing roles',
    });
  }
};

//Create roles
const createRol = async (req, res = response) => {
  const { name, level } = req.body;

  try {
    const rolExist = await dbConnection.query('select * from roles where name like $1::text', [name]);
    if (rolExist.rowCount > 0) {
      return res.status(500).json({
        status: 500,
        msg: 'The rol already exists, please verify the information.',
      });
    }

    // save rol
    dbConnection.query('insert into roles (name, level) VALUES ($1, $2) RETURNING id', [name, level], (error, results) => {
      if (error) {
        return res.status(500).json({
          status: 500,
          msg: 'Error creating rol',
        });
      }
      res.status(200).json({
        status: 200,
        msg: 'Rol has been created successfully',
        id: results.rows[0].id,
      });
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      msg: 'Error creating rol',
    });
  }
};

const updateRol = async (req, res = response) => {

    const { id, name, level } = req.body;

    const rolIdExist = await dbConnection.query('select * from roles where id = $1::int', [id]);
    if (rolIdExist.rowCount < 1) {
        return res.status(500).json({
            status: 500,
            msg: 'The id does not exist, please verify the information.',
        });
    }
  
  /*if (rolIdExist.rowCount > 0) {
    if (nameLevelExist.rows[0].name === name) {
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
  const passwordBcrypt = bcrypt.hashSync(password, salt);
  // const passwordBcrypt = password;

  // update user
  dbConnection.query('update users set username = $1, password = $2, rol_id = $3, status = $4 where id = $5', [username, passwordBcrypt, rol_id, status, uid], (error, results) => {
    if (error) {
      return res.status(500).json({
        status: 500,
        msg: 'Error updated user',
      });
    }
    // dbConnection.query('insert into logs (user_id, action) VALUES ($1, $2)', [1, 'crear user']);
    res.status(200).json({
      status: 200,
      msg: 'User updated successfully',
    });
  });*/
};

const deleteRol = async (req, res = response) => {
  const rolId = req.params.id;

  try {
    const idExist = await dbConnection.query('select * from roles where id = $1::int', [rolId]);
    if (!idExist.rowCount > 0) {
      return res.status(500).json({
        status: 500,
        msg: 'The rol ID does not exists, please verify the information.',
      });
    }

    const idRolBusy = await dbConnection.query('select * from users u inner join roles r on r.id = u.rol_id');
    if (idRolBusy.rowCount > 0) {
      return res.status(500).json({
        status: 500,
        msg: 'The rol cannot be deleted, some users are using this rol.',
      });
    }

    dbConnection.query('delete from roles where id = $1', [rolId], (error, results) => {
      if (error) {
        return res.status(500).json({
          status: 500,
          msg: 'Error deleting rol',
        });
      }
      // dbConnection.query('insert into logs (user_id, action) VALUES ($1, $2)', [1, 'crear user']);
      res.status(200).json({
        status: 200,
        msg: 'Rol has been deleted successfully',
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
  getRoles,
  createRol,
  updateRol,
  deleteRol,
};