# Unit API Spec

## POST Unit or UPDATE Unit

Endpoint : POST /api/units or UPDATE

Request Header :
- Authorization : bearer TOKEN


Request Body :

```json
{
    "name": "Toyota",
    "categories": [
        {"category": "Kuat"},
        {"category": "Irit"}
    ],
    "price": 100000
}
```

Response Body (Success) :

```json
{
    "data": {
        "id": 6,
        "name": "Toyota",
        "categories": [
            {
                "category": "Kuat"
            },
            {
                "category": "Irit"
            }
        ],
        "price": 100000
    }
}
```

Response Body (Failed) :

```json
{
    "errors": "Validation error : {\"issues\":[{\"code\":\"invalid_type\",\"expected\":\"number\",\"received\":\"undefined\",\"path\":[\"price\"],\"message\":\"Required\"}],\"name\":\"ZodError\"}"
}
```

## Get Unit

Endpoint : GET /api/units

Request Header :
- Authorization : bearer TOKEN


Response Body (Success) :

```json
{
    "data": [
        {
            "id": 3,
            "name": "Toyota",
            "categories": [
                {
                    "category": "Kuat"
                },
                {
                    "category": "Irit"
                }
            ],
            "price": 100000,
            "multiple_by": null
        },
        {
            "id": 4,
            "name": "Honda",
            "categories": [
                {
                    "category": "kuat"
                },
                {
                    "category": "hemat"
                }
            ],
            "price": 2000000,
            "multiple_by": null
        },
        {
            "id": 5,
            "name": "Suzuki",
            "categories": [
                {
                    "category": "Besar"
                },
                {
                    "category": "Irit"
                }
            ],
            "price": 3000000,
            "multiple_by": null
        },
        {
            "id": 6,
            "name": "Toyota",
            "categories": [
                {
                    "category": "Kuat"
                },
                {
                    "category": "Irit"
                }
            ],
            "price": 100000,
            "multiple_by": null
        }
    ]
}
```

Response Body (Failed) :

```json
{
  "errors" : "Error"
}
```


## Search Unit

Endpoint : GET /api/units/search?name=toyo

Request Header :
- Bearer Token 

Lifetime access token is 20 second, if expired please get refresh token

Response Body (Success) :

```json
{
    "data": [
        {
            "id": 3,
            "name": "Toyota",
            "categories": [
                {
                    "category": "Kuat"
                },
                {
                    "category": "Irit"
                }
            ],
            "price": 100000
        }
    ],
    "paging": {
        "current_page": 1,
        "total_page": 1,
        "size": 10
    }
}
```

Response Body (Failed) :

```json
{
  "errors" : "Unauthorized, ..."
}
```


## Delete Unit

Endpoint : DELETE /api/units/2

Response Body (Success) :

```json
{
  "data" : "OK"
}
```

Response Body (Failed) :

```json
{
  "errors" : "Not allow access!"
}
```