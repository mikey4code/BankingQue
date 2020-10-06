
module.exports = {
    port: process.env.PORT || 3306,
    db: {
        database: process.env.DB_NAME || 'my_db',
        user: process.env.DB_USER || 'my_db',
        password: process.env.DB_PASS || 'my_db',
        options: {
            dialect: process.env.DIALECT || 'mysql',
            host: process.env.HOST || 'localhost',
            storage: path.resolve(__dirname, '../../tabtracker.sqlite')
        }
    }

}

