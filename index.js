const express = require('express');
const app = express();
const bodyParser =require('body-parser');
const port = 3000;
const cors = require('cors');
const products = require('./routers/products');
const transactions = require('./routers/transactions')

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello abiyyu!')
})

app.use('/products',products)
app.use('/transactions', transactions)

app.post('/product', (req, res) => {
   console.log(req.body)
    res.send('testing');
  })
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})