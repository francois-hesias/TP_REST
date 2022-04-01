const express = require("express");
const app = express();
let mysql = require('mysql');


let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'admininistrateur9',
    database : 'nodejs',
});
//connexion mysql
connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
  });


app.get("/", (req, res) => {

res.json({message:'Root page'})

})

//get all contact data example
app.get("/contacts", (request, response) => {

    connection.query('SELECT * FROM contact_list', (err,rows) => {
      if(err) throw err;
    
      response.json({data:rows})
    
    });
    })

//run the application
const port = 5600;
app.listen(port,() =>{
    console.log(`running  on http://localhost:${port}`);
})
