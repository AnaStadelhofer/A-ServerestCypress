import {
    getAllUsers,
    createUser
} from "../../support/services/userService";

import { getNewUserToken } from "../../support/services/authService";

describe("Users API", () => {

    beforeEach(() => {
        createUser(cy.GeneratePayloadUser());
        getNewUserToken();
    })

    it("should create a user successfully", () => {
    })

    it("should get all the users successfully", () => {
        getAllUsers();
    })

    it("should get user by ID successfully", () => {
        //createUser
        //get User recently created
    })

    it("Should delete a user successfully", () => {
        //createUser
        //delete User recently created
    })

    it("Should update a user successfully", () => {
        //createUser
        //edit User recently created
    })

    it("don't should create user with empty password", () => {

    })

    it("don't should create user with empty email", () => {

    })

})