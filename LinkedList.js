// Necessary Imports (you will need to use this)
const { Student } = require('./Student')

/**
 * Node Class (GIVEN, you will need to use this)
 */
class Node {
  // Public Fields
  data               // Student
  next               // Object
  /**
   * REQUIRES:  The fields specified above
   * EFFECTS:   Creates a new Node instance
   * RETURNS:   None
   */
  constructor(data, next = null) {
    this.data = data;
    this.next = next
  }
}

/**
 * Create LinkedList Class (for student management)
 * The class should have the public fields:
 * - head, tail, length
 */
class LinkedList {
  // Public Fields
  head              // Object
  tail              // Object
  length            // Number representing size of LinkedList

  /**
   * REQUIRES:  None
   * EFFECTS:   Creates a new LinkedList instance (empty)
   * RETURNS:   None
   */
  constructor() {
    this.head = null;
    this.length = 0;
    this.tail = null; 
    // TODO
  }

  /**
   * REQUIRES:  A new student (Student)
   * EFFECTS:   Adds a Student to the end of the LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about adding to the 'end' of the LinkedList (Hint: tail)
   */
  addStudent(newStudent) {
    // conversion to student instance
    let dataStudent;
    if (newStudent instanceof Student) {
      dataStudent = newStudent; // If already a Student instance, use it
  } else {
      dataStudent = new Student(
        newStudent.name,
        newStudent.year,
        newStudent.email,
        newStudent.specialization
      );
  }

  //create new node with student data
  let node = new Node(dataStudent);
  //empty handeling
  if (!this.head) {
      this.head = node;
      this.tail = node;
  } 
  //update tail
  else {
      this.tail.next = node;
      this.tail = node; 
  }
  this.length++;
    // TODO
  }

  /**
   * REQUIRES:  email(String)
   * EFFECTS:   Removes a student by email (assume unique)
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about how removal might update head or tail
   */
  removeStudent(email) {
    //empty handeling
    if (!this.head){
      console.log("Error: No students to remove.");
      return;
    }

    // If head node holds the email
    if (this.head.data.getEmail() === email) {
        console.log(`Removing student: ${this.head.data.getString()}`);
        this.head = this.head.next;
        this.length--;
        return;
    }

    // Search for the email to be deleted
    let current = this.head;
    let prev = null;
    while (current && current.data.getEmail() !== email) {
      prev = current;
      current = current.next;
    }
    //if student not found
    if (!current) { 
      console.log("Error: Student not found.");
      return;
    }

    console.log(`Removing student: ${current.data.getString()}`);
    prev.next = current.next; 
    this.length--;
    //warning if list empty
    if (this.length === 0) {
     console.warn("Warning: No students left after removal!");
    }
  
    // TODO
}

  /**
   * REQUIRES:  email (String)
   * EFFECTS:   None
   * RETURNS:   The Student or -1 if not found
   */
  findStudent(email) {

    if(!this.head){
      return -1;
    }
    //search student
    let current = this.head;

    while(current){
      if(current.data.getEmail() === email){
        return current.data;
      }
      current = current.next;
    }

    // TODO
    return -1
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   Clears all students from the Linked List
   * RETURNS:   None
   */
  clearStudents() {
    this.head = null;
    this.tail = null;
    this.length = 0;
    // TODO
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   LinkedList as a String for console.log in caller
   * CONSIDERATIONS:
   *  - Let's assume you have a LinkedList with two people
   *  - Output should appear as: "JohnDoe, JaneDoe"
   */
  displayStudents() {
    if(!this.head){     //if empty list
      return "no students in the system.";
    }
    let sortedStudents = this.#sortStudentsByName();

    return sortedStudents.map(student => student.getName()).join(", ");


    // TODO
    //return output.join(", ");     //join names with comma

  }
  

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   A sorted array of students by name
   */
  #sortStudentsByName() {
    let studentsArray = [];
    let current = this.head;

    if(!this.head){     //if empty list
      return [];
    }
    
    while(current){     //goes through the list of sudent names
      studentsArray.push(current.data);
      current = current.next;
    }

    studentsArray.sort((a, b) => a.getName().localeCompare(b.getName())); // Cleaner

    //studentsArray.sort((a, b) =>  {return a.getName().localeCompare(b.getName())});
    // TODO
    return studentsArray;
  }

  /**
   * REQUIRES:  specialization (String)
   * EFFECTS:   None
   * RETURNS:   An array of students matching the specialization, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterBySpecialization(specialization) {
    let sortedStudents = this.#sortStudentsByName();

    return sortedStudents.filter(student => student.getSpecialization() === specialization)

    // TODO
    //return [];
  }

  /**
   * REQUIRES:  minAge (Number)
   * EFFECTS:   None
   * RETURNS:   An array of students who are at least minAge, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterByMinYear(minYear) {
    let sortedStudents = this.#sortStudentsByName();

    return sortedStudents
      .filter(student => student.getYear() >= minYear)
      .map(student => student.getString())
      .join("\n");

    // TODO
    //return [];
  }

  /**
   * REQUIRES:  A valid file name (String)
   * EFFECTS:   Writes the LinkedList to a JSON file with the specified file name
   * RETURNS:   None
   */
  async saveToJson(fileName) {
    const fs = require('fs').promises;
    let studentsArray = [];
    let current = this.head;

    while(current){
      studentsArray.push({
        name: current.data.getName(),
        year: current.data.getYear(),
        email: current.data.getEmail(),
        specialization: current.data.getSpecialization()
      });
      current = current.next;
    }
    if (studentsArray.length === 0) {
      console.warn("Warning: No students to save!");
      return; // Prevent overwriting with empty data
    }

    try {
      const jsonContent = JSON.stringify(studentsArray, null, 2);
      await fs.writeFile(fileName, jsonContent, 'utf8');
      console.log("Data successfully saved!");
    } catch (error) {
      console.error("Error saving to JSON file:", error);
      throw error;
  

      
    }
    // TODO
  }
  

  /**
   * REQUIRES:  A valid file name (String) that exists
   * EFFECTS:   Loads data from the specified fileName, overwrites existing LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   *  - Use clearStudents() to perform overwriting
   */
  async loadFromJSON(fileName) {
    const fs = require('fs').promises;

    try {
        const fileContent = await fs.readFile(fileName, 'utf-8');
        
        if (!fileContent.trim()) {  // Check for empty file
            console.error("Error: JSON file is empty.");
            return;
        }

        const studentsArray = JSON.parse(fileContent);
        if (!Array.isArray(studentsArray)) {
            console.error("Error: JSON data is not an array!");
            return;
        }

        this.clearStudents();

        studentsArray.forEach(studentData => {
            const student = new Student(
                studentData.name,
                studentData.year,
                studentData.email,
                studentData.specialization
            );
            this.addStudent(student);
        });

        console.log("Data successfully loaded!");
    } catch (error) {
        console.error("Error loading from JSON file:", error);
        throw error;
    }
  }

}
//console.log(displayStudents());
//list.filterBySpecialization("computerScience");
module.exports = { LinkedList }
