1
db.facturas.aggregate([
	{ 
		$project: {
			"item.cantidad":1, 
			"cliente.region":1
		}
	},
	{ 
		$unwind: "$item"
	},
	{ 
		$group: { 
			_id: "$cliente.region", 
			acumulado: { 
				$sum: "$item.cantidad"
			}
		}
	}
]);

2
db.facturas.aggregate([
	{ 
		$unwind: "$item"
	},
	{ 
		$group: { 
			_id: "$cliente.region", 
			acumulado: { 
				$sum: "$item.cantidad"
			},
			ingreso: {
				$sum: {
					$multiply: ["$item.cantidad", "$item.precio"]
				}
			}
		}
	},
	{
		$sort: {
			ingreso: 1
		}
	},
	{
		$limit: 1
	}
]);

3
db.facturas.aggregate([
	{ 
		$unwind: "$item"
	},
	{ 
		$group: { 
			_id: "$cliente.region", 
			acumulado: { 
				$sum: "$item.cantidad"
			}
		}
	},
	{
		$match: {
			acumulado: {$gt:10000}
		}
	}
]);

4
db.facturas.aggregate([
	{
		$group: {
			_id: {
				cuit: "$cliente.cuit",
				apellido: "$cliente.apellido",
				nombre: "$cliente.nombre",
				region; "$cliente.region"
			},
			cantidadFacturas: {
				$sum:1
			}
		}, {
			$project: {
				cuit: "$_id.cuit",
				apellido: "$_id.apellido",
				nombre: "$_id.nombre",
				region: "$_id.region",
				cantidadFacturas: 1,
				_id: 0
			}
		}, {
			$sort: {
				apellido: 1
			}
		}		
	}
]);

5
db.facturas.aggregate([
	{
		$match: {
			"cliente.cuit": {$gt:27000000000}
		}
	}, {
		$group: {
			_id: {
				cuit: "$cliente.cuit",
				apellido: "$cliente.apellido",
				nombre: "$cliente.nombre",
				region; "$cliente.region"
			},
			cantidadFacturas: {
				$sum:1
			}
		}, {
			$project: {
				cuit: "$_id.cuit",
				apellido: "$_id.apellido",
				nombre: "$_id.nombre",
				region: "$_id.region",
				cantidadFacturas: 1,
				_id: 0
			}
		}, {
			$sort: {
				apellido: 1
			}
		}		
	}
]);

6
db.facturas.aggregate([
	{
		$group: {
			_id: {
				cuit: "$cliente.cuit",
				apellido: "$cliente.apellido",
				nombre: "$cliente.nombre",
				region; "$cliente.region"
			},
			cantidadFacturas: {
				$sum:1
			}
		}, {
			$project: {
				cuit: "$_id.cuit",
				apellido: "$_id.apellido",
				nombre: "$_id.nombre",
				region: "$_id.region",
				cantidadFacturas: 1,
				_id: 0
			}
		}, 	{
			$match: {
				"cliente.cuit": {$gt:27000000000}
			}
		}, {
			$sort: {
				apellido: 1
			}
		}		
	}
]);

7
db.facturas.aggregate([
	{
		$unwind: "$item"
	}, {
		$group: {
			_id: "$item.producto",
			cant: {$sum:1}
		}
	}, {
		$sort: {
			cant: -1
		}
	}
]);

8
db.facturas.aggregate([
	{
		$unwind: "$item"
	}, {
		$group: {
			_id: "$item.producto",
			cant: {$sum:"$item.cantidad"},
			ingreso: {
				$sum: {
					$multiply:["$item.cantidad","$item.precio"]
				}
			}
		}
	}
]);

9
db.facturas.aggregate([
	{
		$unwind: "$item"
	}, {
		$group: {
			_id: "$item.producto",
			cant: {$sum:"$item.cantidad"},
			ingreso: {
				$sum: {
					$multiply:["$item.cantidad","$item.precio"]
				}
			}
		}
	}, {
		$sort: {
			ingreso: 1
		}
	}, {
		$skip: 1
	}, {
		$limit: 2
	}
]);
