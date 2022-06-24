const { Sequelize } = require('sequelize');


if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config(); // LOAD A ENV FILE FOR DEVELOPMENT
  }

// ENVIRONMENT VARIABLE LOADED FROM AN ENV. (MAKE SURE TO PROVIDE THEM BEFORE RUNNING SERVERS)
dbconfig = {
    user : process.env.DBUSER,
    password :process.env.DBPASSWORD,
    host :process.env.DBHOST,
    port : process.env.DBPORT,
    name : process.env.DBNAME
}

// DATABASE CONNECTION
const DB = new Sequelize(dbconfig.name, dbconfig.user, dbconfig.password, {
        host: dbconfig.host,
        dialect: "postgres",
        pool :{
            max:10,
            min:0,
            acquire:30000,
            idle:10000
        },
        sync:true
      });
module.exports = {DB}