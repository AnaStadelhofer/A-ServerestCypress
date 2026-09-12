import {
    getAllCarts,
    getCartByID,
    createCart,
    cancelPurchase,
    finishPurchase
} from "../../support/services/cartService";

import { getAllProducts } from "../../support/services/productService";
import { getNewUserToken } from "../../support/services/authService";
import { createUser } from "../../support/services/userService";

const getProductForCart = () => getAllProducts().then(response => response.body.produtos[0]);

describe("Carts API", () => {
    beforeEach(() => {
        cy.GeneratePayloadUser().then(user => {
            createUser(user).then(response => {
                expect(response.status).to.eq(201);
                getNewUserToken();
            });
        });
    });

    it("should get all carts successfully", () => {
        getAllCarts().then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("carrinhos").and.to.be.an("array");
        });
    })

    it("should get a cart by ID successfully", () => {
        getAllCarts().then(response => {
            const cart = response.body.carrinhos[0];

            if (!cart) {
                return;
            }

            getCartByID(cart._id).then(cartResponse => {
                expect(cartResponse.status).to.eq(200);
                expect(cartResponse.body._id).to.eq(cart._id);
            });
        });
    })

    it("should add a cart successfully", () => {
        getProductForCart().then(product => {
            createCart({ produtos: [{ idProduto: product._id, quantidade: 1 }] }).then(response => {
                expect(response.status).to.eq(201);
                expect(response.body.message).to.eq("Cadastro realizado com sucesso");
                cancelPurchase();
            });
        });
    })

    it("should cancel a cart successfully", () => {
        getProductForCart().then(product => {
            createCart({ produtos: [{ idProduto: product._id, quantidade: 1 }] }).then(() => {
                cancelPurchase().then(response => {
                    expect(response.status).to.eq(200);
                    expect(response.body.message).to.eq("Registro excluído com sucesso. Estoque dos produtos reabastecido");
                });
            });
        });
    })

    it("should finish a cart successfully", () => {
        getProductForCart().then(product => {
            createCart({ produtos: [{ idProduto: product._id, quantidade: 1 }] }).then(() => {
                finishPurchase().then(response => {
                    expect(response.status).to.eq(200);
                    expect(response.body.message).to.eq("Registro excluído com sucesso");
                });
            });
        });
    })

})