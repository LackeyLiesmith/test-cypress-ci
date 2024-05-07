// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (username, password) => { 
        // 1. Request http do BE na logowanie
        cy.request({
            method: 'POST',
            url: 'http://localhost:4001/users/signin',
            body: {
                username: username,
                password: password,
            },
        }).then((resp) => {
            // 2a. ustawiamy odpowiedź z BE w localStorage
            localStorage.setItem('user', JSON.stringify(resp.body))
            // 2b. ustawiamy token z odpowiedzi BE w ciastku token
            cy.setCookie('token', resp.body.token)
        })
        // wchodzimy na FE
        cy.visit('http://localhost:8081')
})

Cypress.Commands.add('register', (user) => { 
        // 1. Request http do BE na logowanie
        cy.request({
            method: 'POST',
            url: 'http://localhost:4001/users/signup',
            body: user
        })
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })