const auth = Cypress.env("auth");

export const getAllCarts = () => {
    return cy.request({
        method: 'GET',
        url: `/carrinhos`
    }).then(response => {
        cy.wrap(response);
    })
}

export const getCartByID = (id) => {
    return cy.request({
        method: 'GET',
        url: `/carrinhos/${id}`
    }).then(response => {
        cy.wrap(response);
    })
}

export const finishPurchase = () => {
        return cy.request({
        method: 'DELETE',
    url: `/carrinhos/concluir-compra`,
    headers: {
        Authorization: Cypress.env("token")
    }
    }).then(response => {
        cy.wrap(response);
    })
}

export const cancelPurchase = () => {
        return cy.request({
    method: 'DELETE',
    url: `/carrinhos/cancelar-compra`,
    headers: {
        Authorization: Cypress.env("token")
    }
    }).then(response => {
        cy.wrap(response);
    })
}

export const createCart = (payload, options = {}) => {
        return cy.request({
    method: 'POST',
    url: `/carrinhos`,
    body: payload,
    headers: {
        Authorization: Cypress.env("token")
    },
    ...options
    }).then(response => {
        cy.wrap(response);
    })
}