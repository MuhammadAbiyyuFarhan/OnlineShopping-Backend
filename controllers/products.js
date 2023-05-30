const db = require ('../configs/connection')

exports.getProducts = async () =>{
    return await db.query ('select * from products')
}

exports.createProduct = async (data) => {
   const query = await db.query('insert into products set ?',[data])
   if (!query.affectedRows) return "error when inserting product"
   return "product succesfully created"
}

