//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var app = express(); 
var Util = require('./utility');


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

//GET API
app.get("/api/user", function(req , res){
                var query = "select * from [user]";
                                       res.send("Hello Get");
});

//POST findKeywords API
 app.post("/findKeywords", function(req , res){
    console.log("findKeywords API Called")

    console.log("Request Parameters")
    console.log(req.body)
    
        
    let title = req.body.title;
    let description = req.body.description;
    let bgInformation = req.body.bgInformation;
    
    let text = title + description + bgInformation;
    console.log("Final Text :")
    console.log(text)

    if(text){
        let pdfKeywords;
        Util.readKeyword(function(result){
            pdfKeywords= result;
            let docKeywords;
            Util.findKeyword(text,function(textKeywords){
                docKeywords=textKeywords;
                Util.matchKeyword(docKeywords,pdfKeywords,function(matchedKeywords){
                    res.json({
                        success:true,
                        error:false,
                        keywords:matchedKeywords
                    });                                
                    
                });

            });
        });
    }else{
        res.json({
            success:false,
            error:true,
            message:"Provide text"
        });
    }


});

//PUT API
 app.put("/api/user/:id", function(req , res){
                                       res.send("Hello PUT");
});

// DELETE API
 app.delete("/api/user /:id", function(req , res){
                                       res.send("Hello Delete");
});