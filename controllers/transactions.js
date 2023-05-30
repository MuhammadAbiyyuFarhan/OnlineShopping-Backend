//! transaction controller
const db = require("../configs/connection")

exports.checkout = async(data, products) => {

    // masukin ke tabel transaksi
    const query = await db.query("INSERT INTO transactions set ?", [data]).catch(err => { return err })

    // 
    if(!query.code) {
        let dataProducts = []
        let idProducts = []
        let updateStock = []
        
        products.map(item => {
            dataProducts.push([
                data.no_order,
                item.id,
                item.quantity
            ])
            idProducts.push([item.id])
        })

        await db.query("INSERT INTO transaction_detail (no_order, id_product, quantity) VALUES ?" , [dataProducts])

        await db.query('SELECT * FROM transactions where no_order = ?', [data.no_order])

        const stockProduct = await db.query('SELECT stock FROM products where id in = ?', [idProducts])

        const itemId = dataProducts[i][1]
        const itemQuantity = dataProducts[i][2]

        stockProduct.map((product, i) => {
            updateStock.push([itemId,product.stock - itemQuantity])
        })

        await db.query('INSERT INTO products (id, stock) values ? on duplicate key update stock = values(stock)', [updateStock])
    }
    return query
}