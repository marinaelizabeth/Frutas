const carrito = document.getElementById('carrito');
const elemento1 = document.getElementById('lista-1');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

// Cargar los event listeners al cargar la página
cargarEventListeners();

function cargarEventListeners() {
    // Escucha los clics en los botones de agregar al carrito
    elemento1.addEventListener('click', comprarElemento);
    // Escucha los clics en los botones de eliminar del carrito
    carrito.addEventListener('click', eliminarElemento);
    // Escucha el clic en el botón de vaciar carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

function comprarElemento(e) {
    e.preventDefault();

    // Verifica si se ha hecho clic en un botón "Agregar" en los productos
    if (e.target.classList.contains('agregar-carrito')) {
        const producto = e.target.closest('.product');  // Encuentra el contenedor del producto
        leerDatosElemento(producto);
    }
}

function leerDatosElemento(elemento) {
    // Obtiene los datos del producto
    const infoElemento = {
        imagen: elemento.querySelector('img').src,  // Corregido 'scr' a 'src'
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id: elemento.querySelector('a').getAttribute('data-id')
    };

    // Inserta el producto en el carrito
    insertarCarrito(infoElemento);
}

// Función para agregar un producto al carrito
function insertarCarrito(elemento) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${elemento.imagen}" width="100">
        </td>
        <td>
            ${elemento.titulo}
        </td>
        <td>
            ${elemento.precio}
        </td>
        <td>
            <a href="#" class="borrar" data-id="${elemento.id}">x</a>
        </td>
    `;
    lista.appendChild(row);
}

function eliminarElemento(e) {
    e.preventDefault();

    // Verifica si el clic fue en un botón de eliminar (eliminando la fila del carrito)
    if (e.target.classList.contains('borrar')) {
        const elemento = e.target.closest('tr');  // Encuentra la fila del carrito
        elemento.remove();  // Elimina la fila del carrito
    }
}

function vaciarCarrito() {
    // Elimina todos los productos del carrito
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    return false;  // Para evitar el comportamiento por defecto del enlace
}