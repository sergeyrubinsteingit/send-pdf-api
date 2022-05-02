// This code generates a sample PDF and sends it to email as base64 encoded string

const PDFDocument = require('pdfkit');
const fs = require('fs');
const baSe64 = require('base64-async');
const paTh = require('path');

const allCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const randomString = (setLength) => {
    let randString = '';
    for (let aa = 0; aa < setLength; aa++) {
        randString += allCharacters.charAt(Math.floor(Math.random() * allCharacters.length));
    }
    return randString;
};
/*randomString(15)*/;

let iter = 0;
const iterLimit = 3;
const pathToJSON = __dirname + '//source/files_list.json';
let parseJSONdata = [];
createPdf();
function createPdf() {
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

    //Writing the output array of base64 strings to log file:
    const pathToLog = __dirname + '//source/log_.txt';
    const myConsole = new console.Console(fs.createWriteStream(pathToLog));
    myConsole.log(bs64strings);

    //Removing 1st element in JSON:
    parseJSONdata.splice(0, 1);
    ///////////////////////////////////////////////////////
    for (iter = 0; iter < iterLimit; iter++) {
        const pathToPdf = paTh.join(__dirname, 'source/dummi_pdf_' + iter + '.pdf');
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
            //console.log(randomString(15));
            const theText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
                + ' Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,'
                + ' when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
                + 'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'
                + 'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, '
                + 'and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';

            docObj = new PDFDocument({ margin: 30, size: 'A4' }); // Create pdf page of size A4
            docObj.pipe(fs.createWriteStream(pathToPdf));  // Node Stream to save pdf in the root dir
            docObj.rect(90, 45, 420, 790).fillAndStroke('#ddd', '#ddd').stroke();//[Rectangle frame]
            let getRandomString = randomString(15);
            docObj.fillColor('#999999')
                .font('Helvetica-Bold')
                .fontSize(24)
                .text(`${getRandomString}`, 112, 102); //[randomString]
            docObj.fillColor('#ffffff')
                .font('Helvetica-Bold')
                .fontSize(24)
                .text(`${getRandomString}`, 110, 100); //[randomString]

            docObj.moveDown(2);
            docObj.image('source/dog_' + iter + '.jpg', 90, 100, { fit: [420, 400], align: 'left', valign: 'center' })
                .font('Helvetica-Bold').fontSize(10)
                .text('Dog-' + iter + '.jpg', 110, 430); // adding image
            docObj.moveDown(11);
            docObj.fillColor('#444d38').font('Helvetica-Bold').fontSize(22).text(`The Dog`, 110, 450); // adding text
            docObj.moveDown(0.5);
            docObj.fillColor('#7d8276').font('Helvetica').fontSize(14).text(` ${theText}`, {
                columns: 2,
                columnGap: 15,
                height: 220,
                width: 350,
                align: 'left'
            }, 500, 110 ); // adding text
            docObj.end(); // closing file's formation
            return docObj;
        })
            .then(console.log('createSamplePdf, End of Promise'))
            .then(setTimeout(() => { fs.existsSync(pathToPdf) ? getBase64() : console.log('File does not exist.') }, 1000))

        let encodedFile = new Object();

        function getBase64() {
            new Promise((resolve, reject) => {
                const buFFer = fs.readFileSync(pathToPdf);
                console.log(Buffer.isBuffer(buFFer) ? 'Buffer is created' : 'Buffer was not created');
                baSe64.encode(buFFer).then(base64String => writeToJSON(base64String))
            })
        }//[fn]

        function writeToJSON(base64String) {
            //Creating a new data block to append to json:
            let appendixToJSON = { base64String };
            //Adding a new data block to array to be writen to JSON:
            parseJSONdata.push(appendixToJSON);
            //A new array to be written in JSON instead of former one,
            //with an appendix added to:
            const updatedJSONdata = JSON.stringify(parseJSONdata);
            //Write data to JSON
            fs.writeFileSync(pathToJSON, updatedJSONdata, (err_) => {
                if (err_) {
                    throw err_; console.log('A problem with json.............');
                }
                else {
                    console.log('JSON was updated.');
                };//[if]
            });
            setTimeout(() => { readFromJSON(); }, 1000);
        };//[fn createPdf]
    }//[for]


    function readFromJSON() {
        fs.readFile(__dirname + '//source/files_list.json', 'utf8', (err, jsonString) => {
            if (err) {
                console.log("File read failed:", err);
                return;
            }
            //console.log("File data:", jsonString);
        });
    }
}//[fn]