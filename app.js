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
const spaceMarineFactionFilePath = './json/space-marines/space-marine-faction-overview.json';
const spaceMarineDataArray = readJsonFile(spaceMarineFilePath);
const spaceMarineFactionOverview = readJsonFile(spaceMarineFactionFilePath);
console.log("\nSpace Marines length: " + spaceMarineDataArray.length);

//Tyranids Array Length Output
const tyranidsFilePath = './json/tyranids/tyranids-unit-datasheets.json';
const tyranidsDataArray = readJsonFile(tyranidsFilePath);
console.log("Tyranids length: " + tyranidsDataArray.length + "\n");

app.get("/", (req, res) => {
    res.send(`<h1>API for Warhammer 40,000 10th Edition</h1>`);
});

//Space-Marine Endpoints
app.get("/adeptus-astartes", (req, res) => {
    res.send(`${JSON.stringify(spaceMarineFactionOverview, 0, 2)}`);
});

spaceMarineDataArray.forEach( (item, index) => {
    app.get(`/adeptus-astartes/${item["uri-name"]}`, (req, res) => {
        res.send(`${JSON.stringify(item, 0, 2)}`);
    })
});

//Tyranid Endpoints
app.get("/tyranids", (req, res) => {
    res.send(`<h1>Faction Overview for Tyranids Coming Soon</h1>`);
});

tyranidsDataArray.forEach((item, index) => {
    app.get(`/tyranids/${item["uri-name"]}`, (req, res) => {
        res.send(JSON.stringify(item));
    })
});



////////////RUN SERVER ON SPECIFIC PORT////////////
app.listen(process.env.PORT || PORT, () => console.log(`server is running on PORT ${PORT}`));