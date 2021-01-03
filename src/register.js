class register
{
    static data(type='info', message='')
    {
        console.log(`[ ${type} ] [ DataBase ] ${message}`);
    }

}

module.exports = 
{
    info:  message => register.data('info', message ),
    error: message => register.data('error', message ),
    warn : message => register.data('warn', message ),
}