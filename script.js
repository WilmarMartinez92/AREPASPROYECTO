let loadMoreBtn = document.querySelector("#load-more");
let currentItem = 4;

loadMoreBtn.onclick = () => {
    
    let boxes = [...document.querySelectorAll(".box-container .box")];
    for(var i = currentItem; i< currentItem + 4; i++) {
        boxes[i].style.display = "inline-block";
    }
    currentItem += 4;
    if(currentItem >= boxes.length) {
        loadMoreBtn.style.display = "none"
    }

}

//carrito

// Selección de elementos del DOM
const carrito = document.getElementById("carrito");
const elementos1 = document.getElementById("lista-1");
const lista = document.querySelector("#lista-carrito tbody");
const btnVaciarCarrito = document.getElementById("vaciar-carrito");
const totalElement = document.getElementById("total"); // Elemento para mostrar el total

// Cargar los event listeners
cargarEventListeners();

function cargarEventListeners() {
    if (elementos1) {
        elementos1.addEventListener("click", comprarElemento);
    }
    if (carrito) {
        carrito.addEventListener("click", eliminarElemento);
    }
    if (btnVaciarCarrito) {
        btnVaciarCarrito.addEventListener("click", vaciarCarritoBtn);
    }
}

// Función para manejar la compra de un elemento
function comprarElemento(e) {
    e.preventDefault();

    if (e.target.classList.contains("agregar-carrito")) {
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

// Leer datos del elemento seleccionado
function leerDatosElemento(elemento) {
    const infoElemento = {
        imagen: elemento.querySelector("img").src,
        titulo: elemento.querySelector("h3").textContent,
        precio: parseFloat(elemento.querySelector(".precio").textContent.replace('$', '')), // Convertir a número
        id: elemento.querySelector("a").getAttribute("data-id")
    };
    insertarCarrito(infoElemento);
}

// Insertar elemento en el carrito
function insertarCarrito(elemento) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>
            <img src="${elemento.imagen}" width=100 />
        </td>
        <td>
            ${elemento.titulo}
        </td>
        <td>
            $${elemento.precio}
        </td>
        <td>
            <a href="#" class="borrar" data-id="${elemento.id}">x</a>
        </td>
    `;

    lista.appendChild(row);
    actualizarTotal(); // Actualizar el total al añadir un nuevo producto
}

// Eliminar un elemento del carrito
function eliminarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains("borrar")) {
        e.target.parentElement.parentElement.remove();
        actualizarTotal(); // Actualizar el total al eliminar un producto
    }
}

// Función para vaciar el carrito
function vaciarCarritoBtn() {
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    actualizarTotal(); // Actualizar el total al vaciar el carrito
    return false;
}

// Función para calcular y actualizar el total
function actualizarTotal() {
    let total = 0;

    const filas = lista.querySelectorAll("tr");
    filas.forEach(fila => {
        const precio = parseFloat(fila.children[2].textContent.replace('$', ''));
        total += precio;
    });

    totalElement.textContent = `Total: $${total.toFixed(2)}`;
}

function formatearMoneda(valor) {
    return valor.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).replace('COP', '').trim();
}


// Registro nuevos usuarios :

document.getElementById('registro-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const direccion = document.getElementById('direccion').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/api/registro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, apellido, direccion, email, password })
    })
    .then(response => response.json())
    .then(data => {
        const mensaje = document.getElementById('mensaje');
        if (data.error) {
            mensaje.textContent = data.error;
            mensaje.style.color = 'red';
        } else {
            mensaje.textContent = data.mensaje;
            mensaje.style.color = 'green';
        }
    })
    .catch(error => console.error('Error:', error));
});


db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

const sql = 'INSERT INTO usuarios (nombre, apellido, direccion, email, password) VALUES (?, ?, ?, ?, ?)';
db.query(sql, [nombre, apellido, direccion, email, hashedPassword], (err, result) => {
    if (err) {
        console.error('Error al registrar el usuario:', err);
        res.status(500).json({ error: 'Error al registrar el usuario' });
    } else {
        console.log('Usuario registrado con éxito');
        res.json({ mensaje: 'Usuario registrado con éxito' });
    }
});


