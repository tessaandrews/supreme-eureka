const db = require("./server");
const inquirer = require('inquirer');


function startPrompts() {
inquirer
  .prompt([
    {
      type: 'list',
      name: 'name',
      message: 'What would you like to do?',
      choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
    },
  ]) .then (answer => {
    if (answer.name === "View all departments"){
      viewDepartments ()
    }
    else if (answer.name === "View all roles") {
      viewRoles ()
    }
    else if (answer.name === "View all employees") {
      viewEmployees ()
    }
    else if (answer.name === "Add a department") {
      addDepartment ()
    } 
    else if (answer.name === "Add a role") {
      addRole ()
    }
    else if (answer.name === "View an employee") {
      viewEmployee ()
    }
    else if (answer.name === "Update an employee role") {
      updateEmployee ()
    }
  })
  //THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
}

function viewDepartments () {
  db.query("select * from department", (err, res) => {
    if (err) throw err 
    console.table(res)
    startPrompts()
  })
}

function viewRoles () {
  db.query("select * from role", (err, res) => {
    if (err) throw err 
    console.table(res)
    startPrompts()
  })
}

function addDepartment () {
  inquirer.prompt ([
    {
      type: "input",
      name: "new_department",
      message: "What is the name of the new department you would like to add?",
    }
  ]).then (data => {
    db.query("insert into department set ?", {
      name: data.new_department
    })
    startPrompts()
  })
}

function addRole () {
  db.query("select * from department", (err, res) => {
    inquirer.prompt ([
      {
        type: "input",
        name: "new_title",
        message: "What is the title of the new role?",
      },
      {
        type: "input",
        name: "new_salary",
        message: "What would you like the new salary to be?",
      },
      {
        type: "list",
        name: "department_name",
        message: "What department does this role belong to?",
        // returns only names ie {name: "managements"}
        choices: res.map(department => department.name),
      },
    ]).then (data => {
      /// returns original department object ie (id: 1, name: "management")
      let selectedDepartment =  res.find(department => department.name === data.department_name )
      db.query("insert into role set ?", {
        title: data.new_title,
        salary: data.new_salary,
        department_id: selectedDepartment.id,
      })
      startPrompts()
    })




  })
}


startPrompts ()

//update= query employee table, select them, query role table, get role you would like to assign employee, insert into employee table