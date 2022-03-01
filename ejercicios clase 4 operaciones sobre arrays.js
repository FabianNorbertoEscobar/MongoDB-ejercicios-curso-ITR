l
db.facturas.update({nroFactura:1000},{$push:{item:{producto:"Destornillador",cantidad:2,precio:20}}})

m
db.facturas.update({nroFactura:1000},{$pop:{item:-1}})

n
db.facturas.update({nroFactura:1000},{$pull:{item:{producto:" CORREA 12mm"}}})

o
db.facturas.updateOne({nroFactura:1000},{$pull:{item:{producto:" CORREA 12mm"}}})

p
arrItems = db.facturas.findOne({nroFactura:1002},{_id:0,item:1}).item
db.facturas.update({nroFactura:{$in:[1000,1001]},{$push:{item:{$each:arrItems}}},{multi:true})

