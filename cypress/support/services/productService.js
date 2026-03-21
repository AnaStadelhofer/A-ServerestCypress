const auth = Cypress.env("auth");

export const getAllProducts = () => {
    return cy.request({
        method: 'GET',
        url: `/produtos`
    }).then(response => {
        cy.wrap(response);
    })
}

export const getProductByID = (id) => {
    return cy.request({
        method: 'GET',
        url: `/produtos/${id}`
    }).then(response => {
        cy.wrap(response);
    })
}

export const deleteProduct = (id) => {
        return cy.request({
        method: 'DELETE',
        url: `/produtos/${id}`
    }).then(response => {
        cy.wrap(response);
    })
}

export const createProduct = (payload) => {
        return cy.request({
        method: 'POST',
        url: `/produtos/${id}`,
        body: payload
    }).then(response => {
        cy.wrap(response);
    })
}

export const updateProduct = (payload, id) => {
        return cy.request({
        method: 'PUT',
        url: `/produtos`,
        body: payload
    }).then(response => {
        cy.wrap(response);
    })
}