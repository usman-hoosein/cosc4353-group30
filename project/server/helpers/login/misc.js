const pg = require('pg')
const pgUrl = "postgres://ntzpalcg:1OMZq1vH_90_6b6INK3UFjdmRBbUMAx1@ziggy.db.elephantsql.com/ntzpalcg"    //ElephantSQL url goes here. 
const conn = require('../connect.js')
const ep = require('./encrypt_pass.js')

const get = require("../../queries/CRUD/retrieve");
const update = require("../../queries/CRUD/update");
const create = require("../../queries/CRUD/create.js");

async function user_exists(username){
    result = await get.getUserCreds(username)
    if (result.rows.length == 1) {
        return true;
    }
    else {
        return false;
    }
}

async function check_password(username, password){
    result = await get.getUserCreds(username)
    correct_pass_salt_hash = result.rows[0].pass;
    if (ep.decrypt_and_check(password, correct_pass_salt_hash)){
        return true;
    }
    else {
        return false;
    }
}

async function sign_up(username, password){
    //
    const encrypted_password = ep.encrypt(password);
    create.insertUserCreds(username, encrypted_password);
    
}

module.exports = { user_exists, check_password }

//FOR TESTING node db_queries.js
//user_exists('spongegod69')
//check_password('mooncoast_services', 'c64d0c34f1aab92d579ebe3de95859fa:fb001eb775cfa3ddeba361c038b468dbbfbc718e44a6ebec82d152fbdbe58948');