**bsale_storeApi**

Una API que permite un estado dinamico en el manejo de la base de datos y manejo de productos

Se realizó una API restfull que consume una base de datos otorgada por bsale.
 
Las tablas de la base de datos son :

**products:**

-id 

-name 

-url_image 

-precio 

-descuento 

-categoria

Se relaciona a otra tabla llamada categorías el cual me da: 

**category:**


-id 

-name


**Manejo de errores**

Ante el ingreso de datos erroneo tenemos una resolución y anticipación a un gran número de ingresos
de datos perjudiciales para la API.
Las peticiones y querys deben cumplir con las siguientes estructuras

```
Dominio

    -https://salva-bsale-api.herokuapp.com/

Al dominio le ingresamos los siguientes EndPoints:

    -/products => Productos

    -/category => Categorías

Para realizar filtración de productos:

  Para que tengan valor estos filtros luego de un EndPoint comolamos "?" luego las Querys que presentamos a continuación.

    -limit = N  =>Cualquier numero entero positivo.

    -order = name, price => Esto permite ordenarlos por sus nombres o precios de menor a mayor.

    -sort  = asc, desc => Si se quiere ordenar los datos de mayor a menor se pasa el sort=desc.

    -desc = si => Al usarlo como Key y no como valor me permite hacer una pretición de productos con descuentos.

    -/category/id/products =>

  NOTA: las filtraciones de datos se puedes personalizar usando mas de un filtro y esto se logra colocando & entre ellos ejemplo:
  
    -/category/2/products?order=name&sort=desc&desc=si => Todos los productos de la categoria 2 ordenados por su nombre de la Z a la A solo si tienen descuentos.
   

```



**EndPoints** 

`Get  /productos`

**Todos los productos**

Al hacer una petición a este endpoint me devuelve un array con todos los productos en la base de datos.


```
[ 
  { "id": 5,
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
  ... 
]

```
**Un producto en especifico**

``Get /products/8`` 

Al hacer una petición a este endpoint me trae el producto que tenga el ID especificado en este caso el producto de id = 8 
```
{ 
  "name": "PISCO ALTO DEL CARMEN 35º",
  "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/alto8532.jpg",
  "subtotal": 7990,
  "discount": 10,
  "price": 7980,
  "category": "pisco"
}
```

**Limite de productos y Querys**

**Querys**

``Get /products?limit=2``

Al agregarle esta Query me permite traer un limite de N cantidad de productos en este caso 2

```
[ 
  { "id": 5,
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
  }
]
```

**Descuentos**


``Get /products?desc=si``

En esta query se le pasa de parámetro un ``desc=si``, esto hará que la aplicación me devuelva todos los productos que tengan algun tipo de descuentos.

```
[ 
  { "id": 5,
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

**Ordenar y Filtrar**

Este caso tiene una peculiaridad la cual es que se le puede pasar el valor por el cual se desea ordenar
ya sea por el **precio** o el **nombre** pero no es requerido poner si se desea ordenar de manera ascendente o descendente.
La aplicación por defecto asigna el valor de **ascendente**

**Order**

``Get /products?order=name``

```
[ 
  { 
  "id": 104,
  "name": "ABSOLUT",
  "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/absolut21381.png",
  "price": 8990,
  "discount": 30,
  "category": 7 
  }, 
  { "id": 68,
  "name": "Bebida Sprite 1 Lt",
  "url_image": null,
  "price": 1250,
  "discount": 10,
  "category": 4
  },
  ... 
]
```

**Sort**

``Get /products?order=name&sort=desc``


Si no queremos ordenar los productos de manera ascendente tenemos esta otra query la cual para poder usarla usamos Ampersand y le paramos **sort = des**.
Esto nos devolverá todos los productos ordenamos de manera descendente teniendo en cuenta el tipo de dato por el cual se ordena ya sea nombre o precio.
```
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

**importante**

Las Querys se pueden usar con otras Querys un ejemplo es este

``Get /products?limit=3&order=name&sort=desc`` 

Esto nos devolverá un limite de 3 productos ordenadas por su nombre en manera descendente.

```
[ 
  { "id": 5,
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


**Category**

**Todas las categorías**

``Get /category`` 

Al hacer una peticion a este endpoint me devuelve un array con todos las categorías en la base de datos.
```
[
  { "id": 1, "name": "bebida energetica" },
  { "id": 2, "name": "pisco" },
  { "id": 3, "name": "ron" },
  { "id": 4, "name": "bebida" },
  { "id": 5, "name": "snack" },
  { "id": 6, "name": "cerveza" },
  { "id": 7, "name": "vodka" } 
]
```
**Una categoría en especifico**

``Get /category/5``

Al hacer una peticion a este endpoint me trae la categoria que tenga el ID especificado en este caso la categoria de id = 5

```{ [ { "id": 5, "name": "snack" } ] ```

**Todos los productos de una misma categoria**
``Get /category/2/products`` 

Al hacer una peticion a este endpoint me trae todos los productos que tengan la categoria asignada.
```
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

**filtrar**

``Get /category/2/products?desc=si``
Al hacer esta Query me trae todos los productos que tengan la categoría asignada y que también tengan algún tipo de descuento.

```
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

**Tech stack** 

-Nodejs 

-Expressjs 

-MySQL2
