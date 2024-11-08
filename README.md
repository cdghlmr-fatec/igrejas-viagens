danielvor: crie o manual desse projeto

Workspace: # Manual do Projeto Conexão Aparecida

## Índice
1. Introdução
2. [Estrutura do Projeto](#estrutura-do-projeto)
3. [Configuração do Ambiente](#configuração-do-ambiente)
4. Instalação
5. [Scripts Disponíveis](#scripts-disponíveis)
6. [Configuração do Backend](#configuração-do-backend)
7. [Configuração do Frontend](#configuração-do-frontend)
8. [Executando o Projeto](#executando-o-projeto)
9. [Endpoints da API](#endpoints-da-api)
10. [Autenticação e Autorização](#autenticação-e-autorização)
11. [Configuração do ESLint](#configuração-do-eslint)

## Introdução
Este projeto implementa um fluxo de cadastro e login usando JWT (JSON Web Tokens) para autenticação. Ele se conecta a um banco de dados MongoDB para gerenciar papéis de usuário e dados de usuário.

## Estrutura do Projeto
```
.gitignore
.vscode/
    launch.json
    settings.json
api.postman_collection.json
backend/
    .mvn/
        wrapper/
            maven-wrapper.properties
    mvnw
    mvnw.cmd
    pom.xml
    src/
        main/
            java/
                com/fatec/api/
                    controllers/
                    models/
                    payload/
                    repository/
                    security/
                    services/
            resources/
        test/
frontend/
    .gitignore
    eslint.config.js
    index.html
    package.json
    README.md
    src/
        assets/
        components/
        pages/
        rotas.jsx
        styles/
    vite.config.js
README.md
```

## Configuração do Ambiente
### Requisitos
- Node.js
- npm
- Java 17
- Maven
- MongoDB

### Configuração do MongoDB
1. Crie um cluster MongoDB no [MongoDB Atlas](https://cloud.mongodb.com/).
2. Obtenha a string de conexão do MongoDB e substitua o placeholder no arquivo 

application.properties

.

## Instalação
### Backend
1. Navegue até o diretório 

backend

.
2. Execute o comando:
    ```sh
    ./mvnw install
    ```

### Frontend
1. Navegue até o diretório 

frontend

.
2. Execute o comando:
    ```sh
    npm install
    ```

## Scripts Disponíveis
### Frontend
No diretório 

frontend

, você pode executar:

- 

npm run dev

: Executa o aplicativo em modo de desenvolvimento.
- 

npm run build

: Compila o aplicativo para produção.
- `npm run lint`: Executa o linter.
- `npm run preview`: Visualiza a compilação de produção.

### Backend
No diretório 

backend

, você pode executar:

- 

mvnw

 spring-boot:run`: Executa o aplicativo Spring Boot.

## Configuração do Backend
### Arquivo 

application.properties


Configure as seguintes propriedades no arquivo 

application.properties

:
```properties
spring.data.mongodb.uri = <sua-string-de

-con

exão-mongodb>
jwtSecret= <sua-chave-secreta-jwt>
jwtExpirationMs= 86400000
server.port=8080
```

## Configuração do Frontend
### Arquivo 

vite.config.js


O arquivo de configuração do Vite está localizado em 

vite.config.js

:
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

### Arquivo `eslint.config.js`
O arquivo de configuração do ESLint está localizado em 

eslint.config.js

:
```js
import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]
```

## Executando o Projeto
### Backend
1. Navegue até o diretório 

backend

.
2. Execute o comando:
    ```sh
    ./mvnw spring-boot:run
    ```

### Frontend
1. Navegue até o diretório 

frontend

.
2. Execute o comando:
    ```sh
    npm run dev
    ```

## Endpoints da API
### Autenticação
- `POST /api/auth/signin`: Autentica o usuário e retorna um token JWT.
- `POST /api/auth/signup`: Registra um novo usuário.

### Administração
- `GET /api/admin`: Retorna todos os usuários.
- `GET /api/admin/{id}`: Retorna um usuário pelo ID.
- `POST /api/admin`: Cria um novo usuário.
- `PUT /api/admin/{id}`: Atualiza um usuário pelo ID.
- `DELETE /api/admin/{id}`: Deleta um usuário pelo ID.

### Teste
- `GET /api/test/public`: Acesso público.
- `GET /api/test/private`: Acesso privado (requer autenticação).

## Autenticação e Autorização
O projeto utiliza JWT para autenticação e autorização. O token JWT é gerado no login e deve ser incluído no cabeçalho `Authorization` das requisições subsequentes.

### Exemplo de Cabeçalho de Autorização
```
Authorization: Bearer <seu-token-jwt>
```

## Configuração do ESLint
O ESLint está configurado para garantir a qualidade do código. As regras estão definidas no arquivo 

eslint.config.js

.

### Executando o ESLint
Para executar o ESLint, navegue até o diretório 

frontend

 e execute:
```sh
npm run lint
```

---

Este manual fornece uma visão geral do projeto e instruções detalhadas para configuração e execução. Para mais informações, consulte a documentação do código e os comentários nos arquivos de configuração.