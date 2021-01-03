const { DataBase } = require('../index');

class Main
{
    static async init()
    {
        // Custom global access
        DataBase.host   = '82.223.10.139';
        DataBase.user   = 'admin';
        DataBase.pass   = '$3Guridad';
        DataBase.schema = 'dev-production';

        // Debug
        DataBase.DEBUG_QUERY = true;
        
        //Main.test1()
        //Main.test2()
        Main.test3()
     
       
    }

    static async test1()
    {
        console.log('[ Database ] Test 1');

        // Instaciar 
        let db = new DataBase();

        // Example query
        let sql = 'select * from user limit :limit';

        // Executar consulta
        let data = await db.query(sql,{limit:2});

        // Mostrar datos por consola
        console.log(data)
    }

    static async test2()
    {
        console.log('[ Database ] Test 2');

        // Instaciar 
        let db = new DataBase();

        // Executar consulta
        let data = await db.get('user');

        // Mostrar datos por consola
        console.log(data)
    }

    static async test3()
    {
        console.log('[ Database ] Test 2');

        // Instaciar 
        let db = new DataBase();

        // Executar consulta
        let data = await db.getAttrs('user');

        // Mostrar datos por consola
        console.log(data)
    }


}

Main.init();