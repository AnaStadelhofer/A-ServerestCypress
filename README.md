The project supports multiple environments through environment variables, allowing easy execution against dev, staging, or production without code changes.

# Results

Prints de execução

Porcentagem de cobertura

## 🔧 Multi-Environment Configuration

This project supports multiple environments using dynamic `baseUrl` configuration.

Available environments:

- dev
- staging
- prod

### Running tests

Run tests in dev (default):
npx cypress run

Run tests in staging:
npx cypress run --env environment=dev

Run tests in production:
npx cypress run --env environment=prod


This project uses a cypress.env.json file (ignored via .gitignore) to store sensitive credentials locally.