//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var Util = require('./utility');


app.use(express.static(__dirname + '/../front-end'));

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

var path = require('path');

//GET API
app.get("/bitech", function (req, res) {
    res.sendFile(path.join(__dirname + '/../front-end/index.html'));
});

//POST findKeywords API
app.post("/findKeywords", function (req, res) {
    console.log("findKeywords API Called")

    console.log("Request Parameters")
    console.log(req.body)


    let title = req.body.title;
    let description = req.body.description;
    let bgInformation = req.body.bgInformation;

    let text = title + description + bgInformation;
    console.log("Final Text :")
    console.log(text)

    if (text) {
        let pdfKeywords;
        Util.readKeyword(function (result) {
            pdfKeywords = result;
            let docKeywords;
            Util.findKeyword(text, function (textKeywords) {
                docKeywords = textKeywords;
                Util.matchKeyword(docKeywords, pdfKeywords, function (matchedKeywords) {
                    res.json({
                        success: true,
                        error: false,
                        keywords: matchedKeywords
                    });

                });

            });
        });
    } else {
        res.json({
            success: false,
            error: true,
            message: "Provide text"
        });
    }


});

var multiparty = require('multiparty');
let fs = require('fs');
//PUT API
app.put("/uploadFile", function (req, res) {
    console.log(req);
    console.log('API: uploadFile ' + 'STEP: Start');

    let form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
        console.log(files);
        let { path: tempPath, originalFilename } = files.file[0];
        var fileType = originalFilename.split(".");
        let copyToPath = "./files/" + "keywords" + '.' + fileType[1];
        let dbPath = fields.id + '.' + fileType[1];
        fs.readFile(tempPath, (err, data) => {
            if (err) throw err;
            fs.writeFile(copyToPath, data, (err) => {
                if (err) throw err;
                // delete temp image
                fs.unlink(tempPath, () => {
                    console.log('API: upload file ' + 'STEP: File saved to new path');
                    res.send({
                        error:false,
                        success:true,
                        message:"File Upload Success"
                    });
                    return;
                });
            });
        });

});
});
// DELETE API
app.delete("/api/user /:id", function (req, res) {
    res.send("Hello Delete");
});