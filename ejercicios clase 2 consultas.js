a
db.facturas.find().count()

b
db.facturas.findOne({},{_id:0})

c
db.facturas.find({fechaEmision:{$gt:ISODate("2014-02-23T00:00:00Z")},nroFactura:{$lt:1500}}).sort({"cliente.region":1,"cliente.cuit":1})

d
db.facturas.find({"item.producto":"CORREA 10mm"},{_id:0,cliente:1}).sort({"cliente.apellido":1})

e
db.facturas.find({nroFactura:{$gte:2500,$lte:3000}},{_id:0,"cliente.nombre":1,"cliente.apellido":1})

f
db.facturas.find({nroFactura:{$in:[5000,6000,7000,8000]}},{_id:0,fechaVencimiento:1})

g
db.facturas.find({"cliente.apellido":/^Z/},{_id:0,nroFactura:1}).sort({nroFactura:1}).limit(5)

h
db.facturas.find({$or:[{"cliente.region":"CENTRO"},{condPago:"CONTADO"}]},{_id:0,nroFactura:1}).sort({nroFactura:-1}).skip(5).limit(5)

i
db.facturas.find({"cliente.apellido":{$nin:["Zavasi","Malinez"]}})

j
db.facturas.find({"item.cantidad":15},{_id:.0,"item.producto":1})

k
db.facturas.find({"cliente.cuit":2038373771,condPago:"30 Ds FF",fechaVencimiento:{$gte:ISODate("2014-03-20T00:00:00Z")},fechaVencimiento:{$lte:ISODate("2014-03-24T00:00:00Z")}}).limit(1)


