# IN DEVELOPMENT (Do not use this module)

### Example of use

```javascript

const { DataBase } = require('@sgonzalez_es/database-x');

let db     = new DataBase ();

let setting =
{
    values: [ 'id', 'name:alias', 'count(*):total' ],
    where: { name:'Peter' },
    limit:1
}

let user   = await db.get ( 'user', setting );
```
Equivalence in SQL
```sql
SELECT `id`, `name` AS alias, count(*) as total FROM `user` WHERE `id` = 2 AND `name` = 'Peter' LIMIT 1
```

## TODO 
- Create methods: set, get, put, del
- Create objects according to the table schema

## BUGS 