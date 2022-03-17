const pg = require('pg')

async function new_client(){
    const ClientClass = pg.Client
    const pgUrl = "postgres://ntzpalcg:1OMZq1vH_90_6b6INK3UFjdmRBbUMAx1@ziggy.db.elephantsql.com/ntzpalcg";     //ElephantSQL url goes here. 
    return new ClientClass(pgUrl);
}

async function c_connect(client){
    client.connect()
}

async function c_disconnect(client){
    client.end()
    return 1;
}

async function c_query(the_query, client){
    return await client.query(the_query);
    //console.log(client)
}

module.exports = { new_client, c_connect, c_disconnect, c_query }