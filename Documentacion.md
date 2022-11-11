
### **EndPoints** 



#### **Todos los productos**

`GET  /productos`

Al hacer una petición a este endpoint nos devuelve un array con todos los productos.


```JSON
[ 
    { 
        "id": 5,
        "name": "ENERGETICA MR BIG",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/misterbig3308256.jpg",
        "price": 1490,
        "discount": 20,
        "category": 1
    }, 
    { 
        "id": 6,
        "name": "ENERGETICA RED BULL",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/redbull8381.jpg",
        "price": 1490,
        "discount": 0,
        "category": 1 
    },
    ... 
]

```
#### **Un producto en especifico**

``GET /products/8`` 

Al hacer una petición ha este endpoint nos trae el producto que constenga ese ID en este caso el producto de ID = 8 

```JSON
{ 
    "name": "PISCO ALTO DEL CARMEN 35º",
    "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/alto8532.jpg",
    "subtotal": 7990,
    "discount": 10,
    "price": 7980,
    "category": "pisco"
}
```

#### **Limite de productos y Querys**

**Querys**

``GET /products?limit=2``

Al agregarle esta Query nos permite traer un limite de N cantidad de productos en este caso 2

```JSON
[ 
    { 
      "id": 5,
      "name": "ENERGETICA MR BIG",
      "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/misterbig3308256.jpg",
      "price": 1490,
      "discount": 20,
      "category": 1 
    },
    { 
      "id": 6,
      "name": "ENERGETICA RED BULL",
      "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/redbull8381.jpg",
      "price": 1490,
      "discount": 0,
      "category": 1
    }
]
```

#### **Descuentos**


``GET /products?desc=si``

En esta query se le pasa de parámetro un ``desc=si``, esto hará que la aplicación nos devuelva todos los productos que tengan algun tipo de descuentos.

```JSON
[ 
    { 
        "id": 5,
        "name": "ENERGETICA MR BIG",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/misterbig3308256.jpg",
        "price": 1490,
        "discount": 20,
        "category": 1 
    }, 
    { 
        "id": 8,
        "name": "PISCO ALTO DEL CARMEN 35º",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/alto8532.jpg",
        "price": 7990,
        "discount": 10,
        "category": 2
    },
    ... 
]
```

### **Ordenar y Filtrar**

#### **Search**

``GET /products?search=man``

Realizar una busqueda en la API nos permitirá mostar productos que coincidan con el criterio de búsqueda del cliente.
Se le debe pasar un string con una longitud minima de 3, ya que así evitaría en el caso de ingrear una letra, presentar la mayoría de los productos.

```JSON
[
    {
        "id": 47,
        "name": "Maní salado",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/manisaladomp4415.jpg",
        "price": 600,
        "discount": 0,
        "category": 5
    },
    {
        "id": 53,
        "name": "Mani Sin Sal",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/manisinsalmp6988.jpg",
        "price": 500,
        "discount": 0,
        "category": 5
    }
]
```

#### **Order**


``GET /products?order=name``

Este caso tiene una peculiaridad la cual es que se le puede pasar el valor por el cual se desea ordenar
ya sea por el **precio** o el **nombre** pero no es requerido poner si se desea ordenar de manera ascendente o descendente.
La aplicación por defecto asigna el valor de **ascendente**


```JSON
[ 
    { 
        "id": 104,
        "name": "ABSOLUT",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/absolut21381.png",
        "price": 8990,
        "discount": 30,
        "category": 7 
    }, 
    { 
        "id": 68,
        "name": "Bebida Sprite 1 Lt",
        "url_image": null,
        "price": 1250,
        "discount": 10,
        "category": 4
    },
    ... 
]
```

#### **Sort**

``GET /products?order=name&sort=desc``


Si no queremos ordenar los productos de manera ascendente tenemos esta otra query la cual para poder usarla usamos Ampersand y le paramos **sort = des**.
Esto nos devolverá todos los productos ordenamos de manera descendente teniendo en cuenta el tipo de dato por el cual se ordena ya sea nombre o precio.

```JSON
[ 
    { 
        "id": 50,
        "name": "SPRITE 2 Lt",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/sprite-2lt4365.jpg",
        "price": 1800,
        "discount": 0,
        "category": 4 
    }, 
    { 
        "id": 48,
        "name": "SPRITE 1 1/2 Lts",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/sprite-lata-33cl5575.jpg",
        "price": 1500,
        "discount": 0,
        "category": 4 
    },
    ... 
]
```

#### **importante**

Las Querys se pueden usar con otras Querys un ejemplo es este

``GET /products?limit=3&order=name&sort=desc`` 

Esto nos devolverá un limite de 3 productos ordenadas por su nombre en manera descendente.

```JSON
[ 
    { 
        "id": 5,
        "name": "ENERGETICA MR BIG",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/misterbig3308256.jpg",
        "price": 1490,
        "discount": 20,
        "category": 1 
    }, 
        { "id": 6,
        "name": "ENERGETICA RED BULL",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/redbull8381.jpg",
        "price": 1490,
        "discount": 0,
        "category": 1 
    }, 
        { "id": 7,
        "name": "ENERGETICA SCORE",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/logo7698.png",
        "price": 1290,
        "discount": 0,
        "category": 1 
    } 
]
```


###**Category**

#### **Todas las categorías**

``GET /category`` 

Al hacer una petición a este endpoint nos devuelve un array con todos las categorías en la base de datos.

```JSON
[
    {
        "id": 1,
        "name": "bebida energetica"
    },
    {
        "id": 2,
        "name": "pisco"
    },
    {
        "id": 3,
        "name": "ron"
    },
    {
        "id": 4,
        "name": "bebida"
    },
    {
        "id": 5,
        "name": "snack"
    },
    {
        "id": 6,
        "name": "cerveza"
    },
    {
        "id": 7,
        "name": "vodka"
    }
]
```
#### **Una categoría en especifico**

``GET /category/5``

Al hacer una petición a este endpoint nos trae la categoria que tenga el ID especificado en este caso la categoria de id = 5

```JSON
[ 
    { 
        "id": 5,
        "name": "snack" 
    } 
] 
```


#### **Todos los productos de una misma categoria**

``GET /category/2/products`` 

Al hacer una petición a este endpoint nos trae todos los productos que tengan la categoria asignada.

```JSON
[ 
    { 
        "id": 8,
        "name": "PISCO ALTO DEL CARMEN 35º",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/alto8532.jpg",
        "price": 7990,
        "discount": 10,
        "category": 2 
    },
    { 
        "id": 9,
        "name": "PISCO ALTO DEL CARMEN 40º ",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/alto408581.jpg",
        "price": 5990,
        "discount": 0,
        "category": 2 
    },
    ...
]
```

#### **filtrar**

``GET /category/2/products?desc=si``

Al hacer esta Query nos trae todos los productos que tengan la categoría asignada y que también tengan algún tipo de descuento.


```JSON
[
    {
        "id": 8,
        "name": "PISCO ALTO DEL CARMEN 35º",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/alto8532.jpg",
        "price": 7990,
        "discount": 10,
        "category": 2
    },
    {
        "id": 12,
        "name": "PISCO CAMPANARIO 35º",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/campanario8845.jpg",
        "price": 2990,
        "discount": 20,
        "category": 2
    },
    {
        "id": 13,
        "name": "PISCO CAMPANARIO 40º",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/campanario408881.jpg",
        "price": 3990,
        "discount": 20,
        "category": 2
    },
    ...
]
```

## Funciones que me gustaria agregar u optimizar:

#### **Filtros**

Al poner como prioridad la UX, poder optimizar, mejorar y talvez aumentar los filtros o las busquedas
para que a partir de eso el usuario pueda conseguir exactamente lo que desea buscar con solo agregar estos filtros




**Desarrollador: Luis Salvador**
