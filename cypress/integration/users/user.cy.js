import {
    getAllUsers,
    getUserByID,
    createUser,
    deleteUser,
    updateUser
} from "../../support/services/userService";

import { getNewUserToken } from "../../support/services/authService";

describe("Users API", () => {

    beforeEach(() => {
        cy.GeneratePayloadUser().then(user => {
            createUser(user).then(response => {
                expect(response.status).to.eq(201);
                Cypress.env("userId", response.body._id);
            });
        });
    })

    it("should create a user successfully", () => {
        cy.GeneratePayloadUser().then(user => {
            createUser(user).then(response => {
                expect(response.status).to.eq(201);
                expect(response.body.message).to.eq("Cadastro realizado com sucesso");
                expect(response.body._id).to.be.a("string");
            });
        });
    })

    it("should get all the users successfully", () => {
        getAllUsers().then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("usuarios").and.to.be.an("array");
            expect(response.body.quantidade).to.be.greaterThan(0);
        });
    })

    it("should get user by ID successfully", () => {
        getUserByID(Cypress.env("userId")).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body._id).to.eq(Cypress.env("userId"));
            expect(response.body.email).to.eq(Cypress.env("email"));
        });
    })

    it("Should delete a user successfully", () => {
        deleteUser(Cypress.env("userId")).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.eq("Registro excluído com sucesso");
        });
    })

    it("Should update a user successfully", () => {
        const updatedUser = {
            nome: "Usuário atualizado",
            email: Cypress.env("email"),
            password: Cypress.env("password"),
            administrador: "false"
        };

        updateUser(updatedUser, Cypress.env("userId")).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.eq("Registro alterado com sucesso");

            getUserByID(Cypress.env("userId")).then(updatedResponse => {
                expect(updatedResponse.body.nome).to.eq(updatedUser.nome);
                expect(updatedResponse.body.administrador).to.eq(updatedUser.administrador);
            });
        });
    })

    it("don't should create user with empty password", () => {
        cy.GeneratePayloadUser().then(user => {
            createUser({ ...user, password: "" }, { failOnStatusCode: false }).then(response => {
                expect(response.status).to.eq(400);
                expect(response.body.password).to.eq("password não pode ficar em branco");
            });
        });
    })

    it("don't should create user with empty email", () => {
        cy.GeneratePayloadUser().then(user => {
            createUser({ ...user, email: "" }, { failOnStatusCode: false }).then(response => {
                expect(response.status).to.eq(400);
                expect(response.body.email).to.eq("email não pode ficar em branco");
            });
        });
    })

})