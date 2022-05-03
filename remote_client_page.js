///////// This script creates page on client side
///////// with buttons on which enables a user
/////////  to open base64-encoded pdf files
///////// in new window each.

const reqHttp = require('http');
const fs = require('fs');
const openurl = require('openurl');
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
let randomStrings = [];
for (key_ in parseJson) {
    for (val_ in parseJson[key_]) {
        val_ === "bs64str" ? bs64strings.push(parseJson[key_][val_]) : randomStrings.push(parseJson[key_][val_]);
    }//[for]
}//[for]
        //console.log(bs64strings + "  < bs64strings \n\n\n");
let allDivs = '';
for (let i = 0; i < bs64strings.length; i++) {
    setTimeout(() => {
        let divString = '<div class=\"childDiv\" onclick=\"openPdfFile(\'' + bs64strings[i] + '\',\'' + randomStrings[i] + '\');\">pdf-file # ' + randomStrings[i] + '</div>';
        allDivs += divString;
    },500);//[setTimeout]
};//[for]

// Creating a local server ////////////////////////////////////////////////////////
reqHttp.createServer(function (req_, res_) {
    let generateHTML = createHTML();
    res_.writeHead(200, {
            'Content-Type': 'text/html',
            'Content-Length': generateHTML.length
        });//[writeHead]
    res_.end(generateHTML);

        }).listen(setPort,
                setTimeout(() => {
                    openurl.open('http://localhost:' + setPort);
                    console.log(`Server is running on localhost-> ${setPort}`);
                }, 500),//[setTimeout]
                setTimeout(() => {
                    process.exit();
        }, 1500)//[setTimeout]
);//[fn]

// Creates a html page to be open on localhost /////////////////////////////////////////
function createHTML() {
    function openPdfFile(bs64, randomStr) {
        let pdfWindow = window.open("", "_blank", "top=10,left=10,width=555,height=1000");
            pdfWindow.document.write('<head><style> '
                + 'body {background-color: #332d26;}'
            + '#downloadDiv {position:absolute;top:0%;left:0%;background-color:#a3a183;width:40%;height:10%;z-index:2;'
            + 'border:0px solid;border-radius:0px 0px 15px 0px;text-align: center;'
                + 'display: flex; align-items: center;justify-content: center;}'
                + '.downloadLink{color:#fff;font-family:Helvetica,sans-serif;font-size:14pt;'
                + 'font-weight:bold;text-shadow: 2px 2px 2px #332d26;}'
            + '</style>');
            pdfWindow.document.write('</head>');
            pdfWindow.document.write("<body>");//[body]
            pdfWindow.document.write("<embed width='100%' height='100%' src='data:application/pdf;base64, " + encodeURI(bs64) + "'></embed>");//[pdfWindow]
            pdfWindow.document.write("<div id='downloadDiv'></div>");//[Download]
            //Link for download PDF file
            const downloadLink = document.createElement('a');
                downloadLink.setAttribute("class", "downloadLink"); 
                downloadLink.setAttribute("style", "this.style.color = '#faf7ac';text-decoration: none;");
                downloadLink.setAttribute("onmouseover", "this.style.color = '#faf7ac';");
                downloadLink.setAttribute("onmouseout", "this.style.color = '#fff';");
                downloadLink.setAttribute("onmousedown", "this.style.color = '#f0a13a';");
                downloadLink.innerHTML = 'Download PDF file';
                downloadLink.download = randomStr + '.pdf';
                downloadLink.href = 'data:application/octet-stream;base64,' + bs64;
            pdfWindow.document.getElementById('downloadDiv').appendChild(downloadLink);
            pdfWindow.document.write("</body>");//[body]
            pdfWindow.document.close();
    };//[fn openPdfFile]
    
    let setHeader = '<style> '
        + 'body {background-color: #332d26;}'
        + '.containerDiv {position:fixed;top:50%;left:50%;background-color:#a3a183;width:25%;height:auto; max-height: 50%;padding-bottom:5px;'
        + 'transform:translate(-50%,-50%);border:0px solid;border-radius:0px 0px 10px 10px;overflow:auto;}'
        + '.childDiv{position:relative;top:50%;left:50%;background-color:#faf7ac;margin-bottom:11px;width:95%;height:25px;cursor:pointer;'
        + 'color:#54544b;font-family:Helvetica,sans-serif;font-size:11pt;font-weight:bold;'
        + 'border:0px solid;border-radius:5px 5px 5px 5px;text-align: center;'
        + 'transform:translate(-50%,-50%);'
        + 'display: flex; align-items: center;justify-content: center;}'
        + '#linksHeader{color:#ffffff;font-family:Helvetica,sans-serif;font-size:22pt;font-weight:bold;'
        + 'display: flex; align-items: center;justify-content: center;'
        + 'padding-bottom:22px;text-shadow: 2px 2px 2px #332d26;}'
        + '</style>';   /*setHeader*/

    let linksHeader = '<p id="linksHeader">Click to open a file</p>';

    let setBody = '<div class=\"containerDiv\">' + linksHeader + allDivs + '</div>'
        + '<script>' + openPdfFile + '</script>';  /*setBody*/

    return '<!DOCTYPE html>'
        + '<html>'
        + '<head>' + setHeader + '</head>'
        + '<body>' + setBody + '</body>'
        + '</html>';
}//[fn createHTML]