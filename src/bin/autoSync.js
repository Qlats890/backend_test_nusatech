require('dotenv').config({path:'../../.env'})

const koneksi = require('../config/dbConnection')
let normalizedPath = require("path").join(__dirname, "../models");
require("fs").readdirSync(normalizedPath).forEach(function(file) {

  require("../models/" + file);

});

// console.log(process.env.DB_PASS);
koneksi.sync({ alter: true,force:true } ).then(async () => {
    console.log('Database Berhasil di Sinkronisasi')
    console.log('disconnecting...')
  }).catch(e => {
    console.log(e)
});