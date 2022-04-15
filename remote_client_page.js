///////// Creates page on client side ///////
//const getExpress = require('express')();
const reqHttp = require('http');
const setPort = 8080;

    console.log('test');
    reqHttp.createServer(function (req_, res_) {
        let generateHTML = createHTML(req_);
        res_.writeHead(200, {
            'Content-Type': 'text/html',
            'Content-Length': generateHTML.length
        });//[writeHead]
        res_.end(generateHTML);
    }).listen(setPort);//[fn]

let allDivs ='';
function createHTML() {
    let setHeader = '<style>.containerDiv{position:absolute; top:25%;left:25%; background-color:red; width:50%;height:50%;}'
        +'.childDiv{position:relative; top:1%;left:1%; background-color:green;margin:2px; width:100px;height:25px;}'
        +'</style > ';

    for (let i = 0; i < 5; i++) {
        let divString = '<div class=\"childDiv\">pdf-file '+i+'</div>';
        allDivs += divString;
    }
    console.log(allDivs);

    let setBody = '<div class=\"containerDiv\">' + allDivs + '</div>';

    return '<!DOCTYPE html>'
        + '<html><head>' + setHeader + '</head><body>' + setBody + '</body></html>';

}//[fn]