// const fetch = require('node-fetch');
import fetch from 'node-fetch';
import fs from "fs"
import cheerio from "cheerio" // i saw note fetch..but cheerio idk. check it out, what does it do, and tell me what you understood, google kro abhi.ok

// So tell me what it is? wo css ko load krta hai and provies faster solution? no. then? assume you send a HTTP get request to this page like which is en wikipediaUrl..mmhm.
// That page returns an HTML document, do you know what that is? <HTML> ..... </HTML> aise,haan that ik. so cheerio parses this html document, and then you can choose elements from it, we choose the p element and then fetched its text in the code.oooo...okay

// Function to fetch 100 words about a famous person from Wikipedia
async function fetchPersonInfo(personName) {
  try {
    // Construct the Wikipedia URL for the person's page
    const wikipediaURL = `https://en.wikipedia.org/wiki/${encodeURIComponent(personName)}`;

    // Fetch the Wikipedia page content
    const response = await fetch(wikipediaURL); // This is where we make that HTTP get request. haan..
    const html = await response.text(); // This is where we get the html document from that request body in string format. okay

  // Use cheerio to parse the HTML
    const $ = cheerio.load(html); // Here we use cheerio to parse this html document.

    // Extract the first 100 words (approx.) from the page content
    const text = $('p').text(); //Yes, understood here...ki <p> tag is fetched? yes
    const words = text.split(' ').slice(0, 100).join(' '); // idhar we just get first 100...yes.. aa gya aage kas

    return words;
  } catch (error) {
    // you already know what try catch is for yes
    console.error(`Error fetching data for ${personName}: ${error.message}`);
    return null;
  }
}

// Read the list of famous people's names from a file
const fileName = 'people.txt'; // Replace with your file name
const famousPeopleNames = fs.readFileSync(fileName, 'utf-8').split('\n').map(name => name.trim());

// Fetch information for each famous person
//yeh same function pehle code mein likha tha so ik. okay, good.
// tell me what is npm?
//npm use hota hai for woh softwares ke liye ig ya library jaise python mein...ab idk how to explain but use krna aata hai. npm = node package manager. mmhm
// it is used to install and remove dependecies ok
async function fetchFamousPeopleInfo() {
  for (const name of famousPeopleNames) {
    const result = await fetchPersonInfo(name);

    if (result) {
      console.log(`Famous Person: ${name}`);
      console.log(`First 100 Words: ${result}\n`);
    } else {
      console.log(`Failed to fetch data for ${name}\n`);
    }
  }
}

// Start fetching
fetchFamousPeopleInfo();

//this one is chatgpt one 
//Kitthe gye??? yahi hu. it works. but you dont understand what happened, and all this code also? do you? not dhang se but mostly yes. so lets go line by line from top to bottom, and see whi.ch. lines you have problem. okay?hn