a
db.facturas.find({"cliente.apellido":{$regex:"I",$options:"i",$ne:"Manoni"}},{nroFactura:1,_id:0})

b
db.facturas.find({"cliente.apellido":/i$/,"cliente.region":"CABA","item.producto":/^TUERCA/i})

c
db.facturas.find({"item.producto":/^CORREA/})

d
db.facturas.find({"item.cantidad":{$gte:12}},{cliente:1,_id:0})

e
db.facturas.find({"item.producto":{$ne:"SET HERRAMIENTAS"}})

f
db.facturas.insert({nroFactura:999,cliente:{apellido:"Boffino",nombre:"Patricio",region:"PBA"},item:[{producto:"DESTORNILLADOR",cantidad:1}]})

g
db.facturas.insert([{_id:1},{_id:1},{_id:2}])

h
db.facturas.remove({"cliente.region":"CENTRO"})

i
db.facturas.update({nroFactura:1501},{$inc:{nroFactura:1}})

j
db.facturas.update({nroFactura:1500},{$set:{condPago:"30 Ds FF"}})

k
db.facturas.update({nroFactura:1515},{$inc:{vistas:1,contador:-1}})
