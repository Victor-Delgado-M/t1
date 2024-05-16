import readline from 'readline';

// Definición de las interfaces
interface Cliente {
  id: number;
  nombre: string;
}

interface Producto {
  id: number;
  nombre: string;
  precio: number;
}

interface Factura {
  id: number;
  clienteId: number;
  productos: Producto[];
}

// Datos de clientes
const clientes: Cliente[] = [
  { id: 1, nombre: "Matt" },
  { id: 2, nombre: "Luber" },
  { id: 3, nombre: "Erick" },
  { id: 4, nombre: "Piloso" },
  { id: 5, nombre: "Edwin" },
];

// Datos de productos
const productos: Producto[] = [
  { id: 1, nombre: "Telefono", precio: 10 },
  { id: 2, nombre: "Laptop", precio: 20 },
  { id: 3, nombre: "Cpu", precio: 30 },
  { id: 4, nombre: "Monitor", precio: 40 },
  { id: 5, nombre: "Mouse", precio: 50 },
];

// Datos de facturas
const facturas: Factura[] = [
  { id: 1, clienteId: 1, productos: [productos[0], productos[1]] },
  { id: 2, clienteId: 2, productos: [productos[2], productos[3]] },
  { id: 3, clienteId: 3, productos: [productos[4]] },
  { id: 4, clienteId: 4, productos: [productos[0], productos[2], productos[4]] },
  { id: 5, clienteId: 5, productos: [productos[1], productos[3]] },
];

// Función para mostrar todas las facturas
function mostrarTodasLasFacturas() {
  console.log("Mostrando todas las facturas:");
  facturas.forEach((factura: Factura) => {
    console.log(`Factura ID: ${factura.id}, Cliente ID: ${factura.clienteId}`);
    const cliente = clientes.find(c => c.id === factura.clienteId);
    console.log(`Cliente: ${cliente ? cliente.nombre : 'Cliente no encontrado'}`);
    console.log("Productos en la factura:");
    factura.productos.forEach((p: Producto) => {
      console.log(`  Producto: ${p.nombre}, Precio: $${p.precio}`);
    });
    console.log("-----");
  });
}

// Función para mostrar datos con diferentes ciclos
function mostrarDatosConCiclos() {
  console.log('Mostrando Clientes con forEach:');
  clientes.forEach(cliente => {
    console.log(`Cliente ID: ${cliente.id}, Nombre: ${cliente.nombre}`);
  });

  console.log('\nMostrando Productos con for...of:');
  for (const producto of productos) {
    console.log(`Producto ID: ${producto.id}, Nombre: ${producto.nombre}, Precio: ${producto.precio}`);
  }

  console.log('\nMostrando Facturas con for...in:');
  for (const index in facturas) {
    if (facturas.hasOwnProperty(index)) {
      const factura = facturas[index];
      console.log(`Factura ID: ${factura.id}, Cliente ID: ${factura.clienteId}`);
      console.log('Productos de la Factura:');
      factura.productos.forEach(producto => {
        console.log(`  Producto: ${producto.nombre}, Precio: ${producto.precio}`);
      });
    }
  }
}

// Función para buscar factura por ID
function buscarFacturaPorId(id: number, callback: (factura?: Factura, cliente?: Cliente) => void): void {
  const factura = facturas.find(f => f.id === id);
  if (factura) {
    const cliente = clientes.find(c => c.id === factura.clienteId);
    callback(factura, cliente);
  } else {
    callback();
  }
}

// Función para consumir un servicio REST
async function consumirServicioREST() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    if (!response.ok) {
      throw new Error('Error al obtener los datos.');
    }
    const data = await response.json();
    console.log("\nDatos del servicio REST:");
    console.log(data);
  } catch (error) {
    console.error("\nError al consumir el servicio REST:", error);
  }
}

// Menú interactivo
function mostrarMenu() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log("\nSeleccione una opción:");
  console.log("1: Mostrar todas las facturas");
  console.log("2: Mostrar datos con diferentes ciclos");
  console.log("3: Buscar factura por ID");
  console.log("4: Consumir servicio REST");
  console.log("5: Salir");

  rl.question('Opción: ', (opcion) => {
    switch (opcion) {
      case '1':
        mostrarTodasLasFacturas();
        rl.close();
        setTimeout(mostrarMenu, 1000); // Usar setTimeout para asegurar que rl se cierra antes de reabrir
        break;
      case '2':
        mostrarDatosConCiclos();
        rl.close();
        setTimeout(mostrarMenu, 1000); // Usar setTimeout para asegurar que rl se cierra antes de reabrir
        break;
      case '3':
        rl.question('Ingrese el ID de la factura que desea buscar: ', (input: string) => {
          const id = parseInt(input.trim(), 10);
          if (!isNaN(id)) {
            buscarFacturaPorId(id, (factura, cliente) => {
              if (factura && cliente) {
                console.log(`Factura encontrada: ID ${factura.id}`);
                console.log(`Cliente: ${cliente.nombre} (ID ${cliente.id})`);
                console.log('Productos en la factura:');
                factura.productos.forEach((p: Producto) => {
                  console.log(`${p.nombre} - $${p.precio}`);
                });
              } else {
                console.log('Factura no encontrada');
              }
              rl.close();
              setTimeout(mostrarMenu, 1000); // Usar setTimeout para asegurar que rl se cierra antes de reabrir
            });
          } else {
            console.log('ID inválido. Por favor, ingrese un número.');
            rl.close();
            setTimeout(mostrarMenu, 1000); // Usar setTimeout para asegurar que rl se cierra antes de reabrir
          }
        });
        break;
      case '4':
        consumirServicioREST().then(() => {
          rl.close();
          setTimeout(mostrarMenu, 1000); // Usar setTimeout para asegurar que rl se cierra antes de reabrir
        });
        break;
      case '5':
        console.log("Saliendo...");
        rl.close();
        break;
      default:
        console.log("Opción no válida.");
        rl.close();
        setTimeout(mostrarMenu, 1000); // Usar setTimeout para asegurar que rl se cierra antes de reabrir
        break;
    }
  });
}

mostrarMenu();
