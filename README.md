# Testes automatizados da API ServeRest

## Objetivo

Automatizar os principais fluxos da API ServeRest com testes de API usando Cypress, cobrindo autenticação, usuários, produtos e carrinhos.

## Estrutura

```text
cypress/
	fixtures/                 Dados de apoio dos testes
	integration/
		auth/                   Cenários de autenticação
		carts/                  Cenários de carrinhos
		products/               Cenários de produtos
		users/                  Cenários de usuários
	support/
		commands.js             Comandos customizados e geração de dados
		services/               Serviços para chamadas à API
cypress.config.js           Configuração do Cypress e ambientes
cypress.env.json            Credenciais locais, não versionadas
.github/workflows/ci.yml    Pipeline de integração contínua
cypress/reports/            Relatório HTML gerado localmente
```

## Linguagem e frameworks

- JavaScript
- Cypress
- Faker.js, para geração de dados aleatórios
- cypress-plugin-api
- API ServeRest

## Pré-requisitos

- Node.js instalado
- Dependências instaladas com `npm install`
- Acesso à API ServeRest

## Executar os testes

Instalar dependências:

```bash
npm install
```

Executar toda a suíte:

```bash
npx cypress run
```

Abrir o Cypress no modo visual:

```bash
npx cypress open
```

Executar pelo script do ambiente de desenvolvimento:

```bash
npm run run:dev
```

Executar em um navegador específico:

```bash
npm run cy:chrome
npm run cy:firefox
npm run cy:edge
```

Executar um arquivo específico:

```bash
npx cypress run --spec cypress/integration/users/user.cy.js
```

## Relatório personalizado

Os testes geram arquivos JSON em `cypress/results`. Para consolidá-los em um
relatório HTML com título e página personalizados:

```bash
npm run test:ci
npm run report:generate
```

O relatório fica em `cypress/reports/index.html`. Os arquivos gerados
não são versionados e, no CI, são publicados como artefato da execução.

## CI/CD

O workflow `.github/workflows/ci.yml` executa a suíte em cada `push` e
`pull_request`, gera o relatório mesmo quando um teste falha e publica os
arquivos HTML/JSON na aba **Actions** do GitHub. O pipeline usa Node.js 20 e
`npm ci`; por isso, o `package-lock.json` deve ser mantido no repositório.

## Ambientes

O ambiente pode ser selecionado pela variável `environment`:

```bash
npx cypress run --env environment=dev
npx cypress run --env environment=prod
```

As URLs são configuradas em `cypress.config.js`.

## Credenciais

O arquivo `cypress.env.json` é local e deve permanecer fora do controle de versão. Ele pode armazenar credenciais neste formato:

```json
{
	"auth": {
		"email": "seu-email",
		"password": "sua-senha"
	}
}
```

Os testes criam usuários temporários quando necessário, reduzindo a dependência de credenciais fixas.