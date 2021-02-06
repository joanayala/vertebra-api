# Backend Vertebra API

Backend en Node.js + Express.js y PostgreSQL..

## Installation

Descargue o clone el repositorio en su computadora y haga uso del administrador de paquetes [npm](https://www.npmjs.com/) para instalar **vertebra-api**.

```bash
npm install
```
## PostgreSQL database backup

Descargue el backup de la base de datos [aquí](https://github.com/joanayala/vertebra-api/tree/main/api-documentation/db_backup) para importarla  a su motor de PostgreSQL.

## Importante [Uso de Token con JWT]
Para poder hacer pruebas de las peticiones (diferentes al Login), se debe agregar al HEADER (en postman) el TOKEN generado en el Logueo.  Este debe agregarse con la clave (KEY) x-token, y en value, agregar la cadena generada como token en la tabla users.

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