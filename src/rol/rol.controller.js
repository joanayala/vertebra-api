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
    const rolId = req.params.id;
    const { id, name, level } = req.body;

    const rolIdExist = await dbConnection.query('select * from roles where id = $1::int', [rolId]);
    if (rolIdExist.rowCount < 1) {
        return res.status(500).json({
            status: 500,
            msg: 'The id does not exist, please verify the information.',
        });
    }

    const rolNameExist = await dbConnection.query('select * from roles where id = $1::int', [rolId]);
    if (rolNameExist.rowCount > 0 && req.body.name == rolNameExist.rows[0].name) {
        return res.status(500).json({
            status: 500,
            msg: 'The rol name already exist, please verify the information.',
        });
    }

    dbConnection.query('update roles set name = $1, level = $2 where id = $3', [name, level, rolId], (error, results) => {
      if (error) {
        return res.status(500).json({
          status: 500,
          msg: 'Error updating rol',
        });
      }
      // dbConnection.query('insert into logs (user_id, action) VALUES ($1, $2)', [1, 'crear user']);
      res.status(200).json({
        status: 200,
        msg: 'Rol has been updated successfully',
      });
    });
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

    const idRolBusy = await dbConnection.query('select * from users u inner join roles r on r.id = u.rol_id where r.id = $1::int', [rolId]);
    if (idRolBusy.rowCount > 0) {
      return res.status(500).json({
        status: 500,
        msg: 'The rol cannot be deleted, some users are using this rol.',
      });
    }

    dbConnection.query('delete from roles where id = $1::int', [rolId], (error, results) => {
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
      msg: 'Error deleting rol',
    });
  }
};

module.exports = {
  getRoles,
  createRol,
  updateRol,
  deleteRol,
};