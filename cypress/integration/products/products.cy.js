import {
	getAllProducts,
	getProductByID,
	createProduct,
	updateProduct,
	deleteProduct
} from "../../support/services/productService";

import { getNewUserToken } from "../../support/services/authService";
import { createUser } from "../../support/services/userService";

const createProductPayload = () => ({
	nome: `Produto Cypress ${Date.now()}`,
	preco: 100,
	descricao: "Produto criado pelos testes automatizados",
	quantidade: 10,
	imagem: "https://serverest.dev/imagens/produto-cypress.png"
});

describe("Products API", () => {
	beforeEach(() => {
		cy.GeneratePayloadUser().then(user => {
			createUser(user).then(response => {
				expect(response.status).to.eq(201);
				getNewUserToken();
			});
		});
	});

	it("should get all products successfully", () => {
		getAllProducts().then(response => {
			expect(response.status).to.eq(200);
			expect(response.body).to.have.property("produtos").and.to.be.an("array");
			expect(response.body.quantidade).to.be.at.least(0);
		});
	});

	it("should get a product by ID successfully", () => {
		getAllProducts().then(response => {
			const product = response.body.produtos[0];

			getProductByID(product._id).then(productResponse => {
				expect(productResponse.status).to.eq(200);
				expect(productResponse.body._id).to.eq(product._id);
			});
		});
	});

	it("should create a product successfully", () => {
		createProduct(createProductPayload()).then(response => {
			expect(response.status).to.eq(201);
			expect(response.body.message).to.eq("Cadastro realizado com sucesso");
			expect(response.body._id).to.be.a("string");
		});
	});

	it("should update a product successfully", () => {
		const product = createProductPayload();

		createProduct(product).then(createResponse => {
			updateProduct({ ...product, nome: `${product.nome} atualizado` }, createResponse.body._id)
				.then(response => {
					expect(response.status).to.eq(200);
					expect(response.body.message).to.eq("Registro alterado com sucesso");
				});
		});
	});

	it("should delete a product successfully", () => {
		createProduct(createProductPayload()).then(createResponse => {
			deleteProduct(createResponse.body._id).then(response => {
				expect(response.status).to.eq(200);
				expect(response.body.message).to.eq("Registro excluído com sucesso");
			});
		});
	});
});
