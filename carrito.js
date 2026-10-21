

let carrito = JSON.parse(localStorage.getItem('carritoSoley')) || [];

function actualizarContadorMenu() {
    const enlacesCarrito = document.querySelectorAll('.nav-carrito');
    const totalArticulos = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    
    enlacesCarrito.forEach(enlace => {
        enlace.textContent = `Carrito (${totalArticulos})`;
    });
}

function agregarAlCarrito(evento) {
    const boton = evento.target;
    const id = boton.getAttribute('data-id');
    const nombre = boton.getAttribute('data-nombre');
    const precio = parseFloat(boton.getAttribute('data-precio'));

    const productoExistente = carrito.find(item => item.id === id);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ id, nombre, precio, cantidad: 1 });
    }

    guardarCarrito();
    actualizarContadorMenu();
    alert(`¡Agregaste "${nombre}" a tu carrito! ♥`);
}

function guardarCarrito() {
    localStorage.setItem('carritoSoley', JSON.stringify(carrito));
}

function renderizarCarrito() {
    const tbody = document.getElementById('tbody-carrito');
    const contenedorTotal = document.getElementById('total-carrito');
    
    if (!tbody || !contenedorTotal) return; 

    tbody.innerHTML = ''; 
    let totalPagar = 0;

    if (carrito.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5">Tu carrito está vacío. ¡Anímate a llevar algo hermoso!</td></tr>';
        contenedorTotal.textContent = 'Total a Pagar: $0 COP';
        return;
    }

    carrito.forEach((producto) => {
        const subtotal = producto.precio * producto.cantidad;
        totalPagar += subtotal;

        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>
                <button class="btn-cantidad" onclick="cambiarCantidad('${producto.id}', -1)">-</button>
                ${producto.cantidad}
                <button class="btn-cantidad" onclick="cambiarCantidad('${producto.id}', 1)">+</button>
            </td>
            <td>$${producto.precio.toLocaleString('es-CO')} COP</td>
            <td>$${subtotal.toLocaleString('es-CO')} COP</td>
            <td><button class="btn" style="background-color: #e74c3c; padding: 5px 10px; margin-top:0;" onclick="eliminarDelCarrito('${producto.id}')">X</button></td>
        `;
        tbody.appendChild(fila);
    });

    contenedorTotal.textContent = `Total a Pagar: $${totalPagar.toLocaleString('es-CO')} COP`;
}

function cambiarCantidad(id, cambio) {
    const producto = carrito.find(item => item.id === id);
    if (producto) {
        producto.cantidad += cambio;
        if (producto.cantidad <= 0) {
            eliminarDelCarrito(id);
        } else {
            guardarCarrito();
            renderizarCarrito();
            actualizarContadorMenu();
        }
    }
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    guardarCarrito();
    renderizarCarrito();
    actualizarContadorMenu();
}


function enviarPedidoWhatsApp() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío, agrega productos antes de comprar.");
        return;
    }

    let mensaje = "Hola Confecciones Soley ♥, me gustaría realizar el siguiente pedido:%0A%0A";
    let total = 0;

    carrito.forEach(prod => {
        let subtotal = prod.precio * prod.cantidad;
        total += subtotal;
        mensaje += `- ${prod.cantidad}x ${prod.nombre} ($${subtotal.toLocaleString('es-CO')})%0A`;
    });

    mensaje += `%0A*Total a pagar: $${total.toLocaleString('es-CO')} COP*`;
    

    const numeroWhatsApp = "573143103466"; 
    window.open(`https://wa.me/${numeroWhatsApp}?text=${mensaje}`, '_blank');
}


document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorMenu();
    renderizarCarrito();

    const botonesAgregar = document.querySelectorAll('.btn-agregar');
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito);
    });
});