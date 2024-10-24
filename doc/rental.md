# Rental API Spec

## POST Rental

Endpoint : POST /api/rentals/3

Request Header :
- Authorization : bearer TOKEN


Request Body :

```json
{
    "due_date": "2024-10-19"
}
```

Response Body (Success) :

```json
{
    "data": {
        "userId": 4,
        "unitId": 3,
        "due_date": "2024-10-19T00:00:00.000Z"
    }
}
```

Response Body (Failed) :

```json
{
    "errors": "Validation error : {\"issues\":[{\"code\":\"invalid_type\",\"expected\":\"number\",\"received\":\"undefined\",\"path\":[\"price\"],\"message\":\"Required\"}],\"name\":\"ZodError\"}"
}
```

## Update Rental for Admin

Endpoint : PUT /api/rentals/10

Request Header :
- Authorization : bearer TOKEN


Response Body (Success) :

```json
{
    "data": {
        userId: userId,
        unitId: unitId,
        due_date: due_date,
        rent_start: rent_start,
        rent_end: rent_end,
        fine_per_day: fine_per_day,
        total_fine: total_fine,
    }
}
```

Response Body (Failed) :

```json
{
  "errors" : "Error"
}
```


## Get Rentals Admin

Endpoint : GET /api/rentals

Request Header :
- Bearer Token 

Lifetime access token is 20 second, if expired please get refresh token

Response Body (Success) :

```json
{
    "data": [
        {
            id: number;
            unitId: number;
            userId: number;
            rent_start: Date;
            rent_end: Date | null;
            due_date: Date;
            fine_per_day: number;
            total_fine: number | null;
        }
    ]
}
```

Response Body (Failed) :

```json
{
  "errors" : "Unauthorized, ..."
}
```


## Delete Rentals ADMIN

Endpoint : DELETE /api/rentals/10

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