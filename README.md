# bsale_storeApi


## **Tech stack** 

    Nodejs 

    Expressjs 

    MySQL2



## Pueden revisar nuestra **[Documentacion](https://github.com/SaLV-inha/bsale_storeApi/blob/main/Documentacion.md/ "Documentacion")**


## **Descripción de la API**

Se realizó una API restfull que permite la lectura de datos.
 
Las entidades de la base de datos son :

| PRODUCTS        | TYPO      |  
|-----------------|:-------------:|
| id              | INT          |  
| name            |STRING        |
| url_image       | STRING       |  
| precio          | FLOAT        | 
| descuento       | FLOAT        |
| categoria       | INT          |

| CATEGORY        | TYPO      |  
|-----------------|:-------------:|
| id              | INT          |    
| name            | STRING       |  



## Dominio

    https://salva-bsale-api.herokuapp.com/

Al dominio le ingresamos los siguientes EndPoints:

    /products => Productos

    /category => Categorías


Las peticiones y querys deben cumplir con las siguientes estructuras:

Para realizar filtración de productos:

  Para que tengan valor estos filtros luego de un EndPoint comolamos "?" 
  luego las Querys que presentamos a continuación.
  
    search = string => Esta cadena de texto que se le pasa a la API debe cumplir ciertas condiciones:
              
             No puede ser menor a 3 caracteres
               
             Si se ingresa una cantidad de caracteres menor a 3 la API me retorna:
             Un status(400) con el siguiente mensaje {"msg": "El minimo de caracteres para realizar una busqueda es de 3"}
               
             En caso de no ser encontrado el producto o que no exista coincidencia la API  me retorna:
             Un status (404) con el siguiente mensaje {"msg": "No se encuentra articulo con /String ingresado/ "}
    
    limit = Number =>Cualquier numero entero positivo.

    order = string (name, price) => Esto permite ordenarlos por sus nombres o precios de menor a mayor.

    sort  = string (asc, desc) => Si se quiere ordenar de manera descendente se pasa el sort=desc.

    desc = string (si) => Al colocar desc=si me permite hacer una pretición de productos con descuentos.

    /category/id/products => Se le pasa un número entero como Id 

  NOTA: Las filtraciones de datos se puedes personalizar usando mas de un filtro y esto se logra 
  colocando & entre ellos ejemplo:
  
    /category/2/products?order=name&sort=desc&desc=si => Todos los productos de la categoria 2 ordenados por su nombre 
                                                          de la Z a la A solo si tienen descuentos.
    
  


## **Manejo de errores**
Ante el ingreso de posibles datos erroneos nuestra API puede loggear esos errores y seguir activa


