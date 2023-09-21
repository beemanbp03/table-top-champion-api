const express = require('express');
const PORT = 8000;
const cheerio = require('cheerio');
const axios = require('axios').default;
const app = express();

app.get("/", (req, res) => {
    res.send(`
        <h1>table-top-champion Web Scraping API</h1>
        <p>This is a testing ground for webscraping the following pages of Wahwapedia </p> 
        <ol>
            <li>
                <a href="https://wahapedia.ru/wh40k10ed/factions/space-marines/">Wahwapedia - Space Marines Page</a>
            </li>
            <li>
                <a href="https://wahapedia.ru/wh40k10ed/factions/tyranids/">Wahwapedia - Tyranids</a>
            </li>
        </ol>
    `);
})

app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`));


