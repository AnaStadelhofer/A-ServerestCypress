const auth = Cypress.env("auth");

export const getAllUsers = () => {
    return cy.request({
        method: 'GET',
        url: `/usuarios`
    }).then(response => {
        cy.wrap(response);
    })
}

export const getUserByID = (id) => {
    return cy.request({
        method: 'GET',
        url: `/usuarios/${id}`
    }).then(response => {
        cy.wrap(response);
    })
}

export const deleteUser = (id) => {
        return cy.request({
        method: 'DELETE',
        url: `/usuarios/${id}`
    }).then(response => {
        cy.wrap(response);
    })
}

export const createUser = (payload, options = {}) => {
        return cy.request({
        method: 'POST',
        url: `/usuarios`,
    body: payload,
    ...options
    }).then(response => {
        cy.wrap(response);
    })
}

export const updateUser = (payload, id) => {
        return cy.request({
        method: 'PUT',
    url: `/usuarios/${id}`,
        body: payload
    }).then(response => {
        cy.wrap(response);
    })
}