Postman collection: Toolshop API - Store Product

Files

- postman/Toolshop-Store-Product.postman_collection.json
- postman/Toolshop-Env.postman_environment.json

Quick steps in Postman

1. Import the collection and environment into Postman.
2. Open the environment and set `adminEmail` / `adminPassword` to valid admin credentials.
3. Run the `Login - get auth token` request (this will set `authToken`).
4. Run `Create Product - store new product` or run the collection runner.

Run with Newman (CLI)

1. Install Newman (if not installed):

```bash
npm install -g newman
```

2. Run the collection with the environment file:

```bash
newman run postman/Toolshop-Store-Product.postman_collection.json -e postman/Toolshop-Env.postman_environment.json --reporters cli
```

Notes & assertions

- The collection includes two requests: login and create product.
- The login request stores the bearer token into the environment variable `authToken`.
- The create product request generates a unique `productName` in a pre-request script, sends the POST `/products` body and asserts:
  - status code is 2xx
  - response contains a product id
  - returned product name matches the generated name

Troubleshooting

- If creation fails with 401/403, confirm `adminEmail`/`adminPassword` belong to a user with permission to create products.
- Make sure `brandId`, `categoryId`, and `productImageId` in the environment are set to valid existing IDs in the Toolshop API.
- If the API expects different property names, edit the request body in the collection accordingly.
- If the endpoint returns `500 Internal Server Error` with a valid payload, this is likely a server-side bug in the API. See `postman/BUG_REPORT_ProductEndpoint.md` for details.

Advanced: run only the create-product request (when auth token already set)

```bash
newman run postman/Toolshop-Store-Product.postman_collection.json -e postman/Toolshop-Env.postman_environment.json --folder "Create Product - store new product"
```
