const readline = require('readline');
const fs = require('fs').promises;

// Create a readline interface to read user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to get user input and save it to a file
async function getUserInput() {
  try {
    while (true) {
      const input = await new Promise((resolve) => {
        rl.question('Enter your input (or type "stop" to quit): ', resolve);
      });

      if (input.toLowerCase() === 'stop') {
        rl.close(); // Close the readline interface
        console.log('Exiting...');
        break;
      } else {
        // Append the input to a file with a newline
        await fs.appendFile('new.txt', input + '\n');
        console.log('Input saved to new.txt');
      }
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

// Start getting user input
getUserInput();
