// This code generates a sample PDF and sends it to email as base64 encoded string

const PDFDocument = require('pdfkit');
const fs = require('fs');
const baSe64 = require('base64-async');
const paTh = require('path');
//const httpRequest = require('https');
//const formData = new require('form-data')();
//const formData = require('form-data');
//const fetCh = require('node-fetch');
//const getHeaders = new fetCh.Headers();
const exPress = require('express')();
//const js_pdf = require('jspdf');
//var blOb = require('blob');
//const { StringDecoder } = require('string_decoder');

const pathToPdf = paTh.join(__dirname, 'source/sample_form.pdf');
let createSamplePdf = new Object;

const deleteOldPdf = new Promise((resolve, reject) => {
    // Deleting old file version in case it exists:
    console.log('Deleting old file version in case it exists');
    try {
        fs.existsSync(pathToPdf) ? fs.unlinkSync(pathToPdf) : null;
    }
    catch (err) {
        console.log('Deleting of the file [' + pathToPdf + '] failed. The process is stopped.');
        return false;
    }
})
    .then(createSamplePdf);//[Promise]

// Generating pdf file:
createSamplePdf = new Promise((reSolve, reJect) => {
    console.log()
    docObj = new PDFDocument; // Create pdf
    docObj.pipe(fs.createWriteStream(pathToPdf));  // Node Stream to save pdf in the root dir
    docObj.fontSize(18).text('The test-form', 100, 100); // adding text
    docObj.image('source/cesky-krumlov.jpg', { fit: [800, 300], align: 'center', valign: 'center' }); // adding image

    docObj.addPage().fillColor('red')
        .text("To the top of the document.", 100, 100)
        .link(100, 100, 160, 30, '#top'); // adding page

    docObj.end(); // closing file's formation
    return docObj;
})
    .then(console.log('End of Promise 1'))
    .then(setTimeout(() => { fs.existsSync(pathToPdf) ? getBase64() : console.log('File does not exist.') }, 1000))

let encodedFile = new Object();

function getBase64() {
    new Promise((resolve, reject) => {
        const buFFer = fs.readFileSync(pathToPdf);
        console.log(Buffer.isBuffer(buFFer) ? 'Buffer is created' : 'Buffer was not created');
        console.log(encodedFile.toString());
        //baSe64.encode(buFFer).then(base64String => console.log(base64String));
        baSe64.encode(buFFer).then(base64String => sendFormAndAttachment(base64String))
    })
}//[fn]

////////////////////////////////////////////////////////////////////////////////////////////////
function sendFormAndAttachment(fileString) {
    console.log(fileString + ' >>> TEST');
    const setPort = 8080;
    exPress.get("/", function (req, res) {
        res.set({
            'Content-Type': 'application/pdf;text/plain',
            'Authorization': 'Bearer'
        });
        let data = {
            name: "Send PDF Api",
            length: 000000000000000000
        }
        res.send(new Buffer.from(fileString, 'base64'));
        //res.sendFile(pathToPdf);
    });
    exPress.listen(setPort, () => {
        console.log(`Server is running on localhost-> ${setPort}`);
    });
};//[fn]
/////////////////////////////////////////////////////////////////////////////////////////////
//const sendFormAndAttachment = encodedFile => {
//    // Creating a new blob
//    //const blOb = new Blob([JSON.stringify(encodedFile, null, 0)], { type: 'application/json' });

//    // Hostname and port of the local server
//    //const formData = new FormData();
//    //var myHeaders = new fetch.Headers();

//    //formData.append("attachments", encodedFile, "sample_pdf.pdf");
//    formData.append("file", "{ \"extraDetails\": { \"FAM_REP_NAME\": \"FAM_REP_NAME_TEST\",\"SELLER_COMPANY_NAME\":\"SELLER_COMPANY_NAME_TEST\", \"FAM_BRANCH_CODE\":\"FAM_BRANCH_CODE_TEST\",\"SELLER_LINE_3\": \"fdgfg\", \"SELLER_LINE_2\": \"dfd\", \"SELLER_LINE_1\": \"sdff\", \"SELLER_CITY\": \"sdfsdff\", \"SELLER_POST_CODE\": \"dfgddg\", \"SELLER_EORI_NO\": \"jhj\", \"SELLER_COUNTRY_CODE\": \"AD\", \"BUYER_ACCOUNT_NUMBER\": \"BUYER_ACCOUNT_NUMBER\", \"BUYER_COMPANY_NAME\": \"BUYER_COMPANY_NAME\", \"BUYER_LINE_1\": \"BUYER_LINE_1\", \"BUYER_LINE_2\": \"BUYER_LINE_2\", \"BUYER_LINE_3\": \"BUYER_LINE_3\", \"BUYER_CITY\": \"BUYER_CITY\", \"BUYER_POST_CODE\": \"BUYER_POST_CODE\", \"BUYER_COUNTRY_CODE\": \"BJ\", \"BUYER_EORI_NO\": \"BUYER_EORI_NO\", \"CONSIGNMENT_REFERENCE\": \"CONSIGNMENT_REFERENCE\", \"SHIP_TO_COUNTRY\": \"AE\", \"SHIPPING_TABLE\": [ { \"TOTAL_PACKAGES\": 3, \"PACKING_TYPE\": \"Carton(s)\", \"ITEM_DESCRIPTION\": \"iphone\", \"GROSS_WEIGHT_SHIPMENT\": 35 }, { \"TOTAL_PACKAGES\": 5, \"PACKING_TYPE\": \"Carton(s)\", \"ITEM_DESCRIPTION\": \"5\", \"GROSS_WEIGHT_SHIPMENT\": 5 }, { \"TOTAL_PACKAGES\": 5, \"PACKING_TYPE\": \"Carton(s)\", \"ITEM_DESCRIPTION\": \"5\", \"GROSS_WEIGHT_SHIPMENT\": 5 }, { \"TOTAL_PACKAGES\": 5, \"PACKING_TYPE\": \"Carton(s)\", \"ITEM_DESCRIPTION\": \"5\", \"GROSS_WEIGHT_SHIPMENT\": 555 }, { \"TOTAL_PACKAGES\": 5, \"PACKING_TYPE\": \"Carton(s)\", \"ITEM_DESCRIPTION\": \"5\", \"GROSS_WEIGHT_SHIPMENT\": 555 }, { \"TOTAL_PACKAGES\": 5, \"PACKING_TYPE\": \"Carton(s)\", \"ITEM_DESCRIPTION\": \"5\", \"GROSS_WEIGHT_SHIPMENT\": 511 }, { \"TOTAL_PACKAGES\": 5, \"PACKING_TYPE\": \"Carton(s)\", \"ITEM_DESCRIPTION\": \"5\", \"GROSS_WEIGHT_SHIPMENT\": 7979 } ] } }");

//    //formData.append('username', 'abc123');
//    //formData.append('file', blOb);

//    fetCh('http://localhost:8080', {
//        //method: 'PUT',
//        method: 'POST',
//        headers: getHeaders,
//        body: formData,
//        redirect: 'follow'
//    })
//        .then(response => response.json())
//        .then(result => {
//            console.log('Success:', result);
//        })
//        .catch(error => {
//            console.error('Error:', error);
//        });
//}//[fn]

 //Sending forml:
//const sendFormAndAttachment = encodedFile => {
//    console.log(encodedFile);
//    //let formDataObj = new formData();
//        formData.append('attachments', "data:application/pdf;base64," + encodedFile);
//        formData.append("file", "{ \"extraDetails\": { \"FAM_REP_NAME\": \"FAM_REP_NAME_TEST\",\"SELLER_COMPANY_NAME\":\"SELLER_COMPANY_NAME_TEST\", \"FAM_BRANCH_CODE\":\"FAM_BRANCH_CODE_TEST\"}");

//        let makeQuery = httpRequest.request({
//            hostname: 'http://localhost:8080',
//            rejectUnauthorized: false,
//            path: pathToPdf,
//            method: 'POST',
//            headers: getHeaders,
//            body: formData
//        });

//    setTimeout(() => {
//        makeQuery.on("error", (errr) => {
//            console.error('ERROR PROCESSING [makeQuery] ');
//            //console.error(makeQuery);
//            console.error(errr);
//            return;
//        });

//        const getExpress = exPress();
//        getExpress.get('/', (req, res) => res.send(makeQuery.resource));
//        getExpress.get('/', (req, res) => res.send('[Send was performed]'));
//        getExpress.listen(setPort, () => console.log(`Example API is listening at http://localhost:${setPort}`));
//    }, 1000);//[tmout]
//}//[fn]