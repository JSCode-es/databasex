# EN DESARROLLO 

### Ejemplo de uso

```javascript
let db     = new DataBase ();

let setting =
{
    values: [ 'id', 'name:alias', 'count(*):total' ],
    where: { id:2, name:'Nombre' },
    limit:1
}

let user   = await db.get ( 'user', setting );
```
Equivalencia en SQL
```sql
SELECT `id`, `name` AS alias, count(*) as total FROM `user` WHERE `id` = 2 AND `name` = 'Nombre' LIMIT 1
```
### Constructor
Todos los campos del constructor son opcionales.

```javascript
new DataBase ( object );
```

### Método: set
Este método tiene como objetivo realizar una consulta a una tabla especificada.  
Tiene un atributo que es un objecto para especificar la consulta.

```javascript
let db     = new DataBase ();
let data   = await db.get ( nombre_de_la_tabla , opciones_de_busqueda );
```
#### Opciones de busqueda
| Atributo 			 | Descripción     |
|---				 |---	           |  
| values             | Valores de retorno | 
| where              | Valores de busqueda | 
| like               | Valores de busqueda | 
| order              | Valores de ordenamiento | 
| limit              | Liminación de retorno de datos | 

#### Uso del : values
El atributo es un array de string.

> Recuperación básica de un atributo ( string ) ->  id  
> Recuperación con alias             ( string ) ->  id:nombre_del alias  
> Implementar funciones              ( string ) ->  COUNT(id)  

```javascript
[ 'id','id:alias','count(*)', 'count(*):alias' ];
```

#### Uso del : where y like
El atributo es un objeto con strings o de arrays

```javascript
// AND
{id:2, name:'Nombre'};

// OR
{id:[ 10, 29 ]};

//MIX
{id:[ 10, 29 ], name:'Nombre'};
```
**Al usar LIKE este establece una busqueda completa, ej : name LIKE '%nombre%'**

#### Uso del : order
El atributo es un objeto simple, en el cual como atributo es el nombre   
del atributo de la tabla y como valor el tipo de ordenamiento

```javascript
{id:'asc', name:'desc'};
```

#### Uso del : limit
Es un string

```javascript
let limit  = '1'
let limit2 = '1,4'
```

### Método: query
Para consulta mas compleja o customizadas se puede usar este método, en el cual tiene dos atributos.  
El primero es la consulta y las segunda los datos de la consulta

```javascript
let db     = new DataBase ();
let sql    = 'SELECT * FROM user WHERE name = :name LIMIT 1';
let attr   = { name: "nombre del usuario" };
let data   = await db.query ( sql , attr );
```

### Método: set
Añadir registro a un tabla

```javascript
let db    = new DataBase ();
let attr  = {genre:'Femenino'};
let data  = await db.set('genre',attr); // Return object database
```
### Método: put
Actualizar registro a un tabla

```javascript
let db    = new DataBase ();
let attr  = 
{
    set:{ genre:'Femeníno' },
	where:{ id:2 }
};

let data  = await db.put('genre',attr); // Return object database
```

### Método: del
Eliminar registro a un tabla

```javascript
let db    = new DataBase ();
let attr  = 
{
	where:{ id:2 }
};
let data  = await db.del('genre',attr); // Return object database
```

## TODO 

## BUGS 