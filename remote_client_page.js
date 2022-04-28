///////// This script creates page on client side
///////// with buttons on which enables a user
/////////  to open base64-encoded pdf files
///////// in new window each.

const reqHttp = require('http');
const fs = require('fs');
const setPort = 8080;

//Reads base64 strings from json; populates an array with them:
const pathToJSON = __dirname + '//source/files_list.json';
let parseJSONdata = [];

//The section below is a preparation of JSON for updating:
//Reading and parsing an existing json data:
let readJSONdata = fs.readFileSync(pathToJSON);
parseJSONdata.push(readJSONdata);
let parseJson = JSON.parse(readJSONdata);

// Populating an array with base64 strings:
let bs64strings = [];
for (key_ in parseJson) {
    for (val_ in parseJson[key_]) {
        bs64strings.push(parseJson[key_][val_]);
    }//[for]
}//[for]
        //console.log(bs64strings + "  < bs64strings \n\n\n");

let allDivs = '';
for (let i = 0; i < bs64strings.length; i++) {
    setTimeout(() => {
        let divString = '<div class=\"childDiv\" onclick=\"openPdfFile(\'' + bs64strings[i] + '\');\">pdf-file ' + i.toString() + '</div>';
        allDivs += divString;
    },500);//[setTimeout]
};//[for]
//console.log(allDivs);

// Creating a local server ////////////////////////////////////////////////////////
reqHttp.createServer(function (req_, res_) {
    let generateHTML = createHTML();
    res_.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-Length': generateHTML.length
    });//[writeHead]
    res_.end(generateHTML);
    console.log('Remote Client Page - TEST');  ////
}).listen(setPort);//[fn]

// Creates a html page to be open on localhost /////////////////////////////////////////
function createHTML() {
    function openPdfFile(bs64)  {
            //alert(bs64);
            let pdfWindow = window.open("", "_blank", "top=10,left=10,width=555,height=1000");
                pdfWindow.document.write( "<iframe width='100%' height='100%' src='data:application/pdf;base64, " + encodeURI(bs64) + "'></iframe>" );//[pdfWindow]
        };//[fn openPdfFile]
    
    let setHeader = '<style> '
        + 'body {background-color: #54544b;}'
        + '.containerDiv {position:absolute;top:25%;left:25%;background-color:#a3a183;width:50%;height:50%;}'
        + '.childDiv{position: relative;top:11px; left:11px;background-color:#bade8a;margin-bottom:11px;width:95%;height:25px;cursor:pointer;}'
        + '</style>';   /*setHeader*/

    let setBody = '<div class=\"containerDiv\">' + allDivs + '</div>'
        + '<script>' + openPdfFile + '</script>';  /*setBody*/

    return '<!DOCTYPE html>'
        + '<html>'
        + '<head>' + setHeader + '</head>'
        + '<body>' + setBody + '</body>'
        + '</html>';
}//[fn createHTML]