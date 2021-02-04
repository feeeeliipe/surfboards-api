# Surfboard API

## Tecnoligias Utilizadas

- NodeJS
- TypeScript
- Express (API REST)
- Joi (Validação de dados)
- MongoDB (Em memória)
- Jest (Testes)

## Instalando dependências

Para instalar as dependencias do projeto, execute o comando `npm install` na pasta raiz do projeto.

## Variáveis de ambiente

Para executar o projeto, configure as seguintes variáveis de ambiente no arquivo .env

- PORT=3001 (Opcional) - Caso não configurada, será assumido o valor padrão 3000
- JWT_SECRET=chavesecretajwt (Obrigatória)

## Executando o projeto localmente

Para executar o projeto localmente, execute o comando `npm start` na pasta raiz do projeto.

Os endpoints serão expostos em `http://localhost:3001` onde a porta será configurada através das variáveis de ambiente.

## Como utilizar

### Autenticação

A autenticação pode ser realizada através do endpoint `http://localhost:3001/authentication/signin` utilizando o método POST. A aplicação já possui um usuário cadastrado por padrão com os dados do payload de exemplo abaixo.

```json
{
  "username": "admin@omnichat.com.br",
  "password": "senha123"
}
```

### CRUD de Pranchas de Surf

Todos os endpoints do CRUD exigem que seja passado um token através da propriedade Authorization no Header da requisição para autenticar o usuário na aplicação.

#### Inclusão

Método HTTP: `POST`

Endpoint: `http://localhost:3001/surfboard`

Payload:

```json
{
  "brand": "Index Krown",
  "model": "Green Ligth",
  "length": "6.2",
  "volume": 32
}
```

#### Alteração

Método HTTP: `PUT`

Endpoint: `http://localhost:3001/surfboard/{id}`

Payload:

```json
{
  "brand": "Index Krown",
  "model": "Red Ligth",
  "length": "3.2",
  "volume": 16
}
```

#### Exclusão

Método HTTP: `DELETE`

Endpoint: `http://localhost:3001/surfboard/{id}`

#### Listagem (Completa)

Método HTTP: `GET`

Endpoint: `http://localhost:3001/surfboard`

#### Listagem por id

Método HTTP: `GET`

Endpoint: `http://localhost:3001/surfboard/{id}`

### Executando os testes unitários

Para executar os testes unitários, execute o comando `npm run test:unit` na pasta raiz do projeto.
