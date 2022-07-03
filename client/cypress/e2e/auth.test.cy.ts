describe('Specific auth tests', () => {
  it('Switch between auth methods', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('[data-cy="switch"]').contains('Register').click()
    cy.url().should('include', '/register')
    cy.get('[data-cy="switch"]').contains('Login').click()
    cy.url().should('include', '/login')
  })

  it('Clear information on auth method change', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('[data-cy="nickname-input"]').clear().type('1234')
    cy.get('[data-cy="switch"]').contains('Register').click()
    cy.get('[data-cy="nickname-input"]').should('have.value', '')
    cy.get('[data-cy="nickname-input"]').clear().type('1234')
    cy.get('[data-cy="switch"]').contains('Login').click()
    cy.get('[data-cy="nickname-input"]').should('have.value', '')
  })
})

describe('Login test', () => {
  it('Without information in inputs', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('[data-cy="submit"]').contains(`Let's go`).click()
    cy.get('[data-cy="nickname-error"]').contains('is a required field')
    cy.get('[data-cy="password-error"]').contains('is a required field')
  })

  it('With invalid information in inputs', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('[data-cy="submit"]').contains(`Let's go`).click()
    cy.get('[data-cy="nickname-input"]').type('123')
    cy.get('[data-cy="password-input"]').type('123456789123456781234')
    cy.get('[data-cy="nickname-error"]').contains('is too short')
    cy.get('[data-cy="password-error"]').contains('is too long')
    cy.get('[data-cy="nickname-input"]').clear().type('123456789123456781234')
    cy.get('[data-cy="password-input"]').clear().type('123')
    cy.get('[data-cy="nickname-error"]').contains('is too long')
    cy.get('[data-cy="password-error"]').contains('is too short')
  })

  it('Login only valid nickname entered in input', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('[data-cy="nickname-input"]').type('1234')
    cy.get('[data-cy="submit"]').contains(`Let's go`).click()
    cy.get('[data-cy="nickname-error"]').should('not.exist')
    cy.get('[data-cy="password-error"]').contains('is a required field')
  })

  it('Login only valid password entered in input', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('[data-cy="password-input"]').type('1234')
    cy.get('[data-cy="submit"]').contains(`Let's go`).click()
    cy.get('[data-cy="nickname-error"]').contains('is a required field')
    cy.get('[data-cy="password-error"]').should('not.exist')
  })

  it('Login with valid information in the inputs', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('[data-cy="nickname-input"]').type('Guest')
    cy.get('[data-cy="password-input"]').type('1234')
    cy.get('[data-cy="submit"]').contains(`Let's go`).click()
    cy.get('[data-cy="nickname-error"]').should('not.exist')
    cy.get('[data-cy="password-error"]').should('not.exist')
    // should be some additional testing here
  })
})

describe('Register test', () => {
  it('No information in inputs', () => {
    cy.visit('http://localhost:3000/register')
    cy.get('[data-cy="submit"]').contains(`I'm excited!`).click()
    cy.get('[data-cy="nickname-error"]').contains('is a required field')
    cy.get('[data-cy="password-error"]').contains('is a required field')
    cy.get('[data-cy="passwordConfirm-error"]').contains('is a required field')
  })

  it('With invalid information in inputs', () => {
    cy.visit('http://localhost:3000/register')
    cy.get('[data-cy="submit"]').contains(`I'm excited!`).click()
    cy.get('[data-cy="nickname-input"]').type('123')
    cy.get('[data-cy="password-input"]').type('123456789123456781234')
    cy.get('[data-cy="passwordConfirm-input"]').type('another password')
    cy.get('[data-cy="passwordConfirm-error"]').contains('should be the same as password')
    cy.get('[data-cy="nickname-error"]').contains('is too short')
    cy.get('[data-cy="password-error"]').contains('is too long')
    cy.get('[data-cy="nickname-input"]').clear().type('123456789123456781234')
    cy.get('[data-cy="password-input"]').clear().type('123')
    cy.get('[data-cy="nickname-error"]').contains('is too long')
    cy.get('[data-cy="password-error"]').contains('is too short')
  })

  it('Only valid nickname entered in input', () => {
    cy.visit('http://localhost:3000/register')
    cy.get('[data-cy="nickname-input"]').type('1234')
    cy.get('[data-cy="passwordConfirm-input"]').clear()
    cy.get('[data-cy="submit"]').contains(`I'm excited!`).click()
    cy.get('[data-cy="nickname-error"]').should('not.exist')
    cy.get('[data-cy="password-error"]').contains('is a required field')
    cy.get('[data-cy="passwordConfirm-error"]').contains('is a required field')
  })

  it('Only valid password entered in input', () => {
    cy.visit('http://localhost:3000/register')
    cy.get('[data-cy="password-input"]').type('1234')
    cy.get('[data-cy="submit"]').contains(`I'm excited!`).click()
    cy.get('[data-cy="nickname-error"]').contains('is a required field')
    cy.get('[data-cy="password-error"]').should('not.exist')
    cy.get('[data-cy="passwordConfirm-error"]').contains('is a required field')
  })

  it('Confirm password not the same as password', () => {
    cy.visit('http://localhost:3000/register')
    cy.get('[data-cy="password-input"]').type('1234')
    cy.get('[data-cy="passwordConfirm-input"]').type('12345')
    cy.get('[data-cy="submit"]').contains(`I'm excited!`).click()
    cy.get('[data-cy="passwordConfirm-error"]').contains('should be the same as password')
  })

  it('Login with valid information in the inputs', () => {
    cy.visit('http://localhost:3000/register')
    cy.get('[data-cy="nickname-input"]').type('Guest')
    cy.get('[data-cy="password-input"]').type('1234')
    cy.get('[data-cy="passwordConfirm-input"]').type('1234')
    cy.get('[data-cy="submit"]').contains(`I'm excited!`).click()
    // should be some additional testing here
  })
})
