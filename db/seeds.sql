INSERT INTO departments(name)
VALUES ('Accounting'),
	('Human Resources'),
       ('Engineering'),
       ('Sales');
       
INSERT INTO role (title,salary,department_id)
VALUES ('Front End Developer', 90000.00, 3),
	   ('Back End Developer', 100000.00,3),
       ('Senior Developer', 120000.00, 3),
       ('Accounting', 120000.00, 1),
       ('Front Desk', 60000.00, 4),
       ('HR Manager', 80000.00, 2);
       
       
INSERT INTO employee(first_name,last_name,role_id,manger_id)
VALUES ('Michael', 'Mount', 2, 2),
	   ('Jo', 'Watts', 3, null),
       ('Jacob', 'Paulson', 1, 2),
       ('Sage', 'Garrett',4, null),
       ('Maddie', 'McClure', 5, 2),
       ('Ashley', 'LuElen',6, null);