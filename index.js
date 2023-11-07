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
    if (answer.name === "View all departments") {
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
    else if (answer.name === "Add an employee") {
      addEmployee ()
    }
    else if (answer.name === "Update an employee") {
      updateEmployee ()
    }
})}
  

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

function viewEmployees () {
  db.query("select * from employee", (err, res) => {
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
  },

  function addEmployee () {
    db.query("select * from employee", (err, res) => {
      inquirer.prompt ([
        {
          type: "input",
          name: "new_first_name",
          message: "What is the first name of the new employee?",
        },
        {
          type: "input",
          name: "new_last_name",
          message: "What is the last name of the new employee?",
        },
        {
          type: "list",
          name: "role_id",
          message: "What department does this role belong to?",
          // returns only names ie {name: "managements"}
          choices: res.map(employee => employee.name),
        },
    ]).then (data => {
      /// returns original department object ie (id: 1, name: "management")
      let selectedEmployee =  res.find(employee => employee.name === data.employee_name )
      db.query("insert into employee set ?", {
        first_name: data.new_first_name,
        last_name: data.new_last_name,
        role_id: selectedEmployee.id,
      })
      startPrompts()
    })
  },

  function updateEmployee () {
    db.query("select * from employee", (err, res) => {
      inquirer.prompt ([
        {
          type: "input",
          name: "new_first_name",
          message: "What is the first name of the new employee you would like to update?",
        },
        {
          type: "input",
          name: "new_last_name",
          message: "What is the last name of the new employee you would like to update?",
        },
        {
          type: "list",
          name: "role_id",
          message: "What department does this role belong to?",
          // returns only names ie {name: "managements"}
          choices: res.map(employee => employee.name),
        },
    ]).then (data => {
      /// returns original department object ie (id: 1, name: "management")
      let selectedEmployee =  res.find(employee => employee.name === data.employee_name )
      db.query("insert into employee set ?", {
        first_name: data.new_first_name,
        last_name: data.new_last_name,
        role_id: selectedEmployee.id,
      })
      startPrompts()
    })
  },
)})
})
}
  
  
      
  

  




startPrompts ()

//update= query employee table, select them, query role table, get role you would like to assign employee, insert into employee table