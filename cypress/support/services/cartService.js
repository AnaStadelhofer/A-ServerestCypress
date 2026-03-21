const auth = Cypress.env("auth");

export const getAllCarts = () => {
    return cy.request({
        method: 'GET',
        url: `/carrinhos`
    }).then(response => {
        cy.wrap(response);
    })
}

export const getProductByID = (id) => {
    return cy.request({
        method: 'GET',
        url: `/carrinhos/${id}`
    }).then(response => {
        cy.wrap(response);
    })
}

export const deleteProduct = (id) => {
        return cy.request({
        method: 'DELETE',
        url: `/carrinhos/${id}`
    }).then(response => {
        cy.wrap(response);
    })
}

export const createProduct = (payload) => {
        return cy.request({
        method: 'POST',
        url: `/carrinhos`,
        body: payload
    }).then(response => {
        cy.wrap(response);
    })
}

export const updateProduct = (payload, id) => {
        return cy.request({
        method: 'PUT',
        url: `/carrinhos`,
        body: payload
    }).then(response => {
        cy.wrap(response);
    })
}