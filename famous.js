// const fs = require('fs');

// fs.readFile('/people.txt', 'utf8', (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(data);
// });

// async function getdata()
// {
//     const todos= await fetch ("https://www.wikipedia.org/") 
//     console.log(await todos.json())
// }

// getdata()

import fetch from 'node-fetch';


const fs = require('fs');
// const fetch = require('node-fetch');

const fileName = 'people.txt';
const famousPeopleNames = fs.readFileSync(fileName, 'utf-8').split('\n').map(name => name.trim());

// Wikipedia API endpoint
const wikipediaAPI = 'https://en.wikipedia.org/w/api.php';

// Function to fetch 100 words 
async function fetchPersonInfo(personName) {
  try {
    const response = await fetch(wikipediaAPI, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      qs: {
        action: 'query',
        format: 'json',
        prop: 'extracts',
        exintro: true,
        explaintext: true,
        titles: personName,
      },
    });

    const data = await response.json();
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    const extract = pages[pageId].extract;

    // Extract the first 100 words
    const first100Words = extract.split(' ').slice(0, 100).join(' ');

    return first100Words;
  } catch (error) {
    console.error(`Error fetching data for ${personName}: ${error.message}`);
    return null;
  }
}

// Fetch information for each famous person
async function fetchFamousPeopleInfo() {
  const infoPromises = famousPeopleNames.map(name => fetchPersonInfo(name));
  const results = await Promise.all(infoPromises);

  // Display the results
  results.forEach((result, index) => {
    if (result) {
      console.log(`Famous Person: ${famousPeopleNames[index]}`);
      console.log(`First 100 Words: ${result}\n`);
    } else {
      console.log(`Failed to fetch data for ${famousPeopleNames[index]}\n`);
    }
  });
}

// Start fetching
fetchFamousPeopleInfo();

//This is not

// I told you about two types of importing remember?No. 
// So ab dekho, there are two types. 
// 1- ESM (ES Modules / New) - which looks like - (import fetch from "node-fetch")
// 2- CJS (Common JS / Old) - which looks like - (const fetch = require("node-fetch"))
// Understood? yessss. another thing is. you should always create a new package before you start coding a new project.ok.
// Mai krke dikhata hu, theeke