const readline = require('readline');
const fs = require('fs');

// Create a readline interface to read user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to get user input and save it to a file
function getUserInput() {
  rl.question('Enter your input (or type "stop" to quit): ', (input) => {
    if (input.toLowerCase() === 'stop') {
      rl.close(); // Close the readline interface and exit the program
      console.log('Exiting.....');
    } else {
      // Append the input to a file with a newline
      fs.appendFile('user_input.txt', input + '\n', (err) => {
        if (err) {
          console.error('Error writing to file:', err);
        } else {
          console.log('Input saved to user_input.txt');
          getUserInput(); // Continue getting input
        }
      });
    }
  });
}

// Start getting user input
getUserInput();
