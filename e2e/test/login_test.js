const testUser = require('../setup_and_teardown').testUser

Feature('User login')

Scenario('test successful login process', (I) => {
  I.amOnPage('http://localhost:8008/')
  I.seeElement('#sign-in')
  I.click('#sign-in')
  I.seeInCurrentUrl('/login')
  I.seeElement('#login')
  I.fillField('input[name="username"]', testUser.username)
  I.fillField('input[name="password"]', testUser.password)
  I.click('#login')
  I.see('Hello ' + testUser.username + '!')
})

Scenario('test unsuccessful login process', (I) => {
  I.amOnPage('http://localhost:8008/')
  I.seeElement('#sign-in')
  I.click('#sign-in')
  I.seeInCurrentUrl('/login')
  I.seeElement('#login')
  I.fillField('input[name="username"]', 'incorrect user')
  I.fillField('input[name="password"]', 'incorrect passwd')
  I.click('#login')
  I.seeInCurrentUrl('/login')
})
