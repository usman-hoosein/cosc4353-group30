const pg = require('pg')
const ClientClass = pg.Client
const pgUrl = "postgres://ntzpalcg:1OMZq1vH_90_6b6INK3UFjdmRBbUMAx1@ziggy.db.elephantsql.com/ntzpalcg"    //elephantSQL url goes here
const client = new ClientClass(pgUrl)
const fs = require('fs')

async function do_query(){
    tables = ['UserCredentials', 'ClientInformation', 'FuelQuote']

    // the_query = `INSERT INTO UserCredentials(username, pass) VALUES ('here_username', '2562ae863a2bce67c10e1723bb57c31d:a4fd0340977796a8ede723a1412527e1b30a7e4c23de67978326da3dfc1b4caf');`
    // await client.query(the_query)
    for (i = 0; i < tables.length-0; i++){
        the_query = `SELECT * FROM ${tables[i]};`
        res = await client.query(the_query)
        console.log(res.rows)
    }
}

async function main(){
    client.connect();
    await do_query();
    client.end();
}

main()
//node db_testing.js