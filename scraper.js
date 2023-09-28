const express = require('express');
const PORT = 8000;
const cheerio = require('cheerio');
const axios = require('axios').default;
const app = express();

//Set any JSON in a response to be formatted
app.set('json spaces', 2);

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
});

app.get("/space-marines", async (req, res) => {
    var spaceMarineContent = {} //Create mutable JSON that will contain all faction information

    await axios.get('https://wahapedia.ru/wh40k10ed/factions/space-marines/').then((response) => {
        var html = response.data;
        var $ = cheerio.load(html);

        //Faction Title and Description
        var factionTitle = $('.page_header_span').text();
        var factionDescription = $('[id=wrapper] .Columns2 div:first p').text();

        //Army Rules
        var oathOfMoment = $('[id=wrapper] .Columns2 div:eq(0)').each(function(index, element){
            var h3ToRemove = $('h3:first').remove();
            var pToRemove = $('p:first').remove();
        }).text();
        

        //Add page contents to JSON object
        spaceMarineContent = {
            "faction title" : factionTitle,
            "faction description" : factionDescription,
            "oath of moment" : oathOfMoment
        }


        /*Console logs*/
        console.log("Title: " + factionTitle + "\n");
        console.log("Description: " + factionDescription + "\n");
        console.log("Oath Of Moment: " + oathOfMoment + "\n");
        
    })

    res.json(spaceMarineContent);
});

app.get("/tyranids", (req, res) => {
    res.send(`
        TESTING TESTING TESTING
    `);
});

app.listen(process.env.PORT || PORT, () => console.log(`server is running on PORT ${PORT}`));


