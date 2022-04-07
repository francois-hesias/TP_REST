const express = require("express");
const app = express();
let mysql = require('mysql');

let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Tourtour123',
    database : 'nodejs',
    insecureAuth : true
});
//connexion mysql
connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
});


//app.get("/", (req, res) => {

//res.json({message:'Root page'})

//})

//Affichage de tout les films
app.get("/movies", (request, response) => {

    connection.query('SELECT * FROM movies', (err,rows) => {
      if(err) throw err;
    
      response.json({data:rows})
    
    });
    })
//Recherche d'un film en particulier dans la base
app.get("/movies/:name", (request, response) => {
  const titre=request.params.name
  console.log(titre)
  connection.query(`SELECT * FROM movies where title like \'${titre}\'`, (err,rows) => {
    if(err) throw err;
  
    response.json({data:rows})
  
  });
})
// Modification d'un film
app.post("/movies", (req, res) => {
  const newMovies = req.body;
  connection.query(
    "INSERT INTO movies (title,genre,director,release_year) VALUES(?)",
    newMovies,
    function (err, result) {
      if (err) throw err;
      console.log(newMovies);
      res.send(newMovies);
    }
  );
});

app.put("/movies", (req, res) => {
  const newMovies = req.body;
  connection.query(
    "UPDATE movies SET title=" +
      newMovies.title +
      ",genre= '" +
      newMovies.genre +
      "',genre='" +
      newMovies.director +
      "',director=" +
      newMovies.release_year +
      " WHERE release_year = " +
      newMovies.id,
    function (err, result) {
      if (err) throw err;
      console.log(newMovies);
      res.send(newMovies);
    }
  );
});


app.delete("/movies/:remove_name", (req, res) => {
  const titre=request.params.remove_name;
  connection.query(`DELETE FROM movies WHERE title like \'${titre}\'`, (err,rows) => {
    if (err) throw err;
    console.log(`Suppression du film \'${titre}\'`);
    res.send(`Suppression du film \'${titre}\'`);
  });
});

app.get('/', (req,res)=>{
  res.sendFile(__dirname +'/header.html');
  })
  
//run the application
const port = 5600;
app.listen(port,() =>{
    console.log(`running  on http://localhost:${port}`);
});
