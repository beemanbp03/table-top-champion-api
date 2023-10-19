const express = require('express');
const PORT = 8000;
const app = express();
const fs = require('fs');

const readJsonFile = (filePath) => {
    try {
        // Read the file
        const jsonData = fs.readFileSync(filePath, 'utf8');
        //Parse the JSON data into an array
        const dataArray = JSON.parse(jsonData);

        return dataArray;

    } catch (err) {
        console.log("Error reading JSON file: " + err);
    }
}
//Space Marines Array Length Output
const spaceMarineFilePath = './json/space-marines/space-marine-unit-datasheets.json';
const spaceMarineDataArray = readJsonFile(spaceMarineFilePath);
console.log("\nSpace Marines length: " + spaceMarineDataArray.length);

//Tyranids Array Length Output
const tyranidsFilePath = './json/tyranids/tyranids-unit-datasheets.json';
const tyranidsDataArray = readJsonFile(tyranidsFilePath);
console.log("Tyranids length: " + tyranidsDataArray.length + "\n");

app.get("/", (req, res) => {
    res.send(`<h1>API for Warhammer 40,000 10th Edition</h1>`);
});



////////////RUN SERVER ON SPECIFIC PORT////////////
app.listen(process.env.PORT || PORT, () => console.log(`server is running on PORT ${PORT}`));