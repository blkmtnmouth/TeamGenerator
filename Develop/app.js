const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Employee = require("./lib/Employee");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { getDiffieHellman } = require("crypto");
const { log } = require("console");

//Questions to ask
const employeeQuestions =[
    {
        type: "list",
        name: "role", 
        message: "What is your role?",
        choices: ["Manager", "Engineer", "Intern"]
    }, 
    {
        name: "name", 
        message: "What is your name?"
    }, 
    {
        name: "id", 
        message: "What is your ID?"
    }, 
    {
        name: "email",
        message: "What is your email?" 
    }
];

const managerQuestions =[
    {
        name: "officeNumber",
        message: "What is your office number?"
    }
];

const engineerQuestions =[

    {    name: "github", 
         message: "What is your github username?"
    }, 
    {
        type: "confirm",
        name: "end",
        message: "Do you have more employees to add?"
    }
]; 

const internQuestions  =[
    {
        name: "school",
        message: "What school do you attend?"
    },
    {
        type: "confirm",
        name: "end",
        message: "Do you have more employees to add?"
    }
]; 
//Set up employee array
const employees = []; 

//functions to ask questions
async function askEmployee(){

    const employeeAnswers = await inquirer.prompt(employeeQuestions)
    const employee = new Employee(employeeAnswers.name, employeeAnswers.id, employeeAnswers.email);
    
    if(employeeAnswers.role === "Manager"){
        
        const managerAnswers = await inquirer.prompt(managerQuestions)
        const manager = new Manager(employee.name, employee.id, employee.email, managerAnswers.officeNumber);
        employees.push(manager); 
        askEmployee(); 

    } else if (employeeAnswers.role === "Engineer"){
        const engineerAnswers = await inquirer.prompt(engineerQuestions)
        const engineer = new Engineer(employee.name, employee.id, employee.email, engineerAnswers.github);
        employees.push(engineer); 
        if (engineerAnswers.end == false) {
            const html = render(employees);
            fs.writeFile(outputPath, html, function (err){
                if (err) throw err; 
                console.log('Saved!'); 
            });
        } else {
            askEmployee(); 
        }
        
    } else {
        const internAnswers = await inquirer.prompt(internQuestions)
        const intern = new Intern(employee.name, employee.email, employee.id, internAnswers.school);
        employees.push(intern); 
        console.log(internAnswers.end);
        if (internAnswers.end == true) {
            askEmployee(); 
        } else {
            const html = render(employees);
            fs.writeFile(outputPath, html, function (err){
                if (err) throw err; 
                console.log('Saved!'); 
            }); 
        }   

    } 
 }

function init(){
    askEmployee(); 
}

init(); 


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
// ---this is where you will query the user (.prompt) to ask the right questions. Make sure the answers are saved as an object (.then)
// ---Look up how inquirer works to get the right questions being asked and right answer choices offered 


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

//---run htmlRender.js which should put all the data together

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
//  --- Render has created the html text, but you need to make it an actual HTML file called team.html in the ouput folder. 
//  --may also need to add output folder to the path? or create folder



// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

