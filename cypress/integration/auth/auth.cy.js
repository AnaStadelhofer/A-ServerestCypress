import { createUser } from "../../support/services/userService";
import { login } from "../../support/services/authService";

const createLoginUser = () => cy.GeneratePayloadUser().then(user => {
    return createUser(user).then(response => {
        expect(response.status).to.eq(201);
        return user;
    });
});

describe("Authentication API", () => {

    it("should login successfully", () => {
        createLoginUser().then(user => {
            login({ email: user.email, password: user.password }).then(response => {
                expect(response.status).to.eq(200);
                expect(response.body.message).to.eq("Login realizado com sucesso");
                expect(response.body.authorization).to.be.a("string");
            });
        });
    })

    it("should reject an invalid email", () => {
        createLoginUser().then(user => {
            login({ email: `invalid-${user.email}`, password: user.password }, { failOnStatusCode: false })
                .then(response => {
                    expect(response.status).to.eq(401);
                    expect(response.body.message).to.eq("Email e/ou senha inválidos");
                });
        });
    })

    it("should reject an invalid password", () => {
        createLoginUser().then(user => {
            login({ email: user.email, password: "senha-invalida" }, { failOnStatusCode: false })
                .then(response => {
                    expect(response.status).to.eq(401);
                    expect(response.body.message).to.eq("Email e/ou senha inválidos");
                });
        });
    })

    it("should reject an expired token", () => {
        cy.request({
            method: "POST",
            url: "/produtos",
            body: {
                nome: "Produto token expirado",
                preco: 10,
                descricao: "Teste de token expirado",
                quantidade: 1,
                imagem: "https://serverest.dev/imagens/produto.png"
            },
            headers: {
                Authorization: "Bearer token-expirado"
            },
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(401);
        });
    })
})