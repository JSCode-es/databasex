class DataBase
{   
    // Static setting
    static user   = 'root';
    static pass   = '';
    static host   = '127.0.0.1';
    static schema = null;

    // Result
    result = [];

    constructor( arg = {} )
    {

    }
}

exports.DataBase = DataBase;