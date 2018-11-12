// RUTA: /api/products
const express = require ('express');
const router = express.Router();
const  pool  = require('../database');
 

// GET — /products   [GET all products]
router.get('/', (request,response) => {
    pool.query('SELECT * FROM tbproducts ORDER BY product_id ASC', (error, results) => {
        if (error) throw error;
        response.status(200).json(results.rows);
      })
});


// GET — /products/:id  [GET a single product by id]
router.get('/:id', (request,response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM tbproducts WHERE product_id = $1', [id], (error, results) => {
        if (error) throw error;
        if (results.rows.length ===0)           
          response.status(404).send(`<<PRODUCT>> not found`);        
        else
          response.status(200).json(results.rows);
  })
});

// POST — products  [POST a new product]
router.post('/', (request,response) => {
    const { product_type_id, product_name } = request.body;

    pool.query('INSERT INTO tbproducts (product_type_id, product_name) VALUES ($1, $2) RETURNING product_id', [product_type_id, product_name], (error, results) => {
        if (error) throw error;
        response.status(201).send(`Product added with ID: ${results.rows[0].product_id}`);
  })
});

// PUT — /products/:id   [PUT updated data in an existing product]
router.put('/:id', (request,response) => {
    const id = parseInt(request.params.id);
    const { product_name } = request.body;

    pool.query(
    'UPDATE tbproducts SET product_name = $1 WHERE product_id = $2',
    [product_name, id],
    (error, results) => {
      if (error) throw error;
      response.status(200).send(`Product modified with ID: ${id}`);
    }
  )
});


// DELETE — /products/:id [DELETE a product]
router.delete('/:id', (request,response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM tbproducts WHERE product_id = $1', [id], (error, results) => {
      if (error) throw error;
      response.status(200).send(`Product deleted with ID: ${id}`);
    }) 
});


module.exports = router;
