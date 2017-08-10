var testUser = {
        username: 'testuser',
        password: 'testuserpasswd'
    };

Feature('User login');

Scenario('test unsuccessful login process', (I) => {
    I.amOnPage('/');
    I.seeElement('#sign-in');
    I.click('#sign-in');
    I.seeInCurrentUrl('/login');
    I.seeElement('#login');
    I.fillField('input[name="username"]', testUser.username);
    I.fillField('input[name="password"]', testUser.password);
    I.click('#login');
    I.seeInCurrentUrl('/login');
});
