const { Sequelize, Model, DataTypes } = require("sequelize");
const {DB} = require("../database/db")


//  THE COMPANY MODEL (SCHEMA) For mapping object to table in postgres. 

// NOTE - ONLY COMPANY NAME AND CIN ARE DEFINED HERE AS SEQUELIZE (ORM) WILL AUTOMATICALLY CREATE
//  ID - PRIMARY KEY, UPDATEAT AND CREATEDAT. 
const Company = DB.define("company",{
    name:{
        type:DataTypes.STRING,
        allowNull: false
    },
    cin:{
        type:DataTypes.STRING,
        allowNull: false,
        unique:true
    }

})

module.exports = Company