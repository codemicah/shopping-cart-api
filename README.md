# Shopping Cart API

A shopping cart system API where multiple users can purchase products from a shared inventory.

Built with:

- NodeJS
- Typescript
- Express
- Docker

# Setup Instructions

1. Run `yarn install` to install required dependencies
2. Create a .env file using `touch .env`
3. Copy the contents of example.env into it using `cp example.env .env`
4. Run `yarn dev` to start the development server

# Endpoints

View fully interactive API [documentation here](https://documenter.getpostman.com/view/24975827/2sAY4sj4Nt)

`POST /auth/login` to log in with the demo account

```js
{ email: "demo@example.com", password: "password" }
```

`GET /products` to get all products

`GET /products/:id` to get a single product

`GET /cart` to view your cart

`POST /cart` to add a product to your cart

```js
{ productId: "product ID", quantity: 1 }
```

`DELETE /cart/:productId` to remove a product from your cart

`POST /checkout` to checkout the items in your cart
