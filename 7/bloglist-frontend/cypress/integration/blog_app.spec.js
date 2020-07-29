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

  describe('while logged in', function() {
    const blog = {
      title: "test blog",
      author: "Developer",
      url: "www.testblogs.abc"
    }
 
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      cy.request('POST', 'http://localhost:3001/api/users/', user)
      cy.login({ username: 'tester', password: 'superSecretPassword' })  
    })

    it('user that has logged in can add blogs', function() {
      cy.contains('add a blog').click()
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
      cy.contains('add a blog').click()
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
      cy.contains('add a blog').click()
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

    it('blogs are sorted by likes', function() {
      // The order of the blogs should be 3, 1, 2
      const blogs = [
        { title: 'Blog 1', author: 'author1', url:"www.1.com", likes: '3' },
        { title: 'Blog 2', author: 'author2', url:"www.2.com", likes: '0' },
        { title: 'Blog 3', author: 'author3', url:"www.3.com", likes: '10' },
      ]
      blogs.forEach(blog => {
        cy.createBlog({title: blog.title, 
          author:blog.author, 
          url: blog.url,
          likes: blog.likes})
      })

      cy.get('.blog').then(blogs => {
        console.log('number of blogs:', blogs.length)
        cy.wrap(blogs[0]).should('contain', 'Blog 3')
        cy.wrap(blogs[1]).should('contain', 'Blog 1')
        cy.wrap(blogs[2]).should('contain', 'Blog 2')
      })
    })
  })
})