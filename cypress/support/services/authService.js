const auth = Cypress.env("auth");

export const login = (credentials, options = {}) => {
    return cy.request({
        method: 'POST',
        url: `/login`,
        log: false,
        body: credentials,
        ...options
    });
}

export const getToken = () => {
    return login({
            email: auth.email,
            password: auth.password
        }).then(response => {
        Cypress.env("token", response.body.authorization);
        expect(response.status).to.eq(200);
    })
}

export const getNewUserToken = () => {
    return login({
            email: Cypress.env("email"),
            password: Cypress.env("password")
        }).then(response => {
        Cypress.env("token", response.body.authorization);
        expect(response.status).to.eq(200);
    })
}