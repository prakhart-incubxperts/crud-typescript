var sql = require('mssql');

var dbConfig = {
    server:'PRAKHART',
    database:'testdb',
    user:'PRAKHART\\IncubXperts',
    password:'',
    port:6603
};

function getEmp() {
    var conn = new sql.Connection(dbConfig);
    var req = new sql.Request(conn);

    conn.connect(function(err) {
        if(err) {
            console.log(err);
            return;
        }
    else {
        console.log('success');
    }
});
}

getEmp();