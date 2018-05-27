//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var app = express(); 

// Body Parser Middleware
app.use(bodyParser.json()); 

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

//Setting up server
 var server = app.listen(process.env.PORT || 8081, function () {
    var port = server.address().port;
    console.log("BiTech APIs running on port", port);
 });


//Function to connect to database and execute query
var  executeQuery = function(res, query){             
     sql.connect(dbConfig, function (err) {
         if (err) {   
                     console.log("Error while connecting database :- " + err);
                     res.send(err);
                  }
                  else {
                         // create Request object
                         var request = new sql.Request();
                         // query to the database
                         request.query(query, function (err, res) {
                           if (err) {
                                      console.log("Error while querying database :- " + err);
                                      res.send(err);
                                     }
                                     else {
                                       res.send(res);
                                            }
                               });
                       }
      });           
}

//GET API
app.get("/api/user", function(req , res){
                var query = "select * from [user]";
                                       res.send("Hello Get");
});

//POST findKeywords API
 app.post("/findKeywords", function(req , res){
    res.send("Hello POST");
});

//PUT API
 app.put("/api/user/:id", function(req , res){
                                       res.send("Hello PUT");
});

// DELETE API
 app.delete("/api/user /:id", function(req , res){
                                       res.send("Hello Delete");
});