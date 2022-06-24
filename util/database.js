// MYSQL2

const pool = mysql.createPool({
  host: '192.168.10.18',
  user: 'root',
  database: 'shop',
  password: 'password'
});

module.exports = pool.promise();