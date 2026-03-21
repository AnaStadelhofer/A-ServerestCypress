const auth = Cypress.env("auth");

export const getToken = () => {
    return cy.request({
        method: 'POST',
        url: `/login`,
        log: false,
        body: {
            email: auth.email,
            password: auth.password
        }
    }).then(response => {
        Cypress.env("token", response.body.authorization);
        expect(res.status).to.eq(200)
    })
}

export const getNewUserToken = () => {
    return cy.request({
        method: 'POST',
        url: `/login`,
        log: false,
        body: {
            email: Cypress.env("email"),
            password: Cypress.env("password")
        }
    }).then(response => {
        Cypress.env("token", response.body.authorization);
        expect(res.status).to.eq(200)
    })
}