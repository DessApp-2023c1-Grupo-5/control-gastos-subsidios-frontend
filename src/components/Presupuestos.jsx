import React from 'react';
import { Footer } from './Footer';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { getPresupuesto } from '../services/presupuestos.js';
import { getAllGastosPorRubro, getComprasByProyecto } from '../services/compras.js';
import { useState, useEffect } from 'react';
import Alert from '@material-ui/lab/Alert';
import TortaPrincipal from './dashboards/TortaPrincipal';
import CardMontos from './dashboards/CardMontos';

import Grid from '@material-ui/core/Grid';
import { calculateTotalExpenses, combinarPresupuestoYRubros } from '../utils/presupuestos';

export const Presupuestos = ({ idProyecto }) => {
  const $ = useStyles();

  const [presupuesto, setPresupuesto] = useState(null);
  const [comprasRealizadas, setComprasRealizadas] = useState(null);
  const [totalGastos, setTotalGastos] = useState(null);
  const [gastosPorRubro, setGastosPorRubro] = useState(null);

  console.log(gastosPorRubro)

  useEffect(() => {
    let isMounted = true;
    async function fetchProyectos() {
      if (idProyecto)
        try {
          const presupuesto = await getPresupuesto();
          const compras = await getComprasByProyecto(idProyecto);
          const gastos = calculateTotalExpenses(compras);
          const gastosPorRubro = await getAllGastosPorRubro(idProyecto)
          if (isMounted) {
            setTotalGastos(gastos);
            setComprasRealizadas(comprasRealizadas);
            setPresupuesto(presupuesto);
            setGastosPorRubro(combinarPresupuestoYRubros(presupuesto, gastosPorRubro))
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
        {presupuesto ? rendering() : loadingRendering()}
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
    width: '25vw',
    marginLeft: '15vw',
    marginBottom: '1rem',
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