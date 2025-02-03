// Obtener la tabla de carrito
const tablaCarrito = document.getElementById("tabla-carrito").getElementsByTagName('tbody')[0];

// Función para agregar un producto al carrito
function agregarProductoAlCarrito(nombre, precio, cantidad = 1) {
    // Crear una nueva fila para el producto en la tabla de carrito
    const fila = document.createElement("tr");
    fila.innerHTML = `
        <td>${nombre}</td>
        <td>$${precio.toFixed(2)}</td>
        <td>
            <input type="number" value="${cantidad}" min="1" onchange="actualizarCantidad(this)">
        </td>
        <td>$${(precio * cantidad).toFixed(2)}</td>
        <td>
            <button onclick="eliminarProducto(this)">Eliminar</button>
        </td>
    `;

    // Agregar la fila a la tabla de carrito
    tablaCarrito.appendChild(fila);

    // Actualizar el total
    actualizarTotal();
}

// Función para actualizar el total
function actualizarTotal() {
    const totalElement = document.getElementById("total");
    const total = Array.from(tablaCarrito.rows).reduce((acc, fila) => {
        const precio = parseFloat(fila.cells[1].textContent.replace("$", ""));
        const cantidad = parseInt(fila.cells[2].children[0].value);
        return acc + precio * cantidad;
    }, 0);
    totalElement.textContent = total.toFixed(2);
}

// Función para eliminar un producto del carrito
function eliminarProducto(button) {
    const fila = button.closest("tr");
    fila.remove();
    actualizarTotal();
    guardarCarrito();
}

// Función para actualizar la cantidad de un producto en el carrito
function actualizarCantidad(input) {
    const fila = input.closest("tr");
    const precio = parseFloat(fila.cells[1].textContent.replace("$", ""));
    const cantidad = parseInt(input.value);
    fila.cells[3].textContent = `$${(precio * cantidad).toFixed(2)}`;
    actualizarTotal();
    guardarCarrito();
}

// Función para finalizar la compra
function finalizarCompra() {
    alert("Compra finalizada");
    localStorage.removeItem('carrito');
    location.reload();
}

// Función para guardar el carrito en localStorage
function guardarCarrito() {
    const carrito = Array.from(tablaCarrito.rows).map(fila => {
        return {
            nombre: fila.cells[0].textContent,
            precio: parseFloat(fila.cells[1].textContent.replace("$", "")),
            cantidad: parseInt(fila.cells[2].children[0].value)
        };
    });
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para cargar el carrito desde localStorage
function cargarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.forEach(producto => {
        agregarProductoAlCarrito(producto.nombre, producto.precio, producto.cantidad);
    });
}

// Cargar el carrito al abrir la página
cargarCarrito();