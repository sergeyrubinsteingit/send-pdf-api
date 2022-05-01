// This code generates a sample PDF and sends it to email as base64 encoded string

const PDFDocument = require('pdfkit');
const fs = require('fs');
const baSe64 = require('base64-async');
const path = require('path');
const openurl = require('openurl');
const exPress = require('express')();

//const httpRequest = require('https');
//const formData = new require('form-data')();
//const formData = require('form-data');
//const fetCh = require('node-fetch');
//const getHeaders = new fetCh.Headers();
//const js_pdf = require('jspdf');
//var blOb = require('blob');
//const { StringDecoder } = require('string_decoder');

const pathToPdf = path.join(__dirname, 'source/sample_form.pdf');
let createSamplePdf = new Object;

new Promise((resolve, reject) => {
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
    docObj = new PDFDocument({ margin: 30, size: 'A4' }); // Create pdf
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
        setTimeout(() => {
            openurl.open('http://localhost:' + setPort);
            console.log(`Server is running on localhost-> ${setPort}`);
        }, 500);//[setTimeout]
        setTimeout(() => {
            process.exit();
        }, 1500);//[setTimeout]
    })//[listen];
};//[fn]