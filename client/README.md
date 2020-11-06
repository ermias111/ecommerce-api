## startup

run the following commands on your terminal     

    docker-compose up --build (to build the services)

    docker-compose up (to run the project)

then browse to http://localhost:5000/explorer/#/ to access the api

## swagger documentation

http://localhost:5000/explorer/swagger.json

## steps to follow

signup with **user/signup**

login with **user/login** with values
{
    "username": "",
    "password": ""
}

add item with **POST /item**

{
  "name": "string",
  "price": 0,
  "description": "string",
  "vendor": "string",
  "id": "string",
  "cartItemId": "string"
}

check cart detail with **cart/cart-details**

add items to the cart with **cart/add-items**
and add list of items to cart-items field
[
    {
        "quantity": Number,
        "Id": Item id
    },
    {
        "quantity": Number,
        "Id": Item id
    }, 
    {
        "quantity": Number,
        "Id": Item id
    },  
]

remove item from a cart with **cart/remove-item**
insert the id of the targeted cart item
