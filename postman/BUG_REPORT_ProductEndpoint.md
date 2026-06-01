# Bug Report: POST /products returns 500 Internal Server Error

## Summary

The Toolshop API `POST /products` endpoint returns `500 Internal Server Error` even when the request body includes all documented required fields.

## Reproduction

1. Authenticate with `POST https://api.practicesoftwaretesting.com/users/login`.
2. Copy the bearer token from the login response.
3. Send a `POST https://api.practicesoftwaretesting.com/products` request with:
   - `Content-Type: application/json`
   - `Authorization: Bearer <token>`

### Example payload

```json
{
  "name": "string",
  "description": "string",
  "price": 1.99,
  "category_id": "01JFG8Q5XKZJY4BEYQ87PC2Q1Y",
  "brand_id": "01JFG8Q5XKZJY4BEYQ87PC2Q1Y",
  "product_image_id": "01JFG8Q5XKZJY4BEYQ87PC2Q1Y",
  "is_location_offer": 1,
  "is_rental": 0,
  "co2_rating": "A"
}
```

## Actual result

Status code: `500 Internal Server Error`

Response body:

```json
{
  "message": "Something went wrong"
}
```

## Expected result

Status code: `200` and a JSON body containing the created product details, including `id`, `name`, and nested `brand`, `category`, and `product_image` objects.

## Notes

- This appears to be a server-side bug, not a client-side validation issue.
- The endpoint documentation itself reproduces the same server error for the example request.
- The request payload includes the required fields documented by the API.

## Recommended action

- Report the issue to the API provider / engineering team.
- Ask the provider to inspect the server logs for `POST /products` and fix the endpoint or document the failure mode.
