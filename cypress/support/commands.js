
import { faker } from '@faker-js/faker';

let payload = {};

Cypress.Commands.add("GeneratePayloadUser", () => {
    Cypress.env("name", faker.person.firstName());
    Cypress.env("email", faker.internet.email());
    Cypress.env("password", faker.internet.password());

    return payload = {
        "nome": Cypress.env("name"),
        "email": Cypress.env("email"),
        "password": Cypress.env("password"),
        "administrador": "true"
    }
})