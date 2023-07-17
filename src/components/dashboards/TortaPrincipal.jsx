import { Doughnut } from 'react-chartjs-2';
import React from 'react';
import { montoDisponible, nivelDeEjecucion } from '../../utils/presupuestos'
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import { getPresupuesto } from '../../services/presupuestos.js';
import { getComprasByProyecto } from '../../services/compras.js';
import { calculateTotalExpenses } from '../../utils/presupuestos';



export default function TortaPrincipal({ presupuesto, totalGastos, totalPresupuesto, setIdProyecto, idProyecto }) {


  const totalDisponible = presupuesto; //ToDo - Ver si esta bien tener en una misma prop el presupuesto total y las reformulaciones.
  const monto = montoDisponible(totalPresupuesto, totalGastos)
  const ejecucion = nivelDeEjecucion(totalPresupuesto, totalGastos);
  const $ = useStyles();
  const [setPresupuesto] = useState(null);


  const [setTotalGastos] = useState(null);
  const [comprasRealizadas, setComprasRealizadas] = useState(null);

  useEffect(() => {
    async function fetchPrespuesto() {
      try {
        const id = sessionStorage.getItem('idProyecto');
        setIdProyecto(id);
        const presupuesto = await getPresupuesto();


        const compras = await getComprasByProyecto(idProyecto);
        const gastos = calculateTotalExpenses(compras);
        setTotalGastos(gastos);
        setComprasRealizadas(comprasRealizadas);
        setPresupuesto(presupuesto);


      } catch (err) {
        console.log('ERROR USE EFFECT : ' + err);
        //ToDo: Manejo de errores
      }
    }
    fetchPrespuesto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const datosAConsumir = (({
    insumos,

    bibliografia,

    publicaciones,

    viaticos,

    equipamiento,

    tecnico,

    administracion,


  }) => ({
    insumos,

    bibliografia,

    publicaciones,

    viaticos,

    equipamiento,

    tecnico,

    administracion,


  }))(totalDisponible, monto, ejecucion);

  const graficoTorta = (

    <Doughnut className={$.graficoTor}
      data={{
        labels: Object.keys(datosAConsumir).map(key => {
          return key;
        }),
        datasets: [
          {
            label: 'Presupuesto',

            backgroundColor: [
              '#56e2cf',
              '#cf56e2',
              '#56aee2',
              '#e2cf56',
              '#e25668',
              '#8a56e2',
              '#e28956',
            ],

            data: [
              totalDisponible.insumos,

              totalDisponible.publicaciones,
              totalDisponible.bibliografia,
              totalDisponible.viaticos,
              totalDisponible.equipamiento,
              totalDisponible.tecnico,
              totalDisponible.administracion,
            ],

          },



        ],






      }}
      options={{
        legend: { display: true },
        title: { display: true, text: `Estado actual del presupuesto` },


      }}
    />

  );



  return (<>

    {graficoTorta}


  </>
  );

}



const useStyles = makeStyles({
  graficoTor: {
    display: 'inline-flex',
    alignContent: 'center',
    justifyContent: 'space-between',





  },

});