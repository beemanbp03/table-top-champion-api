const express = require('express');
const PORT = 8000;
const app = express();

app.get("/", (req, res) => {
    res.send(`<h1>PDF Scraper For Warhammer Documents</h1>`);
});



////////////RUN SERVER ON SPECIFIC PORT////////////
app.listen(process.env.PORT || PORT, () => console.log(`server is running on PORT ${PORT}`));