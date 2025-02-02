// Necessary Imports, DO NOT REMOVE
const { LinkedList } = require("./LinkedList");
const { Student } = require('./Student')
const readline = require('readline');

// Initialize terminal interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Creates the Student Management System as a Linked List
/**
 * studentManagementSystem is the object that the main() function will be modifying
 */
const studentManagementSystem = new LinkedList();

// Display available commands
function main() {
  console.log(`
      Available Commands:
      - add [name] [year] [email] [specialization]: Add a student
      - remove [email]: Remove a student by email
      - display: Show all students
      - find [email]: Find a student by email
      - save: Save the current linked list to the specified file
      - load [fileName]: Load a linked list from a file
      - clear: Clear the current linked list
      - q: Quit the terminal
  `);
}

// Command handling logic
async function handleCommand(command) {
  const [operation, ...args] = command.trim().split(' ');

  switch (operation) {
    case 'add':
      /**
       * TODO:
       *  Finds a particular student by email, and returns their information
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (code is given)
       *   - Use implemented functions in LinkedList to add the Student, and display the updated LinkedList
       */
        console.log('Adding student...')
        const [name, year, email, specialization] = args
        // --------> WRITE YOUR CODE BELOW
     
      if (!name || !year || !email || !specialization) {
        console.log('Error: All fields (name, year, email, specialization) are required');
        break;
      }
      //creating and adding new student
      const newStudent = new Student(name, parseInt(year), email, specialization);
      console.log('Created new student:', newStudent.getString());
    
      studentManagementSystem.addStudent(newStudent);
      console.log('Student added to system');

      //Dispalying updated list
      console.log('Current students:');
      console.log(studentManagementSystem.displayStudents());        

        // --------> WRITE YOUR CODE ABOVE
        break;

    case 'remove':
      /**
       * TODO:
       *  Removes a particular student by email
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (removeEmail)
       *   - Use implemented functions in LinkedList to remove the Student, and display the updated LinkedList
       */
      console.log('Removing student...')
      // --------> WRITE YOUR CODE BELOW
      //removes stundent by email
      const removeEmail = args[0];
    
      // Debug logs
      console.log('Attempting to remove student with email:', removeEmail);
      //check for email
      if (!removeEmail) {
        console.log('Error: Email is required');
        break;
      }
      //removing student
      let studentToRemove = studentManagementSystem.findStudent(removeEmail);
      if (studentToRemove === -1) {
        console.log('Student not found');
      } else {
        studentManagementSystem.removeStudent(removeEmail);
        console.log('Student removed successfully');
        console.log('Updated list:', studentManagementSystem.displayStudents());
      }
      
      
      // --------> WRITE YOUR CODE ABOVE
      break;

    case 'display':
      /**
       * TODO:
       *  Displays the students in the Linked List
       *  You will need to do the following:
       *   - Use implemneted functions in LinkedList to display the student
       */
      console.log('Displaying students...')
      // --------> WRITE YOUR CODE BELOW
      const students = studentManagementSystem.displayStudents();
      if (!students || students === "") {
        console.log("No students in the system");
      } else {
        console.log("Current students:", students);
      }

      

      // --------> WRITE YOUR CODE ABOVE
      break;

    case 'find':
      /**
       * TODO:
       *  Finds a particular student by email, and returns their information
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (findEmail)
       *   - Use implemented functions in LinkedList to grab the Student
       *   - Use implemented functions in Student to display if found, otherwise, state "Student does not exist"
       */
      console.log('Finding student...')
      // --------> WRITE YOUR CODE BELOW
      const findEmail = args[0];
    
      if (!findEmail) {
        console.log('Error: Email is required');
        break;
      }

      const foundStudent = studentManagementSystem.findStudent(findEmail);
      if (foundStudent === -1) {
        console.log("Student does not exist");
      } else {
        console.log(foundStudent.getString());
      }
      
      // --------> WRITE YOUR CODE ABOVE
      break;

    case 'save':
      /**
       * TODO:
       *  Saves the current LinkedList to a specified JSON file
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (savefileName)
       *   - Use implemented functions in LinkedList to save the data
       */
      console.log('Saving data...')
      // --------> WRITE YOUR CODE BELOW
      try{
        await studentManagementSystem.saveToJson('data.json');
        console.log('Data saved to data.json');
      } catch (error){
        console.log('Error saving data:', error.message);
      }
      // --------> WRITE YOUR CODE ABOVE
      break;
    case "load":
      /**
       * TODO:
       *  Loads data from specified JSON file into current Linked List
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (loadFileName)
       *   - Use implemented functions in LinkedList to save the data, and display the updated LinkedList
       */
      console.log('Loading data...')
      // --------> WRITE YOUR CODE BELOW
      try{
        await studentManagementSystem.loadFromJSON('data.json');
        console.log('Data loaded from data.json');
        console.log(studentManagementSystem.displayStudents());
      } catch (error){
        console.log('Error loading data:', error.message);
      }

      // --------> WRITE YOUR CODE ABOVE
      break;

    case 'clear':
      /**
       * TODO:
       *  Clears all data in the Linked List
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Use implemented functions in LinkedList to clear the data
       */
      console.log('Clearing data...')
      // --------> WRITE YOUR CODE BELOW
      studentManagementSystem.clearStudents();
      console.log('Data cleared');

      // --------> WRITE YOUR CODE ABOVE
      break;

    case 'q':
        console.log('Exiting...');
        rl.close();
        break;

    default:
        console.log('Unknown command. Type "help" for a list of commands.');
        break;
  }
}

// Start terminal-based interaction (DO NOT MODIFY)
console.log('Welcome to the Student Management System!');
main();
rl.on('line', async (input) => {
  if (input.trim().toLowerCase() === 'help') {
    main();
  } else {
      await handleCommand(input);
  }
});
rl.on('close', () => {
  console.log('Goodbye!');
});
