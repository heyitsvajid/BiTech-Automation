var pdfreader = require('pdfreader');
const rake = require('node-rake')

module.exports = {
findKeyword : function(text,callback) {
  let finalKeywords = []
  const rakeKeywords = rake.generate(text);
  rakeKeywords.forEach(keyword => {
    console.log("keyword : "+keyword)
    let cleanKeyword = keyword.match(/[^_\W]+/g).join(' ');
    console.log("cleanKeyword : "+cleanKeyword)
    let arr = cleanKeyword.split(' ')
    Array.prototype.push.apply(finalKeywords, arr);
  });
  callback(finalKeywords);
  },

matchKeyword : function(docKeywords,pdfKeywords,callback){
  let keys=Object.keys(pdfKeywords);
  
  let matchedKeywords =[]
  for(let i=0;i<docKeywords.length;i++){
      keys.forEach(key => {
        if(key.includes(docKeywords[i].toLowerCase())){
          matchedKeywords.push(pdfKeywords[key]+" : "+key)
        }
      });
  }
  console.log(matchedKeywords.length)
  callback(matchedKeywords)
},

readKeyword : function(callback){ 
  console.log("Reading Keywords from PDF");
  var path = require('path')
  var filePath = path.join(__dirname, 'files/keywords.pdf')
  var extract = require('pdf-text-extract')
  extract(filePath, { splitPages: false }, function (err, text) {
    if (err) {
      console.dir(err)
      return
    }
    let keywords = {}
    //console.dir(text)
    for(let i=0;i<text.length;i++){
      let lines = text[i].replace(/\r\n/g, "\r").replace(/\n/g, "\r").split(/\r/);
      lines.forEach(line => {
        let lineItems = line.replace(/\s\s+/g, ' ').split(' ');
        if(isANumber(lineItems[0]) && lineItems[0].length==11){
          //console.log('Adding for pair :')
          let value = lineItems[0]
          let key = lineItems.slice(1).toString().replace(/,/g,' ').toLowerCase().replace(/\d+/g, '');
          keywords[key]=value;
          //console.log(pair)
        }
      });  
    }
    callback(keywords);

  })
}
}
function isANumber( n ) {
  var numStr = /^-?(\d+\.?\d*)$|(\d*\.?\d+)$/;
  return numStr.test( n.toString() );
}
