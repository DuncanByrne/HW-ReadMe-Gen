// ELEMENTS

let inquirer = require('inquirer');
let fs = require('fs');
// DATA
// this gives the user a prompt along with a set of questions to answer
inquirer
    .prompt([
        {
            type: "input",
            message: "What is the title of your project?",
            name: "title"
        },
        {
            type: "input",
            message: "Please give a description of your project:",
            name: "description"
        },
        {
            type: "input",
            message: "Enter installation insructions:",
            name: "install"
        },
        {
            type: "input",
            message: "Enter usage information for your project:",
            name: "usage"
        },
        {
            type: "input",
            message: "Enter contribution guidelines for your project:",
            name: "contribution"
        },
        {
            type: "input",
            message: "Enter your GitHub Username:",
            name: "github"
        },
        {
            type: "input",
            message: "Enter your email address:",
            name: "email"
        },
        {
            type: "list",
            message: "Which license does this project fall under?",
            name: "license",
            choices: [
                "MIT License",
                "Apache License",
            ]
        }
    ])
    // console log the message to let the user know the file is being created
    .then((res) => {
        console.log("Creating README file");
        createREADMEFile(res);
        
    })
    .catch((err) => {
        console.log(err);
    })
    
    // FUNCTION 
    // this function gives us the list of each section in the README file
function createREADMEFile(input) {
    let readmeTitle;
    let readmeDescription;
    const description = "## Description";
    let tableOfContents;
    const toc = "## Table of Contents";
    let installArr;
    const install = "## Installation";
    let readmeUsage;
    const usage = "## Usage";
    let readmeContribution;
    const contribution = "## Contribution";
    let readmeLicence = input.license;
    const license = "## License";
    let readmeQuestions;
    const questions = "## Questions";
    let completeREADME = [];

    if (input.title == '') {
        readmeTitle = '# TITLE';
    } else {
        readmeTitle = `# ${input.title}`;
    }
    completeREADME.push(readmeTitle);
    
    
      //  this gives us our badge for the license
    let badge = `![](https://img.shields.io/badge/license-${readmeLicence.replace(/ /g, "%20")}-blue?style=flat-square)`;
    completeREADME.push(badge);
    
    
  // README description
    if (input.description == '') {
        readmeDescription = `${description}\n Enter project description here.`;
    } else {
        readmeDescription = `${description}\n${input.description}`;
    }
    completeREADME.push(readmeDescription);
    
    // this is our table of contents
    tableOfContents = `${toc}\n* [Installation](#installation)\n* [Usage](#usage)\n* [Contribution](#contribution) \n* [License](#license)\n* [Questions](#questions)\n`;
    completeREADME.push(tableOfContents);
    
    
   
    completeREADME.push(`${install}`);
    
    installArr = input.install.split(',').map(item => {
        return `${item.trim()}`;
    });
    
    for (var i = 0; i < installArr.length; i++) {
        completeREADME.push(`${i + 1}. ${installArr[i]}`);
    }
    
    
  
    if (input.usage == '') {
        readmeUsage = `\n${usage}\n Enter project usage here.`;
    } else {
        readmeUsage = `\n${usage}\n${input.usage}`;
    }
    completeREADME.push(readmeUsage);
    
  
    if (input.contribution == '') {
        readmeContribution = `\n${contribution}\n Enter project contriburtion information here.`;
    } else {
        readmeContribution = `\n${contribution}\n${input.contribution}`;
    }
    completeREADME.push(readmeContribution);
    
    
   
    readmeLicence = `\n${license}\nThis project is convered under the ${input.license}.`;
    completeREADME.push(readmeLicence);
    
    
  // this generates the line on the README with the GitHub username along with their 
    readmeQuestions = `\n${questions}\nFor questions about this project, please see my GitHub at [${input.github}](https://github.com/${input.github}), or reach out by email at ${input.email}.`;
    completeREADME.push(readmeQuestions);
    
    
    
    const README = completeREADME.join('\n');
        
    
    //Creating the README
    fs.writeFile("./demo/README.md", README, (err) => {
        if (err) {
            throw err;
        } else {
            console.log("Your README file was generated!!");
        }
    });
}