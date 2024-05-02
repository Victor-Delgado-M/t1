// Definición de interfaces
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

interface Transaccion {
  id: number;
  descripcion: string;
  monto: number;
}

// Datos de clientes (agregar manualmente)
const clientes: Cliente[] = [
  { id: 1, nombre: "Matt" },
  { id: 2, nombre: "Luber" },
  { id: 3, nombre: "Erick" },
  { id: 4, nombre: "Piloso" },
  { id: 5, nombre: "Edwin" },
];

// Datos de productos (agregar manualmente)
const productos: Producto[] = [
  { id: 1, nombre: "Telefono", precio: 10 },
  { id: 2, nombre: "Laptop", precio: 20 },
  { id: 3, nombre: "Cpu", precio: 30 },
  { id: 4, nombre: "Monitor", precio: 40 },
  { id: 5, nombre: "Mouse", precio: 50 },
];

// Datos de facturas (agregar manualmente)
const facturas: Factura[] = [
  { id: 1, clienteId: 1, productos: [productos[0], productos[1]] },
  { id: 2, clienteId: 2, productos: [productos[2], productos[3]] },
  { id: 3, clienteId: 3, productos: [productos[4]] },
  { id: 4, clienteId: 4, productos: [productos[0], productos[2], productos[4]] },
  { id: 5, clienteId: 5, productos: [productos[1], productos[3]] },
];

// Función para mostrar todas las facturas
function mostrarTodasLasFacturas(): void {
  console.log("Mostrando todas las facturas:");
  facturas.forEach(factura => {
    console.log(`Factura ID: ${factura.id}, Cliente ID: ${factura.clienteId}`);
    const cliente = clientes.find(c => c.id === factura.clienteId);
    console.log(`Cliente: ${cliente ? cliente.nombre : 'Cliente no encontrado'}`);
    console.log("Productos en la factura:");
    factura.productos.forEach(p => {
      console.log(`  Producto: ${p.nombre}, Precio: $${p.precio}`);
    });
    console.log("-----");
  });
}

// Llamada a la función para mostrar las facturas
mostrarTodasLasFacturas();

// Función para agregar 10 transacciones
function agregarTransacciones(): Transaccion[] {
  const transacciones: Transaccion[] = [];
  for (let i = 1; i <= 10; i++) {
    const nuevaTransaccion: Transaccion = {
      id: i,
      descripcion: `Transacción ${i}`,
      monto: Math.random() * 1000, // Monto aleatorio
    };
    transacciones.push(nuevaTransaccion);
  }
  return transacciones;
}

// Llamada a la función para agregar transacciones y mostrarlas
const nuevasTransacciones = agregarTransacciones();
console.log("Transacciones agregadas:");
console.log(nuevasTransacciones);
