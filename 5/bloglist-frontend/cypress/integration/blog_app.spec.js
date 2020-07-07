describe('Blog app', function() {
  const user = {
      name: 'Tester McTester',
      username: 'tester',
      password: 'superSecretPassword'
    }
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened',  function() {
    cy.contains('login')
    cy.contains('username')
    cy.contains('password')
  })

  it('existing user can login', function() {
    cy.contains('login').click()
    cy.get('#username-field').type(user.username)
    cy.get('#password-field').type(user.password)
    cy.get('#login-button').click()
    cy.contains('logged')
  })
  it('non existing user cannot login', function() {
    cy.contains('login').click()
    cy.get('#username-field').type('notARealUserName')
    cy.get('#password-field').type('notARealPassword')
    cy.get('#login-button').click()
    cy.contains('wrong username or password')

  })
})