const { DataBase } = require('../index');

class Main
{
    static async init()
    {
        // Custom global access
        DataBase.user = 'maria';
        
        // Instaciar 
        new DataBase();
    }
}

Main.init();