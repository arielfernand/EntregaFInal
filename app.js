const shopContent = document.getElementById('shopContent');
const verCarrito = document.getElementById('verCarrito');
const modalContainer = document.getElementById('modal-container')

let carrito = JSON.parse(localStorage.getItem("CarritoUser"))||[]

/////// TIENDA //////
fetch ('./api.json')
.then((Response)=>{
    if (Response.ok){
        return Response.json ();
    }else {
        throw new Error ('hubo un error' + Response.status)
    }
})
.then((jugadores)=>{
    
jugadores.forEach((product) => {
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
   

    const repetido = carrito.some((productRepe) => productRepe.id === product.id);
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
})
.catch((error)=>{
    console.log ('disculpe... mala mia')
})


//////////////////////////////////
const pintarCarrito = () => {
    modalContainer.innerHTML = ""
    modalContainer.style.display = "flex"
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `<h1 class="modal-header-title">Tu carrito de compras</h1>`;
    modalContainer.append(modalHeader);

    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "Salir";
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
        <P>Precio unitario $${product.precio}</p>
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



    const terminarCompra = () => {
       
        carrito.map((prod) => {
        
        swal.fire({
            title: 'Gracias por tu compra',
            text: '' ,
            icon: 'success',
        })
    })
        carrito = []
        localStorage.setItem ('CarritoUser',JSON.stringify (carrito));
        pintarCarrito ()
        modalContainer.style.display = "none";
    }
