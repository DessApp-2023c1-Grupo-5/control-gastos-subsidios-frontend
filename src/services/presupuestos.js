import {
  presupuestoPrueba,
  presupuestoPruebaPendiente,
  presupuestoPruebaAprobado,
  rubros,
} from '../constants/constants';
import {
  getAllGastosPorRubroPendiente,
  getAllGastosPorRubroAprobado,
} from './compras';

//falta Service de PresupuestoEnBack
export function getPresupuesto() {
  return Promise.resolve(presupuestoPrueba);
}

//incorporar formato y funcion aca de esta manera consumo directamente
export async function getPendiente(idProyecto) {
  let totalSum = 0;
  const valoresAReemplazar = await getAllGastosPorRubroPendiente(idProyecto);
  let valoresAimprimir = presupuestoPruebaPendiente;
  console.log(valoresAReemplazar);
  for (let key in valoresAReemplazar) {
    const lowerCaseKey = key.toLowerCase();
    // Comprobamos si el objeto presupuestoPruebaPendiente tiene la misma propiedad
    // eslint-disable-next-line no-prototype-builtins
    if (valoresAimprimir.hasOwnProperty(lowerCaseKey)) {
      // Si es así, reemplazamos el valor
      valoresAimprimir[lowerCaseKey] = valoresAReemplazar[key];
    }
  }
  for (let key in valoresAimprimir) {
    if (typeof valoresAimprimir[key] === 'number') {
      totalSum += valoresAimprimir[key];
    }
  }
  valoresAimprimir.total = totalSum;
  return Promise.resolve(valoresAimprimir);
}
//incorporar formato y funcion aca
export async function getAprobado(idProyecto) {
  let totalSum = 0;
  const valoresAReemplazar = await getAllGastosPorRubroAprobado(idProyecto);
  let valoresAimprimir = presupuestoPruebaAprobado;
  console.log(valoresAReemplazar);
  for (let key in valoresAReemplazar) {
    const lowerCaseKey = key.toLowerCase();
    // Comprobamos si el objeto presupuestoPruebaPendiente tiene la misma propiedad
    // eslint-disable-next-line no-prototype-builtins
    if (valoresAimprimir.hasOwnProperty(lowerCaseKey)) {
      // Si es así, reemplazamos el valor
      valoresAimprimir[lowerCaseKey] = valoresAReemplazar[key];
    }
  }
  for (let key in valoresAimprimir) {
    if (typeof valoresAimprimir[key] === 'number') {
      totalSum += valoresAimprimir[key];
    }
  }
  valoresAimprimir.total = totalSum;
  return Promise.resolve(valoresAimprimir);
}

export async function getRemanente(presupuesto, idProyecto) {
  const valoresAReemplazar = await getAllGastosPorRubroAprobado(idProyecto);
  console.log(valoresAReemplazar);
  const valoresAReemplazar1 = await getAllGastosPorRubroPendiente(idProyecto);
  console.log(valoresAReemplazar1);
  let totalSum = 0;

  if (!valoresAReemplazar || valoresAReemplazar1) {
    for (let key in valoresAReemplazar) {
      if (typeof valoresAReemplazar[key] === 'number') {
        totalSum += valoresAReemplazar[key];
      }
    }
    for (let key in valoresAReemplazar1) {
      if (typeof valoresAReemplazar1[key] === 'number') {
        totalSum += valoresAReemplazar1[key];
      }
    }
    return presupuesto.total - totalSum;
  }
}

export function getRubros() {
  return rubros;
}
