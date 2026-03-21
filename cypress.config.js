const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: true,

  e2e: {
    specPattern: "cypress/integration/**/*.cy.js",

    setupNodeEvents(on, config) {
      const environments = {
        dev: "https://serverest.dev",
        prod: "https://serverest.dev"
      };

      const selectedEnv = config.env.environment || "dev";
      config.baseUrl = environments[selectedEnv];

      return config;
    },
  },
});
