const btnCart = document.querySelector('.container_cart_icon');
const containerCartProducts = document.querySelector('.container_cart_products');
/* 
    *con el classlist y el .toggle lo que hacemos es que le podemos asignar una clase a otra para que tenga una lista de clases
    *en este caso es para hacer que aparezca el carrito en pantalla cuando se de click 
*/
btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden_cart')
})

/* 
todo ======================================================================================================================================
 */
const cartInfo = document.querySelector('.cart_product');
const rowProduct = document.querySelector('.row_product');
const cartEmpty = document.querySelector('.cart_empty');
const cartTotal = document.querySelector('.cart_total');
/* 
    ?Lista de todos los contenedores de productos 
*/

const productList =document.querySelector('.container_items');

/* 
    ?variable de arreglos de productos
    *así declaramos un arreglo 
*/
let allProducts = [];

const totalPagar = document.querySelector('.total_pagar');

const countProduct = document.querySelector('#contadorProductos');
/* 
    *con el addEventListener es un evento le pasamos una acción ('click')y un evento en este caso le pasamos un evento de tipo flecha 
    *la e se podría considerar como una especie de evento incluido a una función
*/
productList.addEventListener('click', e =>{
    /* 
    *con el .target lo que hacemos es mostrar el contenido que hay en el html y muestra tambien su contenedor */
    /* 
    *con el .target.classList lo que hacemos es ver las listas de clase que tiene el elemento */
    /* 
    *con el .target.classList.contains('price') lo que hacemos es comparar si el elemento al que hacemos click tiene la clase que nosotros escribamos
    *y si la tiene devuelve un true si no un false */
    console.log(e.target.classList.contains('btn_add_cart'));
    
    if(e.target.classList.contains('btn_add_cart')){
        /* //*con el e.target.parentElement lo que hacemos es que llamamos al padre contenedor del elemento al que damos click */
        console.log(e.target.parentElement);
        const product = e.target.parentElement;
        /* //*con el product.querySelector('h2') lo que hacemos es que seleccionamos el contenedor del que queremos saber la información y
        *con el product.querySelector('h2').textContent lo que hacemos es que solo traemos el contenido que hay dentro del contenedor que 
        *nosotros seleccionamos*/
        console.log(product.querySelector('h2').textContent);
        
        /* 
          ?  creamos un objeto const infoProduct ={
            quantity: ,
            title: ,
            price:
          }
           * lo que hacemos es que cuanto damos click el infoProduct va a almacenar los datos del producto al que demos click
           * la cantidad por defecto sería 1 el titulo será llamado por medio del product.querySelector('h2').textContent declarado
           * anteriormente lo mismo el precio
        */
        const infoProduct ={
            quantity:1,
            title: product.querySelector('h2').textContent,
            price: product.querySelector('p').textContent
        }
        console.log(infoProduct);
        /* 
            !con el operador spread (...) lo que hacemos es que hacemos que se esparzan la cantidad de elementos
            !en el nuevo arreglo y aparte que agregue la siguiente informacion tambien en el nuevo arreglo
            *vamos tambien a hacer una constante para poder hacer que solo aumente el numero y no la cantidad
        */
        //*con el allProducts.some podemos saber si dentro de un arreglo ya existe un objeto, variable, etc que este repetido
        //*allProducts.some(product => product.title === infoProduct.title) de esta manera comprobamos si el titulo se repite esto devuelve un true o false
        const exist = allProducts.some(product => product.title === infoProduct.title);
        console.log(exist);
        if (exist){
            /* 
             *map() crea un nuevo array con los resultados de la llamada a la función indicada y es aplicado a cada uno de sus elementos
            */
            const products = allProducts.map(product =>{
                if(product.title === infoProduct.title){
                    product.quantity++;
                    return product;
                }else{
                    return product;
                }
            })
            allProducts = [...products];
        }else{
            allProducts = [...allProducts, infoProduct];
        }
        
        /* 
        !Añadimos la funcion showHTML que declaramos abajo para que cuando hagamos click nos muestren los productos
        */
        showHTML();
    }
    console.log(allProducts);
});

/* 
    ?   Funcion tipo flecha para mostrar los productos en el HTML
    *const showHTML = () => {

    *}
*/

/* 
todo==========================================================================================================================
!Evento para borrar los productos
*/

rowProduct.addEventListener('click', (e) =>{
    if(e.target.classList.contains('icon-close')){
        const product = e.target.parentElement;
        const title = product.querySelector('p').textContent;
        allProducts = allProducts.filter(product => product.title !== title);
    }
    console.log(allProducts);
    showHTML();
})

const showHTML = () => {
    /* 
        *dentro creamos otra funcion para poder añadir los productos
        *allProducts.forEach(product =>{
            !esta funcion es para que a cada uno de los productos que estan en el arreglo se le realicen los cambios que hagamos dentro
        *}
        todo= importante limpiar el rowProduct para que no se nos vayan aumentando la cantidad de productos que vamos agregando 
    */
   
    if (!allProducts.length){
        cartEmpty.classList.remove('hidden');
        rowProduct.classList.add('hidden');
        cartTotal.classList.add('hidden');
    } else {
        cartEmpty.classList.add('hidden');
        rowProduct.classList.remove('hidden');
        cartTotal.classList.remove('hidden');
    }

    rowProduct.innerHTML ='';
    let total = 0;
    let totalOfProducts =0;
    allProducts.forEach(product =>{
        /* //*instanciamos un div y lo creamos
            //*le damos una clase con el containerProduct.classList.add('cart_product');
            //*lo agregamos al html con el .innerHTML y le ponemos la estructura que teniamos en el HTML usando los templates Strings (``) para poder interpolar variables
            //*y por ultimo la agregamos a la clase rowproduct con el "rowProduct.append(containerProduct)"   
        */
        const containerProduct= document.createElement('div');
        containerProduct.classList.add('cart_product');
        containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-close"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        `
        rowProduct.append(containerProduct);
        // *con el .slice() lo que hacemos es que seleccionamos la posicion desde la que queremos empezar a contar de nuestra variable
        //* en este caso es desde la posicion (1) para que no tome el $
        total = total+parseInt(product.quantity*product.price.slice(1))
        totalOfProducts = totalOfProducts + product.quantity;
    })

    totalPagar.innerText = `$${total}`;
    countProduct.innerText = totalOfProducts;


}