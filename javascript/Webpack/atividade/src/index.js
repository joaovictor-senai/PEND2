import { converterTemperatura } from "./temperatura.js";

const temperatura = 25;
const resultado = converterTemperatura(temperatura);

console.log(`${temperatura}°C = ${resultado}°F`);