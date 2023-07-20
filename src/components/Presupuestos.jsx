import React from 'react';
import { Footer } from './Footer';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { getPresupuesto } from '../services/presupuestos.js';



import { getPendiente } from '../services/presupuestos.js';
import { getAprobado } from '../services/presupuestos.js';
import { getRemanente } from '../services/presupuestos.js';
      

import { getComprasByProyecto } from '../services/compras.js';

import { useState, useEffect } from 'react';
import Alert from '@material-ui/lab/Alert';
import TortaPrincipal from './dashboards/TortaPrincipal';
import CardMontos from './dashboards/CardMontos';
import { getProyectoById } from '../services/proyectos.js';
import Tabla from './dashboards/Tabla';


import Grid from '@material-ui/core/Grid';
import { calculateTotalExpenses } from '../utils/presupuestos';

export const Presupuestos = ({ idProyecto }) => {
  const $ = useStyles();

  const [presupuesto, setPresupuesto] = useState(null);


  const [presupuestoPendiente, setPresupuestoPendiente] = useState(null);

  const [presupuestoAprobado, setPresupuestoAprobado] = useState(null);

  const [comprasRealizadas, setComprasRealizadas] = useState(null);
  const [totalGastos, setTotalGastos] = useState(null);
  const [remanente, setRemanente] = useState(null);


  useEffect(() => {
    let isMounted = true;
    async function fetchProyectos() {
      if (idProyecto)
        try {
          //const proyecto = await getProyectoById(idProyecto); //Tiene que ser por ID la busqueda
          const presupuesto = await getPresupuesto();
          const presupuestoPendiente = await getPendiente(idProyecto);
          const presupuestoAprobado = await getAprobado(idProyecto);
          const remanente = await getRemanente(presupuesto,idProyecto)

          const compras = await getComprasByProyecto(idProyecto);
          const gastos = calculateTotalExpenses(compras);
          if (isMounted) {
            setTotalGastos(gastos);
            setComprasRealizadas(comprasRealizadas);
            setPresupuesto(presupuesto);
            setPresupuestoPendiente(presupuestoPendiente);
            setPresupuestoAprobado(presupuestoAprobado);
            setRemanente(remanente)
          //  setGastosPorRubro(combinarPresupuestoYRubros(presupuesto, gastosPorRubro));
          }
        } catch (err) {
          console.log('[DatosGenerales Component] ERROR : ' + err);
        }
      else {
        return window.history.back();
      }
    }
    fetchProyectos();
    return () => {
      isMounted = false;
    };
  }, [idProyecto, comprasRealizadas]);

  const loadingRendering = () => {
    return <Alert severity="info">Cargando...</Alert>;
  };
  const rendering = () => {
    return (
      <>

        <div className={$.root}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              className={$.cardContent}
            >
              <CardMontos
                item
                xl={6}
                totalPresupuesto={presupuesto.total}
                totalGastos={totalGastos}
                remanente = {remanente}
              />
              <Card className={$.card}>
                <CardContent>
                  <TortaPrincipal
                    presupuesto={presupuesto}
                    totalPresupuesto={presupuesto.total}
                    totalGastos={totalGastos}
                    className={$.torta}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Tabla
              presupuesto={presupuesto}
              presupuestoPendiente={presupuestoPendiente}
              presupuestoAprobado={presupuestoAprobado}

            />

          </Grid>
        </div>
      </>
    );
  };


  return (
    <>
      <h1 className={$.title}>Presupuesto</h1>
      <div className={$.root}>
        <Divider className={$.divider} />
        {(presupuesto && presupuestoPendiente && presupuestoAprobado) ? rendering() : loadingRendering()}


      </div>
      <Footer />
    </>
  );
};

const useStyles = makeStyles({
  root: {
    height: '100%',
    display: 'flex',
    marginLeft: '1vw',
    marginBottom: '2rem',
  },
  card: {
    width: '18vw',
    marginLeft: '-35rem',
    marginBottom: '1rem',
    marginTop: '12rem',
    alignContent: 'center',


  },
  cardContent: {
    marginBottom: '2rem',
  },
  divider: {
    marginBottom: '1rem',
  },
  item: {
    display: 'flex',
  },
  title: {
    marginLeft: '2.5vw',

  },

});
//hola