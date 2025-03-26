// Manejo de pantallas
function cambiarPantalla(id) {
  document.querySelectorAll('.pantalla').forEach(p => p.classList.remove('activo'));
  document.getElementById(id).classList.add('activo');
}

// Obtener ubicación GPS
function obtenerUbicacion() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      const coords = `${pos.coords.latitude}, ${pos.coords.longitude}`;
      document.getElementById('ubicacion').value = coords;
      localStorage.setItem('ultimaUbicacion', coords); // Guarda la ubicación
    }, () => {
      alert('Error al obtener ubicación');
    });
  } else {
    alert('La geolocalización no es compatible.');
  }
}

// Previsualizar imágenes
function previewImages(event) {
  const preview = document.getElementById('preview');
  preview.innerHTML = '';
  [...event.target.files].forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = document.createElement('img');
      img.src = e.target.result;
      preview.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
}

// Guardar cliente en localStorage
document.getElementById('clienteForm').addEventListener('submit', e => {
  e.preventDefault();

  const cliente = {
    nombre: document.getElementById('nombre').value,
    cedula: document.getElementById('cedula').value,
    direccion: document.getElementById('direccion').value,
    ubicacion: document.getElementById('ubicacion').value,
    telefono: document.getElementById('telefono').value,
    fotos: [] // Las fotos requieren lógica adicional para almacenamiento
  };

  const clientes = JSON.parse(localStorage.getItem('clientes') || '[]');
  clientes.push(cliente);
  localStorage.setItem('clientes', JSON.stringify(clientes));

  alert('Cliente guardado con éxito.');
  e.target.reset();
  document.getElementById('preview').innerHTML = '';
});

// Buscar clientes
function buscarClientes() {
  const termino = document.getElementById('buscarCliente').value.toLowerCase();
  const clientes = JSON.parse(localStorage.getItem('clientes') || '[]');
  const resultado = clientes.filter(c => c.nombre.toLowerCase().includes(termino));

  const listaClientes = document.getElementById('listaClientes');
  listaClientes.innerHTML = resultado.map((c, i) =>
    `<div onclick="mostrarDetalles(${i})">${c.nombre}</div>`
  ).join('');
}

// Mostrar detalles del cliente
function mostrarDetalles(index) {
  const clientes = JSON.parse(localStorage.getItem('clientes') || '[]');
  const c = clientes[index];

  document.getElementById('detalleCliente').innerHTML = `
    <p><strong>Nombre:</strong> ${c.nombre}</p>
    <p><strong>Cédula:</strong> ${c.cedula}</p>
    <p><strong>Dirección:</strong> ${c.direccion}</p>
    <p><strong>Ubicación:</strong> ${c.ubicacion}</p>
    <p><strong>Teléfono:</strong> ${c.telefono}</p>
  `;
  cambiarPantalla('detalles');
}

// Mostrar todos los clientes al abrir la lista
document.getElementById('lista').addEventListener('transitionstart', buscarClientes);
