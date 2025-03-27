// === Firebase SDK desde CDN ===
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// === Configuración REAL de tu proyecto Firebase ===
const firebaseConfig = {
  apiKey: "AIzaSyAfw_ylIP5_3RdETbuNkf5rVIU0TgXkKn4",
  authDomain: "clavos-mauro.firebaseapp.com",
  projectId: "clavos-mauro",
  storageBucket: "clavos-mauro.firebasestorage.app",
  messagingSenderId: "332372330619",
  appId: "1:332372330619:web:76b76547d6a51f17dc3ade"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// === Cambiar pantalla ===
function cambiarPantalla(id) {
  document.querySelectorAll('.pantalla').forEach(p => p.classList.remove('activo'));
  document.getElementById(id).classList.add('activo');
}

// === Obtener ubicación GPS ===
function obtenerUbicacion() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      const coords = `${pos.coords.latitude}, ${pos.coords.longitude}`;
      document.getElementById('ubicacion').value = coords;
      localStorage.setItem('ultimaUbicacion', coords);
    }, () => {
      alert('Error al obtener ubicación');
    });
  } else {
    alert('La geolocalización no es compatible.');
  }
}

// === Previsualizar imágenes ===
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

// === Guardar cliente en localStorage y Firestore ===
document.getElementById('clienteForm').addEventListener('submit', async e => {
  e.preventDefault();

  const cliente = {
    nombre: document.getElementById('nombre').value,
    cedula: document.getElementById('cedula').value,
    direccion: document.getElementById('direccion').value,
    ubicacion: document.getElementById('ubicacion').value,
    telefono: document.getElementById('telefono').value,
    fotos: [] // Podés implementar fotos más adelante con Firebase Storage
  };

  // Guardar en localStorage
  const clientes = JSON.parse(localStorage.getItem('clientes') || '[]');
  clientes.push(cliente);
  localStorage.setItem('clientes', JSON.stringify(clientes));

  // Guardar también en Firestore
  try {
    await addDoc(collection(db, "clientes"), cliente);
    alert("Cliente guardado en Firebase y localStorage.");
  } catch (error) {
    console.error("Error al guardar en Firestore:", error);
    alert("Se guardó localmente, pero falló Firebase.");
  }

  e.target.reset();
  document.getElementById('preview').innerHTML = '';
});

// === Buscar clientes ===
function buscarClientes() {
  const termino = document.getElementById('buscarCliente').value.toLowerCase();
  const clientes = JSON.parse(localStorage.getItem('clientes') || '[]');
  const resultado = clientes.filter(c => c.nombre.toLowerCase().includes(termino));

  const listaClientes = document.getElementById('listaClientes');
  listaClientes.innerHTML = resultado.map((c, i) =>
    `<div onclick="mostrarDetalles(${i})">${c.nombre}</div>`
  ).join('');
}

// === Mostrar detalles del cliente ===
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

// === Mostrar lista de clientes cuando se abre ===
document.getElementById('lista').addEventListener('transitionstart', buscarClientes);

// === Exportar funciones globales para botones del HTML ===
window.cambiarPantalla = cambiarPantalla;
window.obtenerUbicacion = obtenerUbicacion;
window.previewImages = previewImages;
