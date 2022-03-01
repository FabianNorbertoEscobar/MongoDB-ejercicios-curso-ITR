a
var productos = function(array) {
	if(!array || !array.length)
		return;
	for (var i = 0; i < array.length; i++) {
		print(array[i].productos);
	}
}

b
var doc = db.facturas.findOne({nroFactura:5000},{item:1,_id:0});
productos(doc.item);

c
var doc = db.facturas.findOne({nroFactura:1330},{item:1,_id:0});
db.items.insert({producto:doc.item[0].producto,precio:15})

d
var doc = db.facturas.findOne({nroFactura:1144});
for (var i = 0; i < doc.item.length; i++) {
	doc.item[i].precio += 1;
}
db.facturas.save(doc)

e
var doc = db.facturas.find({"cliente.apellido":"Manoni"}).sort({nroFactura:-1}).limit(1).next();
for(var key in doc) {
	print("---",key);
	if (key != "item") {
		printjson(doc[key]);
	} else {
		productos(doc[key]);
	}
}

f
var doc = db.facturas.findOne({nroFactura:2345});
delete doc.condPago;
delete doc.fechaVencimiento;
db.facturas.insert(doc);
db.facturas.remove({_id:doc._id});

g
var doc = db.facturas.findOne({nroFactura:1020});
if (doc.condPago == "CONTADO") {
	db.facturas.update({_id:doc._id},{$set:{porcDescuento:10}});
}

h
var cur = db.facturas.find({},{item:1,_id:0}).sort({fechaEmision:1});
cur.forEach(
	function(doc) {
		doc.item.forEach(
			function(item) {
				db.items.update({
					producto:item.producto
				},{
					$set: {
						precio: item.precio
					}
				},{
					upsert: true
				})
			})
	});

i
var cur = db.facturas.find({},{cliente:1,_id:0});
var fecha = new Date();
cur.forEach(
	function(doc) {
		db.clientes.update({
			nombre: doc.cliente.nombre,
			apellido: doc.cliente.apellido,
			cuit: doc.cliente.cuit,
			region: doc.cliente.region
		},{
			$inc: {
				facturas: 1
			},
			$set: {
				fecha: fecha
			}
		},{
			upsert: true
		})
	});

j
var cli = db.clientes.find().sort({facturas:1}).limit(1).next();
db.clientes.remove({cuit:cli.cuit});
db.facturas.remove({"cliente.cuit":cli.cuit});

k
var cur = db.facturas.find({"cliente.region":"CABA"});
cur.forEach(
	function(doc) {
		if (doc.item && doc.item.length > 2) {
			doc.item.forEach(
				function(item) {
					delete item.precio;
				});
			db.facturas.save(doc);
		}
	})

l
db.system.js.save({
	_id: "listarItemsDeFactura",
	value: productos
});

m
var clienteNuevo = function(colFact, colCli) {
	db[colFact].find({},{cliente:1,nroFactura:1,_id:0})
		.forEach(
			function(fact) {
				if (db[colCli].count({cuit:fact.cliente.cuit}) == 0) {
					print(fact.nroFactura);
				}
			});
};
db.system.js.save({
	_id: "facturasDeClienteNuevo",
	value: clienteNuevo
});

n
db.facturas.insert({
	nroFactura:9,
	cliente: {
		cuit: 20392109154,
		nombre: "Fabián",
		apellido: "Escobar"
	},
	item: [{
		producto: "DESTORNILLADOR",
		cantidad: 1
	}]
});

o
var nroFacturaActual = db.facturas.find({},{nroFactura:1,_id:0}).sort(nroFactura:-1).limit(1).next().nroFactura;
db.secuencias.insert({
	_id: "nroFactura",
	valorSecuencia: nroFacturaActual
});
function getNextVal(name) {
	var salida = db.secuencias.findAndModify({
		query: {_id: name},
		update: {$inc: {valorSecuencia:1}},
		new: true
	});
	return salida.valorSecuencia;
}
db.facturas.insert({
	nroFactura: getNextVal("nroFactura"),
	fechaEmision: ISODate(),
	fechaVencimiento: ISODate(),
	condPago: "CONTADO",
	cliente: {
		cuit: 20392109154,
		nombre: "Fabián",
		apellido: "Escobar"
	},
	item: [{
		producto: "CORREA 12mm",
		cantidad: 1,
		precio: 10
	}]
});
