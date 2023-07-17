import {
  presupuestoPrueba,
  presupuestoPruebaPendiente,
  presupuestoPruebaAprobado,
  rubros,
} from '../constants/constants';

export function getPresupuesto() {
  return Promise.resolve(presupuestoPrueba);
}

export function getPendiente() {
  return Promise.resolve(presupuestoPruebaPendiente);
}

export function getAprobado() {
  return Promise.resolve(presupuestoPruebaAprobado);
}

export function getRubros() {
  return rubros;
}
