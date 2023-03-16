INSERT INTO departments(name)
VALUES ('Billing'),
	   ('Human Resources'),
       ('Engineering'),
       ('Sales');
       
INSERT INTO roles(title,salary,departments_id)
VALUES ('Front End Developer', 90000.00, 3),
	   ('Back End Developer', 100000.00,3),
       ('Senior Developer', 120000.00, 3),
       ('Accounting', 120000.00, 1),
       ('Front Desk', 60000.00, 4),
       ('HR Manager', 80000.00, 2);
       
       
INSERT INTO employees(first_name,last_name,roles_id,manger_id)
VALUES ('Michael', 'Mount', 2, 2),
	   ('Jo', 'Watts', 3, null),
       ('Jacob', 'Paulson', 1, 2),
       ('Sage', 'Garrett',4, null),
       ('Maddie', 'McClure', 5, 2),
       ('Ashley', 'Luelyn',6, null);