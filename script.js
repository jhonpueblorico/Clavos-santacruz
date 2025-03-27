<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Clientes Morosos con Geolocalización</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <div id="inicio" class="pantalla activo">
    <h2>Sistema de Clientes Morosos</h2>
    <button onclick="cambiarPantalla('registro')">Registrar Cliente</button>
    <button onclick="cambiarPantalla('lista')">Ver Lista de Clientes</button>
  </div>

  <div id="registro" class="pantalla">
    <h2>Registrar Cliente</h2>
    <form id="clienteForm">
      <input type="text" id="nombre" placeholder="Nombre del cliente" required />
      <input type="text" id="cedula" placeholder="Cédula" required />
      <input type="text" id="direccion" placeholder="Dirección" required />
      <div class="ubicacion-container">
        <input type="text" id="ubicacion" placeholder="Ubicación GPS" readonly required />
        <button type="button" onclick="obtenerUbicacion()">Obtener Ubicación</button>
      </div>
      <input type="tel" id="telefono" placeholder="Teléfono" required />
      <input type="file" id="fotos" multiple accept="image/*" onchange="previewImages(event)" />
      <div id="preview"></div>
      <input type="submit" value="Guardar Cliente" />
    </form>
    <button onclick="cambiarPantalla('inicio')">Volver</button>
  </div>

  <div id="lista" class="pantalla">
    <h2>Lista de Clientes Morosos</h2>
    <input type="text" id="buscarCliente" placeholder="Buscar cliente..." onkeyup="buscarClientes()" />
    <div id="listaClientes"></div>
    <button onclick="cambiarPantalla('inicio')">Volver</button>
  </div>

  <div id="detalles" class="pantalla">
    <h2>Detalles del Cliente</h2>
    <div id="detalleCliente"></div>
    <button onclick="cambiarPantalla('lista')">Volver</button>
  </div>
<script type="module" src="script.js"></script>  <script src="script.js"></script>
</body>
</html>
