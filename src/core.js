const { info, error, warn } = require('./register');

class DataBase
{   
    // Static setting
    static user    = 'root';
    static pass    = '';
    static host    = '127.0.0.1';
    static schema  = null;
    static setting = null;
    static engine = 'promise-mysql';

    // Result
    result  = [];

    // Debug
    static DEBUG_QUERY = false;

    // =========================
    // Constructor
    // =========================
    constructor ( arg = {} )
    {   
        // Settear setting
        DataBase._setSetting(arg);
    }

    // =========================
    // Settings
    // =========================
    static _setSetting ( arg = {} )
    {
        let _default = 
        {
            engine              : DataBase.engine,
            pool                : false,
            host                : DataBase.host,
            user                : DataBase.user,
            password            : DataBase.pass,
            database            : DataBase.schema,
            port                : 3306,
            stringifyObjects    : true,
            charset             : 'UTF8_GENERAL_CI',
            

            queryFormat:function (query, values) {
                        
                if (!values) return query;

                return query.replace(/\:(\w+)/g, function (txt, key) {
                    return (values.hasOwnProperty(key)) ? this.escape(values[key]) : txt;
                }.bind(this));
            }
        }

        Object.assign(_default,arg);

        DataBase.setting = _default;
    }

    static _getSetting()
    {
        return DataBase.setting;
    }

    static _getEngine(type='promise-mysql')
    {
        let list =
        {
            'mysql':'mysql',
            'promise-mysql':'promise-mysql'
        }

        return require(list[type]);
    }

    // =========================
    // Connection
    // =========================
    async _connect ()
    {  
        let setting    = DataBase._getSetting();
        let engine     = DataBase._getEngine(setting.engine);
        let connection = setting.pool ? 'createPool' : 'createConnection';

        //delete setting.engine;
        //delete setting.pool;

        return await engine[connection](setting);
    }

    // =========================
    // Query
    // =========================
    async query ( sql, args = {} )
    {
        try {
            
            if(DataBase.DEBUG_QUERY) info(sql);

            let con  = await this._connect();

            let data = await con.query( sql , args );

            this.result = data;

            con.end();

            return data;

        } catch ( err ) {

            error(err);

            this.result = [];

            return [];
        }
    }

    // =========================
    // Convert to objSQL to stringSQL
    // =========================
    static convert(options)
    {
        let data =
        {
            sql:'',
            params:{}
        }

        let methodList = [ 'INSERT INTO', 'SELECT', 'UPDATE', 'DELETE' ];

        let { type, table, object } = options;

        let method = methodList[type];


        return data;
    }

    // =========================
    // Private methods
    // =========================

    static async _genericMethod( type, table, object = {} )
    {
        if(table && Object.keys(object).length != 0)
        {
            let { sql, params } = DataBase.convert({ type, table, object });

            return await this.query( sql, params );
        }

        return [];
    }

    // =========================
    // Public methods
    // =========================

    async getAttrs(table)
    {   
        if(table)
        {
            return await this.query(`SHOW COLUMNS FROM ${table}`);
        }

        return [];
    }
    
    async get( table, object = {} )
    {   
        if(table)
        {
            if(Object.keys(object).length == 0)
            {
                return await this.query(`SELECT * FROM ${table}`);
            }

            return await DataBase._genericMethod( 1, table, object );
        }

        return [];
    }

    async set( table, object = {} )
    {
        return await DataBase._genericMethod( 2, table, object );
    }

    async put( table, object = {} )
    {
        return await DataBase._genericMethod( 3, table, object );
    }

    async del( table, object = {} )
    {
        return await DataBase._genericMethod( 4, table, object );
    }

}

exports.DataBase = DataBase;
/*

let list = ['user','company'];

for (const i of list) 
{
    exports[i] = ()=>{
        console.log('Export dinamico: ',i)
    }
}*/
