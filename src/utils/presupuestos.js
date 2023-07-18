const _ = require('lodash');

const montoDisponible = (presupuesto, gastos) => presupuesto - gastos;

const nivelDeEjecucion = (presupuesto, gastos) => {
  const porcentaje = Number(gastos / presupuesto) * 100;
  const porcentajeRedondado = parseFloat(porcentaje.toFixed(1));
  return porcentajeRedondado;
};

const calculateTotalExpenses = (compras) => {
  const gastos = compras.map((a) => parseInt(a.monto));
  if (gastos.length === 0) {
    return 0;
  }
  return _.sum(gastos || 0);
};

const combinarPresupuestoYRubros = (presupuesto, gastos) => {
  const presupuestoArray = Object.entries(presupuesto)
    .map(([clave, valor]) => {
      if (
        clave !== 'total' &&
        clave !== 'tipo' &&
        clave !== 'fechaInicio' &&
        clave !== 'fechaFin'
      ) {
        return {
          ['rubro']: clave,
          presupuesto: valor,
          gastosAprobados: 0,
          gastosPendientes: 0,
          remanente: valor,
        };
      } else {
        return null;
      }
    })
    .filter((objeto) => objeto !== null);

  const resultado = presupuestoArray.map((itemOriginal) => {
    let itemCombinar = gastos.find(
      (item) => item.rubro.toLowerCase() === itemOriginal.rubro?.toLowerCase()
    );

    if (itemCombinar) {
      itemCombinar.remanente =
        itemOriginal.remanente -
        (itemCombinar.gastosAprobados + itemCombinar.gastosPendientes);

      return Object.assign({}, itemOriginal, itemCombinar);
    }

    return itemOriginal;
  });
  return resultado;
};

export {
  montoDisponible,
  nivelDeEjecucion,
  calculateTotalExpenses,
  combinarPresupuestoYRubros,
};
