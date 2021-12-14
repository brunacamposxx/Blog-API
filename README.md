### Boas vindas ao repositório do API de Blogs!

A API de Blogs é uma aplicação em `Node.js` usando o pacote `sequelize` para fazer um `CRUD` de posts.

Para fazer um post é necessário usuário e login, portanto será trabalhada a **relação entre** `user` e `post`. Também será necessário a utlização de categorias para seus posts, assim trabalhando a relação de `posts` para `categorias` e de `categorias` para `posts`.

---

Desenvolvido por 💬:
Bruna Campos @brunacamposxx
Por favor, me envie seu feedback sobre esse projeto e me ajude a evoluir 🧠
---

# Habilidades 

Nesse projeto, foi construido um back-end usando `ORM` com o pacote `sequelize` do `npm`, e nele fui capaz de:
 - Criar e associar tabelas usando `models` do `sequelize`
 - Construir endpoints para consumir os models que criar 
 - Fazer um `CRUD` com o `ORM`


## O que será desenvolvido

Nesse projeto, arquiteto e desenvolvo uma API de um CRUD posts de blog (com o sequelize). Começando pela API, foi desenvolvido alguns endpoints (seguindo os princípios do REST) que estarão conectados ao banco de dados, aplicando os princípios SOLID!

Primeiro, há uma tabela para os usuários que desejam se cadastrar na aplicação. Após isso, também há uma tabela de Categorias para seus Posts e por fim a tabela de Posts que é o foco, guardando todas as informações dos posts realizados na plataforma.

---

# Instruções para acessar esse projeto:


### ANTES DE COMEÇAR A DESENVOLVER:

1. Clone o repositório
  * `git clone https://github.com/brunacamposxx/Blogs-API`.
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd Blogs-API`

2. Instale as dependências
  * `npm install`

3. Startar node com Nodemon
  * `npm run debug`


---
# Testando as requisições:

### 👀 Observações importantes:

**Você irá precisar configurar as variáveis globais do MySQL.** Você pode usar esse [Conteúdo de variáveis de ambiente com NodeJS](https://blog.rocketseat.com.br/variaveis-ambiente-nodejs/) como referência.

**Faça essas configurações também para as variáveis de ambiente usadas nesses arquivo:**

`sd-011-project-blogs-api/config/config.js`

```
module.exports = {
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'blogs_api',
    host: process.env.HOSTNAME,
    dialect: 'mysql',
  },
  test: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'blogs_api',
    host: process.env.HOSTNAME,
    dialect: 'mysql',
  },
  production: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'blogs_api',
    host: process.env.HOSTNAME,
    dialect: 'mysql',
  },
};
```

**(Neste arquivo e obrigatório deixar o nome do database como `"database": 'blogs_api'`)**

**É essencial usar essas 3 variávies no arquivo acima:**

#### Variáveis:

`host: process.env.HOSTNAME`

`user: process.env.MYSQL_USER`

`password: process.env.MYSQL_PASSWORD`


#### Status HTTP

---

#### Os seguintes pontos serão avaliados:

- A tabela chamada **Users**, tem a seguinte estrutura::

  ```json
  {
    "id": 1,
    "displayName": "Brett Wiltshire",
    "email": "brett@email.com", // tem quer ser único
    "password": "123456",
    "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
  }
  ```
- A tabela chamada **Categories**, tem a seguinte estrutura::

  ```json
  {
    "id": 18,
    "name": "News"
  }
  ```

- A tabela chamada **PostsCategories**, tem a seguinte estrutura:

  ```json
  {
    "postId": 50,
    "categoryId": 20
  }
  ```

- A tabela chamada **BlogPosts**, tem a seguinte estrutura::

  ```json
  {
    "id": 21,
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key",
    "userId": 14, // esse é o id que referência usuário que é o autor do post
    "published": "2011-08-01T19:58:00.000Z",
    "updated": "2011-08-01T19:58:51.947Z",
  }
  ```
  
  **Os dados acima são fictícios, e estão aqui apenas como exemplo**  


## Lista de Requisitos:
Utilize o Postman para testar a aplicação.

### 1 - Cadastro de usuários:
- POST `/user` - rota que cria um novo usário a tabela no banco de dados;

- O corpo da requisição deve conter o seguinte formato:

  ```json
  {
    "displayName": "Brett Wiltshire",
    "email": "brett@email.com",
    "password": "123456",
    "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
  }
  ```
- O campo `displayName` deverá ser uma string com no mínimo de 8 caracteres;

- O campo `email` será considerado válido se tiver o formato `<prefixo>@<domínio>` e se for único. Ele é obrigatório.

- A senha deverá conter 6 caracteres. Ela é obrigatória.

- Caso exista uma pessoa com o mesmo email na base, retornará o seguinte erro:

  ```json
  {
    "message": "User already registered"
  }
  ```

- Caso contrário, retornará a mesma resposta do endpoint de `/login`, um token `JWT`:

  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
  }
  ```
  _O token anterior é fictício_



### Login de usuários
- POST `/login`

- O corpo da requisição deverá seguir o formato abaixo:

  ```json
  {
    "email": "email@mail.com",
    "password": "123456"
  }
  ```

- Caso algum desses campos seja inválido ou não exista um usuário correspondente no banco de dados, retorná um código de status 400 com o corpo `{ message: "Campos inválidos" }`.

- Caso esteja tudo certo com o login, a resposta é um token `JWT`, no seguinte formato:

  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
  }
  ```
  _O token anterior é fictício_


### 3 - Lista de usuários para
- GET `/user`

- Listar todos os **Users** e retorna na seguinte estrutura:

  ```json
  [
    {
      "id": "401465483996",
      "displayName": "Brett Wiltshire",
      "email": "brett@email.com",
      "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
    }
  ]
  ```

- A requisição deve ter token de autenticação nos headers e, caso contrário, retorne um código de `status 401`.


### 4 - Recuperando um usuário específico 
- GET `/user/:id`

- Retorna os detalhes do usuário baseado no `id` da rota. Os dados tem o seguinte formato:

  ```json
  {
    "id": "401465483996",
    "displayName": "Brett Wiltshire",
    "email": "brett@email.com",
    "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
  }
  ```

- A requisição deve ter token de autenticação nos headers e, caso contrário, retorne um código de `status 401`.

### 5 - Cadastro de Categorias aplicação
- POST `/categories`

- Esse endpoint deve receber uma _Categoria_ no corpo da requisição e à criárá no banco. O corpo da requisição deve ter a seguinte estrutura:

 ```json
  {
    "name": "Inovação"
  }
  ```

- Caso a Categoria não contenha o `name` a API deve retornar um erro de `status 400`.

- A requisição deve ter o token de autenticação nos headers e, caso contrário, retorne um código de `status 401`.


### 6 - Listagem de categorias
- GET `/categories`

- Esse endpoint lista todas as Categorias e retorna na seguinte estrutura:

```json
[
  {
    "id": 1,
    "name": "Escola"
  },
  {
    "id": 2,
    "name": "Inovação"
  }
]
```


### 7 - Criação de Posts
- POST `/post`

- Esse endpoint deve receber um _BlogPost_ no corpo da requisição e à criará no banco. O corpo da requisição deve ter a seguinte estrutura:

  ```json
  {
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key",
    "categoryIds": [1, 2]
  }
  ```

- Caso o post não contenha o `title`, `content` ou `categoryIds` a API retornará um erro de `status 400`.

- A requisição deve ter o token de autenticação nos headers e, caso contrário, retorne um código de `status 401`.


### 8 - Listagem de Posts 
- GET `/post`

- Esse endpoint lista todos os _BlogPosts_ e retorna na seguinte estrutura:

```json
[
  {
    "id": 1,
    "title": "Post do Ano",
    "content": "Melhor post do ano",
    "userId": 1,
    "published": "2011-08-01T19:58:00.000Z",
    "updated": "2011-08-01T19:58:51.000Z",
    "user": {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2017_Malaysia.jpg"
    },
    "categories": [
      {
        "id": 1,
        "name": "Inovação"
      }
    ]
  }
]
```

### 9 - Retorno de um Post específico
- GET `post/:id`

- Retorna um **BlogPost** com o `id` especificado. O retorno será no seguinte formato:

```json
  {
  "id": 1,
  "title": "Post do Ano",
  "content": "Melhor post do ano",
  "userId": 1,
  "published": "2011-08-01T19:58:00.000Z",
  "updated": "2011-08-01T19:58:51.000Z",
  "user": {
    "id": 1,
    "displayName": "Lewis Hamilton",
    "email": "lewishamilton@gmail.com",
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
  },
  "categories": [
    {
      "id": 1,
      "name": "Inovação"
    }
  ]
}
```


### 10 - Atualização de um Post específico 
- PUT `/post/:id`


- O endpoint receberá um **BlogPost** que irá sobrescrever o original com o `id` especificado na URL. Só é permitido para o usuário que criou o **BlogPost**.

- A(s) categoria(s) do post **não** podem ser editadas, somente o `title` e `content`.

- O corpo da requisição terá a seguinte estrutura:

  ```json
  {
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key"
  }
  ```

- Caso uma pessoa diferente de quem criou faça a requisição, retornará um código `status 401`.

- Caso uma requisição sem token seja recebida, retornará um código de `status 401`.

- Caso o post não contenha o `title` e/ou o `content` a API deve retornará um erro de `status 400`.



### 11 - Deletando um post específico 
- DELETE `post/:id`

- Deleta o post com o `id` especificado. Só é permitido para o usuário que criou o **BlogPost**.

- Caso uma pessoa diferente de quem criou faça a requisição, deve retornar um código `status 401`.

- Caso uma requisição sem token seja recebida, deve-se retornar um código de `status 401`.

- Caso o post referido não exista, deve-se retornar um código de `status 404`.



### DELETE `/user/me`

- Utilizando o token de autenticação nos headers, o usuário correspondente deve ser apagado.


### 13 - Pesquisando no queryParam
- GET `post/search?q=:searchTerm`

#### Os seguintes pontos serão avaliados:

- Retorna uma array de **BlogPosts** que contém em seu título, ou conteúdo, o termo pesquisado no `queryParam` da URL. O retorno terá o seguinte formato:

```json
[
  {
    "id": 2,
    "title": "Vamos que vamos",
    "content": "Foguete não tem ré",
    "userId": 1,
    "published": "2011-08-01T19:58:00.000Z",
    "updated": "2011-08-01T19:58:51.000Z",
    "user": {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
    },
    "categories": [
      {
        "id": 2,
        "name": "Escola"
      }
    ]
  }
]
  ```

- Caso nenhum **BlogPost** satisfaça a busca, retorna um array vazio.

---
