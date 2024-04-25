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
// Función para consumir un servicio REST utilizando Fetch con Promises y Async/await
function consumirServicioREST() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://jsonplaceholder.typicode.com/posts/1');
            if (!response.ok) {
                throw new Error('Error al obtener los datos.');
            }
            const data = yield response.json();
            console.log("\nDatos del servicio REST:");
            console.log(data);
        }
        catch (error) {
            console.error("\nError al consumir el servicio REST:", error);
        }
    });
}
// Llamar a la función para consumir el servicio REST
consumirServicioREST();
