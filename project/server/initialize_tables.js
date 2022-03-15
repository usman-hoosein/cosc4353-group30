const pg = require('pg')
const ClientClass = pg.Client
const pgUrl = ""    //ElephantSQL url goes here. 
const client = new ClientClass(pgUrl)

const fs = require('fs')


//Initialize / Reset Tables
async function initialize_tables(){
    const initialize_query = fs.readFileSync("initialize.sql").toString();
    await client.query(initialize_query)
    console.log('Table reinitialized!')
}

async function show_tables(){
    result = await client.query(`SELECT * FROM UserCredentials;`);
    console.log(result.rows);

    result = await client.query(`SELECT * FROM ClientInformation;`);
    console.log(result.rows);

    result = await client.query(`SELECT * FROM FuelQuote;`);
    console.log(result.rows);
}

async function main(){
    client.connect()
    await initialize_tables();
    await show_tables();
    client.end()
    console.log('Reinitialization complete!')
}

main();
