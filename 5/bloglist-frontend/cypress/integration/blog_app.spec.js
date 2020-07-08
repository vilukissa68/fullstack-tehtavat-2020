describe('Blog app', function() {
  const user = {
        name: 'Tester McTester',
        username: 'tester',
        password: 'superSecretPassword'
      }
  describe('login', function() {
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

  describe.only('while logged in', function() {
    const blog = {
      title: "test blog",
      author: "Developer",
      url: "www.testblogs.abc"
    }
 
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      cy.request('POST', 'http://localhost:3001/api/users/', user)
      cy.visit('http://localhost:3000')
      cy.get('#username-field').type(user.username)
      cy.get('#password-field').type(user.password)
      cy.get('#login-button').click()
      cy.contains('logged')
    })

    it('user that has logged in can add blogs', function() {
      cy.contains('new blog').click()
      cy.get('#title').type(blog.title)
      cy.get('#author').type(blog.author)
      cy.get('#url').type(blog.url)
      cy.get('#submitBlogButton').click()

      cy.contains('view').click()
      cy.contains(blog.title)
      cy.contains(blog.author)
      cy.contains(`url: ${blog.url}`)
      cy.contains('likes: 0')
      cy.contains(`name: ${user.name}`)
    })

    it('blog can be liked', function() {
      // Add blog
      cy.contains('new blog').click()
      cy.get('#title').type(blog.title)
      cy.get('#author').type(blog.author)
      cy.get('#url').type(blog.url)
      cy.get('#submitBlogButton').click()
      cy.contains('view').click()

      // Likes start at one
      cy.contains('likes: 0')

      cy.contains('like').click()
      cy.contains('likes: 1')
    })

    it('blog can be deleted', function() {
      // Add blog
      cy.contains('new blog').click()
      cy.get('#title').type(blog.title)
      cy.get('#author').type(blog.author)
      cy.get('#url').type(blog.url)
      cy.get('#submitBlogButton').click()
      cy.contains('view').click()

      // Click delete
      cy.contains('delete').click()

      // Check blog is deleted
      cy.get('html').should('not.contain', `${blog.title}`)

    })
  })
})