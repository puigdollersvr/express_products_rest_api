# FLAT101 - REST API

Ésta es una REST API desarrollada sobre el framework **Express**, 
connectada a una base de datos **MongoDB** con la ayuda del ODM **Mongoose**. 

Permitirà a la SPA(Single page application) desarrollada en **React** 
interactuar con la base de datos.

Para su arquitectura se ha utilizado una pequeña variante del patrón **MVC**,
dónde se anulan las vistas y se añaden los servicios.

El archivo principal de la aplicación es el `app.js`.

En `config/index.js` se puede configurar el puerto y la URL de la BD.

`npm run test -- --watch` ejecuta los tests de integración 
basados en el patrón **AAA (Arrange, Act, Assert)**.

## Instalar

    npm install

## Iniciar la aplicación - Docker requerido

    docker-compose build
    docker-compose up

## Ejecutar los tests

    npm run test -- --watch

# REST API

Documentación de la REST API.

## Obtener listado de productos

### Request

`GET /products/`

    curl -i -H --location --request GET 'http://localhost:9000/products'

### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 612
    ETag: W/"264-7IhNoxxN5VBX1SpLrNxLnFcwgy0"
    Date: Tue, 25 Jan 2022 13:15:26 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"products":[{"_id":"61ec1cc75887f9585f2e7185","sku":"0001","name":"Product 1M","description":"Lorem ipsum dolor sit amet","price":10,"category":"Home Office","stock":10,"date":"2022-01-22T15:03:03.441Z","__v":0},{"_id":"61ec1ccd5887f9585f2e7187","sku":"0002","name":"Product 2","description":"Lorem ipsum dolor sit amet","price":10,"category":"Home Office","stock":10,"date":"2022-01-22T15:03:03.441Z","__v":0},{"_id":"61efed2af50705d6c54217f9","sku":"0003","name":"Product 3","description":"Lorem ipsum dolor sit amet","price":10,"category":"Home Office","stock":10,"date":"2022-01-25T12:20:46.921Z","__v":0}]}

## Crear un producto

### Request

`POST /products/`

    curl -i -H  --location --request POST 'http://localhost:9000/products' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "sku": "0003",
        "name": "Product 3",
        "description": "Lorem ipsum dolor sit amet",
        "price": 10,
        "category": "Home Office",
        "stock": 10
    }'


### Response

    HTTP/1.1 201 Created
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 156
    ETag: W/"9c-IMoICqxyUsrN3jd03pc6q+4/x74"
    Date: Tue, 25 Jan 2022 13:23:48 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"_id":"61eff9e4f50705d6c5421812","sku":"0003","name":"Product 3","description":"Lorem ipsum dolor sit amet","price":10,"category":"Home Office","stock":10}

## Obtener producto concreto (En éste caso por SKU)

### Request

`GET products/:key/:value`

    curl -i -H --location --request GET 'http://localhost:9000/products/sku/0001'

### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 214
    ETag: W/"d6-7LVaINJmsvmzzQwZiW9Qnsn0ZlY"
    Date: Tue, 25 Jan 2022 13:25:16 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"products":[{"_id":"61ec1cc75887f9585f2e7185","sku":"0001","name":"Product 1","description":"Lorem ipsum dolor sit amet","price":10,"category":"Home Office","stock":10,"date":"2022-01-22T15:03:03.441Z","__v":0}]}

## Modificar un producto

### Request

`PUT products/:key/:value`

    curl -i -H --location --request PUT 'http://localhost:9000/products/sku/0001' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "sku": "0001",
        "name": "Product 1M",
        "description": "Lorem ipsum dolor sit amet",
        "price": 10,
        "category": "Home Office",
        "stock": 10
    }'

### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 157
    ETag: W/"9d-8ZMymei3SrUqxvLHMsm++LyPIp8"
    Date: Tue, 25 Jan 2022 13:27:51 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"_id":"61ec1cc75887f9585f2e7185","sku":"0001","name":"Product 1M","description":"Lorem ipsum dolor sit amet","price":10,"category":"Home Office","stock":10}

## Eliminar un producto

### Request

`DELETE products/:key/:value`

    curl -i -H --location --request DELETE 'http://localhost:9000/products/sku/0003' --data-raw ''

### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 156
    ETag: W/"9c-NBUe99zLy9hjm6zYpjBEsE1ur6k"
    Date: Tue, 25 Jan 2022 13:32:05 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"_id":"61effbacf50705d6c542181b","sku":"0003","name":"Product 3","description":"Lorem ipsum dolor sit amet","price":10,"category":"Home Office","stock":10}

## Posibles mejoras
- Validación JWT
- Más tests de integración
- Tests unitarios