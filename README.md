# Capstone_Backend

Capstone Project - Backend
Project: EventConnect

# Installation

** This will be populated upon release **

For now;

- install MySQL, create a database named 'eventconnect' and run MySQL on port 3306
- ensure node is installed
- in terminal git pull https://github.com/MitchellN89/Capstone_Backend.git
- in terminal, 'npm start'

# Features

    - Use localhost:8080
    - /createuser is a POST request and allows for creating users - see the models folder for details on what is required in the body
    - /loginwithcredentials is a POST request and allows the user to login and receive a authtoken using emailAddress, password and accountType
    - /token allows you to send a request and see the token verification in action. Ensure the req header>Authorization is = `Bearer <TOKEN HERE>`
