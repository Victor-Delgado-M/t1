"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios")); // Importa Axios para hacer solicitudes HTTP
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('REST service is running');
});
// Ruta para obtener la data del otro servicio REST
app.get('/external-data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Realiza una solicitud al servicio REST del otro proyecto
        const response = yield axios_1.default.get('URL_DEL_SERVICIO_REST_DEL_OTRO_PROYECTO');
        const data = response.data; // Obtén los datos de la respuesta
        res.json(data); // Devuelve los datos obtenidos al cliente
    }
    catch (error) {
        res.status(500).send('Error fetching data from external service');
    }
}));
// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
