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

const filePath = './json/space-marines/unit-datasheets.json';
const dataArray = readJsonFile(filePath);
console.log("unit-datasheets length: " + dataArray.length);

app.get("/", (req, res) => {
    res.send(`<h1>API for Warhammer 40,000 10th Edition</h1>`);
});



////////////RUN SERVER ON SPECIFIC PORT////////////
app.listen(process.env.PORT || PORT, () => console.log(`server is running on PORT ${PORT}`));