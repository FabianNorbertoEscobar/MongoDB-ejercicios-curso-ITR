1
db.facturas.createIndex({nroFactura:1},{unique:true})

1.1
db.facturas.find({nroFactura:{$gte:1000,$lte:1015}},{nroFactura:1,fechaEmision:1,condPago:1,cliente:1,_id:0})

1.2
db.facturas.find({nroFactura:{$gte:1000,$lte:1015}},{nroFactura:1,fechaEmision:1,condPago:1,cliente:1,_id:0}).explain()

1.3
db.facturas.find({"cliente.apellido":"Malinez"},{cliente:1,_id:0})
db.facturas.find({"cliente.apellido":"Malinez"},{cliente:1,_id:0}).hint({nroFactura:1})

2
db.facturas.createIndex({"$**":"text"})

2.1
db.facturas.find({$text:{$search:"TALADRO"}}).count()

2.2
db.facturas.find({$text:{$search:"TALADRO TUERCA"}}).count()

2.3
db.facturas.find({$text:{$search:"\"Ds FF\""}}).count()

3
db.solicitudes.insert({nroSolicitud:1,tipoSolicitud:"SOLICITUD1",fechaSolicitud:new Date()})
db.solicitudes.insert({nroSolicitud:2,tipoSolicitud:"SOLICITUD2",fechaSolicitud:new Date()})
db.solicitudes.insert({nroSolicitud:3,tipoSolicitud:"SOLICITUD3",fechaSolicitud:new Date()})

3.1
db.solicitudes.createIndex({fechaSolicitud:1},{expireAfterSeconds:60})

3.2
db.solicitudes.find().pretty()

3.3
db.solicitudes.find().pretty()

4.1
db.facturas.find({"cliente.region":"NEA"}).explain("executionStats").executionStats.executionTimeMillis

4.2
db.facturas.createIndex({"cliente.region":1})
db.facturas.find({"cliente.region":"NEA"}).explain("executionStats").executionStats.executionTimeMillis

5.1
db.facturas.find({"cliente.region":"NEA"}).sort({nroFactura:-1}).explain("executionStats").queryPlanner.winningPlan.inputStage.inputStage.keyPattern
db.facturas.find({"cliente.region":"NEA"}).sort({nroFactura:-1}).explain("executionStats").executionStats.executionTimeMillis

5.2
db.facturas.createIndex({"cliente.region":1,nroFactura:1})
db.facturas.find({"cliente.region":"NEA"}).sort({nroFactura:-1}).explain("executionStats").executionStats.executionTimeMillis

5.3
db.facturas.find({"cliente.region":"NEA"}).sort({nroFactura:-1}).hint({$natural:1}).explain("executionStats").executionStats.executionTimeMillis
db.facturas.find({"cliente.region":"NEA"}).sort({nroFactura:-1}).hint({"cliente.region":1}).explain("executionStats").executionStats.executionTimeMillis

6.1
db.comercios.find().pretty()

6.2
db.comercios.createIndex({ubicacion:"2dsphere"})

6.3
db.comercios.find({ubicacion:{$near:[-58.420000,-34.580000],spherical:true,$maxDistance:0.05}})

6.4
db.comercios.find({ubicacion:{$near:[-58.420000,-34.580000],spherical:true,$maxDistance:0.015}})

db.comercios.find({ubicacion:{$near:[-58.420000,-34.580000],spherical:true,$maxDistance:5}})
