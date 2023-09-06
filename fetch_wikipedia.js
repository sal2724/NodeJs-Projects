const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');

// Function to fetch 100 words about a famous person from Wikipedia
async function fetchPersonInfo(personName) {
  try {
    // Construct the Wikipedia URL for the person's page
    const wikipediaURL = `https://en.wikipedia.org/wiki/${encodeURIComponent(personName)}`;

    // Fetch the Wikipedia page content
    const response = await fetch(wikipediaURL);
    const html = await response.text();

    // Use cheerio to parse the HTML
    const $ = cheerio.load(html);

    // Extract the first 100 words (approx.) from the page content
    const text = $('p').text();
    const words = text.split(' ').slice(0, 100).join(' ');

    return words;
  } catch (error) {
    console.error(`Error fetching data for ${personName}: ${error.message}`);
    return null;
  }
}

// Read the list of famous people's names from a file
const fileName = 'people.txt'; // Replace with your file name
const famousPeopleNames = fs.readFileSync(fileName, 'utf-8').split('\n').map(name => name.trim());

// Fetch information for each famous person
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