E-Commerce CMS App
Link Deploy : https://e-commerce-cms-ae90d.web.app/
```json
    RESTful endpoint for E-Commerce CMS App
    JSON-formatted response.

 
RESTful Endpoints


## POST /login
## GET /product 
## POST /product
## PUT /product/:id
## DELETE /product/:id

##POST /login 

        Request Header

            Not Needed

        Request Body

        {
            "email": "admin@mail.com",
            "password": 1234, 
        }

        Response (201)

        {
            "access_token"
        }

        Response (400 - Bad Request)
        {
        "message": "Email and Password can't Empty"
        }

        Response (401 - Unauthorized)

        {
        "message": "Email and Password can't Empty"
        }

        Response (500 - Internal Server Error)

        {
        "message": "Internal Server Error."
        }


##GET /product 

        Request Header
        {
        "access_token": "<access_token>"
        }

        Request Body

        not needed

        Response (200)

        [
            {
                "id":1,
                "name": "carvil bag",
                "image_url": "https://ecs7.tokopedia.net/img/cache/700/product-1/2020/2/18/batch-upload/batch-upload_bd784ea6-18d2-4efa-9882-78ab2306a3d7.jpeg",
                "price": 100000,
                "stock": 10,
                "category": "fashion"
            },
            {
                "id":2,
                "name": "carvil bag",
                "image_url": "https://ecs7.tokopedia.net/img/cache/700/product-1/2020/2/18/batch-upload/batch-upload_bd784ea6-18d2-4efa-9882-78ab2306a3d7.jpeg",
                "price": 100000,
                "stock": 10,
                "category": "fashion"
            }
        ]

        Response (401 - Unauthorized)
        {
        "message": "You are not authenticated"
        }
        Response (404 - not Found)
        {
        "message": "Not Found"
        }
        Response (500 - Internal Server Error)
        {
        "message": "Internal Server Error."
        }

##POST /product 

        Request Header
        {
        "access_token": "<access_token>"
        }

        Request Body

        {
        "name": "carvil bag",
        "image_url": "https://ecs7.tokopedia.net/img/cache/700/product-1/2020/2/18/batch-upload/batch-upload_bd784ea6-18d2-4efa-9882-78ab2306a3d7.jpeg",
        "price": 100000,
        "stock": 10,
        "category": "fashion"
        }

        Response (201)
        {
        "id":1,
        "name": "carvil bag",
        "image_url": "https://ecs7.tokopedia.net/img/cache/700/product-1/2020/2/18/batch-upload/batch-upload_bd784ea6-18d2-4efa-9882-78ab2306a3d7.jpeg",
        "price": 100000,
        "stock": 10,
        "category": "fashion"
        }


        Response (400 - Bad Request)
        {
        "name": "SequelizeValidationError"
        }
        Response (401 - Unauthorized)
        {
        "message": "You are not authenticated"
        }
        Response (403 - Forbidden)
        {
        "message": "You Dont Have Access!"
        }
        Response (500 - Internal Server Error)
        {
        "message": "Internal Server Error."
        }

##PUT /product/:id


        Request Header

        {
        "access_token": "<your access token>"
        }

        Request Body

        {
        "name": "polo bag",
        "image_url": "https://ecs7.tokopedia.net/img/cache/700/product-1/2020/2/18/batch-upload/batch-upload_bd784ea6-18d2-4efa-9882-78ab2306a3d7.jpeg",
        "price": 50000,
        "stock": 5,
        "category": "fashion"
        }

        Request Params
        {
            "id": 1
        }
        

        Response (200)
        {
        "id":1,
        "name": "polo bag",
        "image_url": "https://ecs7.tokopedia.net/img/cache/700/product-1/2020/2/18/batch-upload/batch-upload_bd784ea6-18d2-4efa-9882-78ab2306a3d7.jpeg",
        "price": 50000,
        "stock": 5,
        "category": "fashion"
        }

        Response (400 - Bad Request)
        {
        "message": "SequelizeValidationError"
        }
        Response (401 - Unauthorized)
        {
        "message": "You are not autenthicated"
        }
        Response (403 - Forbidden)
        {
        "message": "You Dont Have Access!"
        }
        Response (404 - Not Found)
        {
        "message": "Not Found"
        }
        Response (500 - Internal Server Error)
        {
        "message": "Internal Server Error."
        }

##DELETE /product/:id


        Request Header
        {
        "access_token": "<your access token>"
        }

        Request Params
        {
            "id": 1
        }

        Response (200)
        {
            "message": "Product success to delete"
        }

       
        Response (401 - Unauthorized)
        {
        "message": "You are not autenthicated"
        }
        Response (403 - Forbidden)
        {
        "message": "You Dont Have Access!"
        }
        Response (404 - Not Found)
        {
        "message": "Not Found"
        }
        Response (500 - Internal Server Error)
        {
        "message": "Internal Server Error."
        }