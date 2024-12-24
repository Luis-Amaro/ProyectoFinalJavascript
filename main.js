document.getElementById("carritoicon").addEventListener("click", ()=>{
    document.getElementById("carrito-conteiner").classList.toggle("on")})


let carrito = JSON.parse(localStorage.getItem ("carrito")) || []
const ProductosTienda = document.getElementById("productos-tienda")
const carritoContainer = document.getElementById("carrito");
const totalElement = document.getElementById("total");
const Finalizarcompra = document.getElementById("boton-comprar")


const crearcards = (titulo, src, precioproducto) => {
    const container = document.createElement("div")
    container.classList.add("producto")

    const h2 = document.createElement("h2")
    const img = document.createElement("img")
    const precio = document.createElement("p")
    const boton = document.createElement("button")

    container.append(h2, img, precio, boton)

    h2.innerText = titulo
    img.src = src
    precio.innerText = "$" + precioproducto
    boton.innerText = "Comprar"

    boton.addEventListener("click", () => {
        agregarAlCarrito(titulo, precioproducto);
    });

    ProductosTienda.append(container)
}

const agregarAlCarrito = (titulo, precio) => {
    const producto = { titulo, precio };
    carrito.push(producto);
    actualizarCarrito();
};


const eliminarDelCarrito = (index) => {
    carrito.splice(index, 1);
    actualizarCarrito();
};


const actualizarCarrito = () => {
    carritoContainer.innerHTML = "";    
    let total = 0;

    localStorage.setItem("carrito", JSON.stringify(carrito));

    carrito.forEach((producto, index) => {
        const item = document.createElement("div");
        item.classList.add("carrito");
        item.innerHTML = `
            <p>${producto.titulo} - $${producto.precio}</p>
        `;
        const Botoneliminar = document.createElement("button");
        Botoneliminar.innerText = "Eliminar";

    Botoneliminar.addEventListener("click", () => eliminarDelCarrito(index));
    
        item.appendChild(Botoneliminar);

        carritoContainer.appendChild(item);

        total += producto.precio; 
    });

    totalElement.innerText = "Total: $" + total; 
    
};

Finalizarcompra.addEventListener( "click", () => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Quieres confirmar tu compra?",
        text: "Una vez que confirmes no podras vovler a atrás!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, confirmar!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          carrito = []
          actualizarCarrito()
          swalWithBootstrapButtons.fire({
            title: "Confiramdo!",
            text: "Tu compra se ha relizado con exito.",
            icon: "success",  
          });
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelada",
            text: "Tu compra fue cancelada",
            icon: "error"
          });
        }
      });
      
})


document.addEventListener("DOMContentLoaded", async () => {
const response = await fetch ("./data.json")
const data = await response.json()

data.map(el => {
    crearcards(el.nombre, el.img, el.precio)
})

});

