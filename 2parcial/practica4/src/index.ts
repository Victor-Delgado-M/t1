import axios from 'axios';
import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000; // Puerto 4000 para tu servicio REST

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Servicio Rest Corriendo');
});

// Ruta para obtener la data del otro servicio REST
app.get('/external-data', async (req: Request, res: Response) => {
  try {
    // Realiza una solicitud al servicio REST del otro proyecto en el puerto 3000
    const response = await axios.get('http://localhost:3000/users');
    const data = response.data; // Obtén los datos de la respuesta
    res.json(data); // Devuelve los datos obtenidos al cliente
  } catch (error) {
    console.error('Error en los datos del otro servicio Rest:', error); 
    res.status(500).send('Error');
  }
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
