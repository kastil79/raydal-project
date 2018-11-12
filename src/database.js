const { Pool } = require('pg');
const config = require('config');


const connectDbLocalString = (config.get('URI_DBLOCAL')); // Metodo de Config. Dependiendo del valor NODE_ENV indicado establece a que BD debemos conectarnos localmente
const connectionString = process.env.DATABASE_URL || connectDbLocalString;


const pool = new Pool({
    connectionString: connectionString
});

pool.connect( (err) => {
    if(err) throw err;
    console.log(`Connected to Postgresql DB in mode ${config.get('mode')}`);    
});

/*const getProducts = (req,res) => {
    pool.query('SELECT * from tbproducts', (error,results) =>{
        if(error) throw error;
        console.log(results.rows);
        
    })
}

getProducts();*/



module.exports = pool;