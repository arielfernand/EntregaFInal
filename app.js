const shopContent = document.getElementById('shopContent');
const verCarrito = document.getElementById('verCarrito');
const modalContainer = document.getElementById('modal-container')

let carrito = JSON.parse(localStorage.getItem("CarritoUser"))||[]

/////// TIENDA //////

productos.forEach((product) => {
    let contenedor = document.createElement("div");
    contenedor.className = 'card';
    contenedor.innerHTML = `
    <h3>${product.nombre}</h3>
    <img src= "${product.imagen}">
    <p class= "price">${product.precio} $</p>
    `;
    shopContent.append(contenedor)

    let comprar = document.createElement("button")
    comprar.innerText = 'Agregar al carrito';
    comprar.className = 'comprar';

    contenedor.append(comprar)

    /////////// BOTON AGREGAR A CARRITO


comprar.addEventListener('click', () => {
    ///con some le digo que si encuentra algun poroducto repetido con igual id 
    /// some me devuelve true o folse, si encuentra algo igual me devuelve true

    const repetido = carrito.some((productRepe) => productRepe.id === product.id);
    ///EL MAP recorre el carrito
    if (repetido === true) {
        carrito.map((prod) => {
            if (prod.id === product.id) {
                prod.cantidad++
            }

        })
        localStorage.setItem ('CarritoUser', JSON.stringify(carrito))
        swal.fire({
            title: 'Agregado al carrito',
            text: `Agragaste una unidad mas de ${product.nombre} a tu carrito`,
            icon: 'success',
        })
    } else {
        
        carrito.push({
            id: product.id,
            imagen: product.imagen,
            nombre: product.nombre,
            precio: product.precio,
            cantidad: product.cantidad,

        })
        localStorage.setItem ('CarritoUser', JSON.stringify(carrito))

        swal.fire({
            title: 'Agregado al carrito',
            text: `Agragaste unas ${product.nombre} a tu carrito`,
            icon: 'success',
        })
        console.log(carrito)
    }

})

});

//////////////////////////////////
const pintarCarrito = () => {
    modalContainer.innerHTML = ""
    modalContainer.style.display = "flex"
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
        <h1 class="modal-header-title">Carrito.</h1>
    `;
    modalContainer.append(modalHeader);

    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "x";
    modalbutton.className = "modal-header-button";

    modalbutton.addEventListener('click', () => {
        modalContainer.style.display = "none";
    })
    
    modalHeader.append(modalbutton)

    

    carrito.forEach((product) => {
        let carritoContent = document.createElement("div");
        carritoContent.classname = "modal-content";
        carritoContent.innerHTML = `
        <img src= "${product.imagen}">
        <h3> ${product.nombre}</h3>
        <P>${product.precio} $</p>
        <p>Cantidad: ${product.cantidad}</p>
        <p>Sub total: $${product.cantidad * product.precio}
        
        `;
        modalContainer.append(carritoContent)
        ///creo boton de elminar 
        let eliminar = document.createElement("button");
        eliminar.innerText = "Eliminar";
        eliminar.className = "delete-product";
        carritoContent.append(eliminar);


        eliminar.addEventListener("click", eliminarProducto)
        


    })
    /// este es un acumulador 
    const total = carrito.reduce((acumulador, elemento) => acumulador + elemento.precio * elemento.cantidad, 0);

    const totalCompra = document.createElement("div");
    totalCompra.className = "total-content";
    totalCompra.innerHTML = `Total a pagar: $${total}`;
    modalContainer.append(totalCompra);

    let botonComprar = document.createElement('button');
    botonComprar.innerText = 'Finalizar compra ';
    botonComprar.className = 'buy-button'
    modalContainer.append(botonComprar)
    botonComprar.addEventListener('click', terminarCompra)

};

verCarrito.addEventListener("click", pintarCarrito)


///find me ayuda a encontra el ID del producto que queremos eliminar
///filter filtra todos lo productos del carrito que NO tenga ese ID
/// despues into el carrito sin ese producto
///return carritoId !== foundId/// aca me devuelve todo menos el que tiene el ID

const eliminarProducto = () => {
    const foundId = carrito.find((elemento) => elemento.id);
    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId
        
    })
    pintarCarrito();
    console.log (carrito)
    localStorage.clear();
    localStorage.setItem ('CarritoUser', JSON.stringify(carrito))

    swal.fire({
        title: 'Producto eliminado',
        icon: 'success',
    })
}


// const repetido2 = carrito.some((productRepe) => productRepe.id === carrito.id);
// ///EL MAP recorre el carrito
// if (repetido2 === true) {
//     carrito.map((prod) => {
//         if (prod.id === product.id) {
//             prod.cantidad - 1
//         }
//     })
// }else{
//     eliminarProducto ()
// }



    const terminarCompra = () => {
        swal.fire({
            title: 'gracias por comprar ',
            icon: 'success',
        })
    }
