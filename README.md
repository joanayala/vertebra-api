# Backend Api Vertebra Admin

Backend en Node.js y Express.js para la administracion de usuarios.

## Installation

Descargue el repositorio y haga uso del administrador de paquetes [npm](https://www.npmjs.com/) para instalar **vertebra-api**.

```bash
npm install
```

Descargue el backup de la base de datos [aquí] (https://github.com/joanayala/vertebra-api/tree/main/api-documentation/db_backup) para importar la base de datos a su motor de PostgreSQL.

## Endpoints [api/login]
Post:
```bash
http://localhost:3001/api/login
```
Delete:
```bash
http://localhost:3001/api/login/2
```
## Endpoints [api/users]
Get:
```bash
http://localhost:3001/api/users
```
Post:
```bash
http://localhost:3001/api/users
```
Put:
```bash
http://localhost:3001/api/users/2
```
Delete:
```bash
http://localhost:3001/api/users/2
```

## Endpoints [api/roles]
Get:
```bash
http://localhost:3001/api/roles
```
Post:
```bash
http://localhost:3001/api/roles
```
Put:
```bash
http://localhost:3001/api/roles/2
```
Delete:
```bash
http://localhost:3001/api/roles/2
```

## Endpoints [api/logs]
Get:
```bash
http://localhost:3001/api/logs
```
Get:
```bash
http://localhost:3001/api/logs/action?q=Signin.user
```

## Recursos gráficos

Modelo relacional base de datos

![alt text](https://github.com/joanayala/vertebra-api/blob/main/api-documentation/vertebra-api_db.png)

Arquitectura:

![alt text](https://github.com/joanayala/vertebra-api/blob/main/api-documentation/architecture.jpg)