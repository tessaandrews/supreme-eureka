use employees_db;

INSERT INTO department (name)
VALUES ("Web Development"),
       ("Data Science"),
       ("Human Resources");
    

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 100000.00, 1),
       ("Software Engineer Lead", 120000.00, 2),
       ("Web Developer", 150000.00, 1),
       ("Quality Control", 300000.00, 2),
       ("Machine Learning",120000.00, 2),
       ("Human Resources", 200000.00, 3 ),
       ("HR Lead", 110000.00, 3);
       
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jim", "Brown", 2 , NULL),
        ("Jack", "Smith", 1, 1),
        ("Sally", "Anderson", 3, 1),
        ("Sam", "Johnson", 4, 3),
        ("Jessie", "Jackson", 5 , 4),
        ("Jennifer", "Jones", 6, 2),
        ("Kam", "Sonny", 7, 6);