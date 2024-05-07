/// <reference types="cypress" />


import { getRandomUser } from "../generators/userGenerator"

let token;
let user;


describe('example to-do app', () => {
   beforeEach(() => {
       // tworzymy usera
       user = getRandomUser()
       cy.request({
           method: 'POST',
           url: 'http://localhost:4001/users/signup',
           body: user
       })
       // customowa komenda zdefiniowana w commands.js
       cy.login(user.username, user.password)
       // pobieramy token z ciasteczka
       cy.getCookie('token').then((cookie) => {
        token = cookie.value
       })
   })

   afterEach(() => {
    cy.request({
        method: 'DELETE',
        url: `http://localhost:4001/users/${user.username}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
   })


   it('display at least one user', () => {
       cy.get('ul li').should('have.length.at.least', 1)
   })


   it('should logout', () => {
       cy.get('#logout').click()
       cy.get('h2').should('have.text', 'Login')
       cy.url().should('contain', '/login')
   })


   it('should open add more user page', () => {
       cy.get('#addmore').click()
       cy.get('h2').should('have.text', 'Register')
       cy.url().should('contain', 'add-user')
   })


})
