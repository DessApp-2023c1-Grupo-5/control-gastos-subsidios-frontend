import { React } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { montoDisponible, nivelDeEjecucion } from '../../utils/presupuestos'
import { formatPrice } from '../../utils/validaciones';
import {
  LocalAtm,
  BarChart,
} from '@material-ui/icons';

export default function CardMontos({ totalGastos, totalPresupuesto }) {
  const $ = useStyles();

  const monto = montoDisponible(totalPresupuesto, totalGastos)
  const ejecucion = nivelDeEjecucion(totalPresupuesto, totalGastos);
  const remanente = totalPresupuesto - (100 + 50);


  return (
    <div className={$.textContainer}>


      <Card className={$.root}>
        <CardContent className={$.content}>
          <Typography
            variant="h5"
            component="h2"
            className={$.typography}
          >
            <LocalAtm className={$.prepTotal} />Presupuesto total:
          </Typography>
          <span
            variant="h5"
            className={$.typography}
          >
            {formatPrice(totalPresupuesto)}
          </span>
        </CardContent>
      </Card >


      <Card className={$.root1}>
        <CardContent>
          <Typography
            variant="h5"
            component="h2"
            className={$.typography}
          >

            <LocalAtm className={$.prepTotal} />Monto disponible:
          </Typography>
          <span
            variant="h5"
            className={$.typography}
          >
            {formatPrice(monto)}
          </span>
        </CardContent>
      </Card >


      <Card className={$.root2}>
        <CardContent>
          <Typography
            variant="body2"
            component="p"
            className={$.typography}
          >
            <BarChart className={$.nivelEjec} />  Nivel de ejecución:
          </Typography>
          <span
            variant="h5"
            className={$.typography}
          >
            {ejecucion}
          </span>
        </CardContent>
      </Card >

      <Card className={$.root3}>
        <CardContent>
          <Typography
            variant="h5"
            component="h2"
            className={$.typography}
          >

            <LocalAtm className={$.prepTotal} />Remanente:
          </Typography>
          <span
            variant="h5"
            className={$.typography}
          >
            {remanente}
          </span>
        </CardContent>
      </Card >
    </div>
  );

}



const useStyles = makeStyles({
  root: {
    display: 'inline-flex',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginBottom: '1.5rem',
    margin: '0.5rem',
    background: '#06d6a0',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',


  },
  root1: {
    display: 'inline-flex',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginBottom: '1.5rem',
    margin: '0.5rem',
    background: '#ef476f',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',


  },
  root2: {
    display: 'inline-flex',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginBottom: '1.5rem',
    margin: '0.5rem',
    background: '#118ab2',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',


  },

  root3: {
    display: 'inline-flex',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginBottom: '1.5rem',
    margin: '0.5rem',
    background: '#574080',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',


  },
  typography: {
    fontFamily: 'Cabin',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    marginBottom: '1rem',
    color: '#ffffff',

  },
  prepTotal: {
    fontSize: '1rem',
    color: '#ffffff',

  },
  nivelEjec: {

    fontSize: '1rem',
    color: '#ffffff',
  },


});
