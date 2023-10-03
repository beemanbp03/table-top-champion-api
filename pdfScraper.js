const fs = require('fs');
const pdfParse = require('pdf-parse');

const pdfFile = fs.readFileSync('./pdf/dflD0FuH0G975Ap3.pdf');

pdfParse(pdfFile).then((data) => {
    // number of pages
    console.log("# of pages: " + data.numpages);
    // number of rendered pages
    console.log("# of rendered pages: " + data.numrender);
    // PDF info
    console.log("pdf info: " + JSON.stringify(data.info, null, 2));
    // PDF metadata
    console.log("metadata: " + JSON.stringify(data.metadata, null, 2)); 
    // PDF.js version
    // check https://mozilla.github.io/pdf.js/getting_started/
    console.log("version: " + data.version);
    // PDF text
    console.log(data.text); 
});