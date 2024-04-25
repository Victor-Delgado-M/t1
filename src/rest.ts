// Función para consumir un servicio REST utilizando Fetch con Promises y Async/await
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
  
  // Llamar a la función para consumir el servicio REST
  consumirServicioREST();
  