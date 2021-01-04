class convert
{
    static insert( table, object )
    {
        console.log('Convertir insert')
    }

    static select( table, object )
    {
        let sql = 'SELECT ';

        sql += convert._generateValues(object) + ' ';
        sql += 'FROM ' + table ;
        sql += convert._generateWhere(object) + ' ';
        sql += convert._generateIn(object) + ' ';
        sql += convert._generateIn(object, 'NOT') + ' ';
        sql += convert._generateLike(object) + ' ';
        sql += convert._generateOrder(object) + ' ';
        sql += convert._generateLimit(object) + ' ';

        console.log('Convertir select:', sql)   
        
        
    }

    static update( table, object )
    {
        console.log('Convertir update')
    }

    static delete( table, object )
    {
        console.log('Convertir delete')
    }

    // =======================
    // PRIVATE METHOD
    // =======================
    static _generateValues(object)
    {
        let format = '*';
        let values = object.values;

        if(!values) return format;

        if(!Array.isArray(values))
        {   
            console.log('[ error ] [ DataBase ] Error: The values parameter has to be an array.')
            return format;
        }

        format = '';

        values.forEach(value => {

            if(typeof value === 'string')
            {
                let attr = value.split(':');

                if(attr.length==1)
                {
                    format+= convert._isFunctionExist(attr[0]) ? `${attr[0].trim()}, ` : `\`${attr[0].trim()}\`, `;
    
                } else if (attr.length==2){   
    
                    format+= convert._isFunctionExist(attr[0]) ? `${attr[0].trim()} AS \`${attr[1].trim()}\`, ` :  `\`${attr[0].trim()}\` AS \`${attr[1].trim()}\`, `;
    
                } else {
    
                    console.log('[ error ] [ DataBase ] Error: The alias is not well defined.')
                }
            }

        });

        format = format.slice(0,-2);

        return format;
    }

    static _generateWhere(object)
    {
        let format = '';
        let where  = object.where;

        if(!where) return format;

        if(typeof where !== 'object') return format;

        if(Array.isArray(where))
        {
            console.log('[ error ] [ DataBase ] Error: It has to be an object and not an array.')
            return format;
        } 
        
        format = ' WHERE ';

        for (const key in where) 
        {
            let attr = key.split(':');

            if(attr.length == 1)
            {
                // Comprobar si es un array, si es así esto determinar un OR de SQL
                if(Array.isArray(where[key]))
                {   
                    // Primer ciclo del bucle
                    if(format.length != 7) format += ' AND ';

                    format += '( ';

                    where[key].forEach((value, index)=>{

                        format += (value==null) ? `\`${key}\` is null OR ` : `\`${key}\` = :w_${key}_${index} OR `;
                    });

                    format = format.slice(0,-3);
                    format += ') ';

                } else {

                    if(format.length != 7) format += ` AND `;

                    if(where[key]==null)
                    {
                        format += `\`${key}\` is null`;   

                    } else {

                        format += `\`${key}\` = :w_${key}`;   
                    }

                }

            } else {

                format += '( ';

                attr.forEach((value, index)=>{
            
                    format += `\`${value}\` = :w_${value}_${index} OR `

                });

                format = format.slice(0,-3);
                format += ') ';
            }
        } 

        return format;
    }

    static _generateIn(object, isNot = '')
    {
        let format = '';
        let where  = object.where;
        let _in    = isNot == '' ? object.in : object.notIn; 
        let prefix = isNot == '' ? 'in' : 'notIn'; 

        if(!where) format = ' WHERE ';

        if(typeof _in !== 'object') return format;

        if(Array.isArray(_in))
        {
            console.log('[ error ] [ DataBase ] Error: It has to be an object and not an array.')
            return format;
        } 

        for (const key in _in) 
        {   
            let attr = key.split(':');

            if(attr.length == 1)
            {
                console.log(_in[key])

                // Array de OR 
                if(Array.isArray(_in[key]))
                {   
                    if(format != ' WHERE ' ) format += ' AND ';

                    format += `\`${key}\` ${isNot} IN( `;

                    _in[key].forEach((value, index)=>{
                
                        format += `:${prefix}_${key}_${index} , `

                    });

                    format = format.slice(0,-3);
                    format += ' ) ';
                
                } else {
                    
                    if( format != ' WHERE ' ) format += ' AND ';

                    format += `\`${key}\` ${isNot} IN( :${prefix}_${key} )`;
                    
                }

            } else {

                if(format != ' WHERE ' ) format += ' AND ';

                format += '( ';

                attr.forEach((value, index)=>{
            
                    format += `\`${value}\` ${isNot} IN ( :${prefix}_${value}_${index} ) `

                });

                format = format.slice(0,-3);
                format += ') ';
            }

            
        }

        return format;
    }

    static _generateLike(object)
    {
        let format = '';
        let where  = object.where;
        let like   = object.like;

        if(!where) format = ' WHERE ';

        if(typeof like !== 'object') return format;

        if(Array.isArray(like))
        {
            console.log('[ error ] [ DataBase ] Error: It has to be an object and not an array.')
            return format;
        } 

        return format;
    }

    static _generateOrder(object)
    {
        let format = '';

        return format;
    }

    static _generateLimit(object)
    {
        let format = '';

        return format;
    }

    static _isFunctionExist(attr)
    {
        const regex = /\(/gm;
        return regex.test(attr);
    }
}

exports.convert = convert;