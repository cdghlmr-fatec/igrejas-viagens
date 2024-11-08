## Configuração do Backend

Configure as seguintes propriedades no arquivo application.properties
- propertiesspring.data.mongodb.uri = <sua-string-de-conexão-mongodb>
- jwtSecret= <sua-chave-secreta-jwt>
- jwtExpirationMs= 86400000
- server.port=8080

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
