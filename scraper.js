const express = require('express');
const wwwhisper = require('connect-wwwhisper');
const PORT = 8000;
const cheerio = require('cheerio');
const axios = require('axios').default;
const app = express();

app.use(wwwhisper());

//Set any JSON in a response to be formatted
app.set('json spaces', 2);

////////////SCRAPE FUNCTIONS////////////

const spaceMarineScrape = async (source) => {
    console.log("RUNNING spaceMarineScrape function");

    var scrapedContent = await axios.get(`https://wahapedia.ru/wh40k10ed/factions/${source.name}/`).then((response) => {
        var html = response.data;
        var $ = cheerio.load(html);
    
        //Faction Title and Description
        var factionTitle = $('.page_header_span').text();
        var factionDescription = $('[id=wrapper2] [id=wrapper] b:eq(5)').text();
    
        //Army Rules
        var oathOfMomentDescription = $('[id=wrapper] .Columns2 .BreakInsideAvoid:eq(0) p').text();
        var oathOfMomentRule = $('[id=wrapper] .Columns2 .BreakInsideAvoid:eq(0)').each(function(index, element){
            $('[id=wrapper] .Columns2 .BreakInsideAvoid:eq(0) h3').remove();
            $('[id=wrapper] .Columns2 .BreakInsideAvoid:eq(0) p').remove();
        }).text();
    
        /*Console logs*/
        console.log("Title: " + factionTitle + "\n");
        console.log("factionDescription: " + factionDescription);
        console.log("Description: " + oathOfMomentDescription + "\n");
        console.log("Oath Of Moment: " + oathOfMomentRule + "\n");  
        
        //Return page contents as JSON object
        return {
            "faction title" : factionTitle,
            "faction description" : factionDescription,
            "army-rules" : {
                "oath-of-moment" : {
                    "description" : oathOfMomentDescription,
                    "rule" : oathOfMomentRule,
                }
            }
        };
    });
    
    return scrapedContent;
};

const tyranidsScrape = async (source) => {
    console.log("RUNNING tyranidsScrape function");

    var scrapedContent = await axios.get(`https://wahapedia.ru/wh40k10ed/factions/${source.name}/`).then((response) => {
        var html = response.data;
        var $ = cheerio.load(html);
    
        //Faction Title and Description
        var factionTitle = $('.page_header_span').text();
        var factionDescription = $('[id=wrapper2] [id=wrapper] b:eq(4)').text();
    
        //Army Rules
        var synapseDescription = $('[id=wrapper] .Columns2 .BreakInsideAvoid:eq(0) p').text();
        
        var synapseRule = $('[id=wrapper] .Columns2 .BreakInsideAvoid:eq(0)').each(function(index, element){
            $('[id=wrapper] .Columns2 .BreakInsideAvoid:eq(0) h3').remove();
            $('[id=wrapper] .Columns2 .BreakInsideAvoid:eq(0) p').eq(0).remove();
        }).text();
        
        

        var shadowInTheWarpDescription = $('[id=wrapper] .Columns2 .BreakInsideAvoid:eq(1) p').text();
        
        var shadowInTheWarpRule = $('[id=wrapper] .Columns2 .BreakInsideAvoid:eq(1)').each(function(index, element){
            $('[id=wrapper] .Columns2 .BreakInsideAvoid:eq(1) h3').remove();
            $('[id=wrapper] .Columns2 .BreakInsideAvoid:eq(1) p').remove();
        }).text();
        
    
        /*Console logs*/
        //console.log("Title: " + factionTitle + "\n");
        //console.log("Description: " + factionDescription + "\n");
        console.log("Synapse Description: " + synapseDescription + "\n");
        console.log("Synapse Rule: " + synapseRule + "\n");  
        console.log("Shadow In The Warp Description: " + shadowInTheWarpDescription + "\n");
        console.log("Shadow In The Warp Rule: " + shadowInTheWarpRule + "\n");  
        
        //Return page contents as JSON object
        return {
            "faction title" : factionTitle,
            "faction description" : factionDescription,
            "army-rules" : {
                "synapse" : {
                    "description" : synapseDescription,
                    "rule" : synapseRule,
                },
                "shadow-in-the-warp" : {
                    "description" : shadowInTheWarpDescription,
                    "rule" : shadowInTheWarpRule,
                }
            }
        };
    });

    return scrapedContent;
};



////////////API SOURCES FOR SCRAPING////////////
const apiSources = [
    {
        name : "space-marines",
        scrapeFunction : spaceMarineScrape,
    },
    {
        name : "tyranids",
        scrapeFunction: tyranidsScrape,
    }
]

////////////API ROUTES////////////
app.get("/", (req, res) => {
    res.send(`
        <h1>table-top-champion Web Scraping API</h1>
        <p>This is a testing ground for webscraping the following pages of Wahwapedia </p> 
        <h3>Sources</h3>
        <ol>
            <li>
                <a href="https://wahapedia.ru/wh40k10ed/factions/space-marines/">Wahwapedia - Space Marines Page</a>
            </li>
            <li>
                <a href="https://wahapedia.ru/wh40k10ed/factions/tyranids/">Wahwapedia - Tyranids</a>
            </li>
        </ol>
        <br>
        <h3>API Routes</h3>
        <ol>
            <li>
                <a href="https://table-top-champion-api-41291195a5cd.herokuapp.com/space-marines">/space-marines</a>
            </li>
            <li>
            <a href="https://table-top-champion-api-41291195a5cd.herokuapp.com/tyranids">/tyranids</a>
            </li>
        </ol>
        <p></p>
    `);
});

apiSources.forEach( (source, index, apiSources) => {
    app.get(`/${source.name}`, async (req, res) => {
        console.log("Running app.get('/${source.name}') route")
        
        res.json(await source.scrapeFunction(source));
    });
});

////////////RUN SERVER ON SPECIFIC PORT////////////
app.listen(process.env.PORT || PORT, () => console.log(`server is running on PORT ${PORT}`));


