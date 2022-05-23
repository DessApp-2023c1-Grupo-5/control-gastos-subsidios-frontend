import { React, useEffect, useState }from 'react';
import { Footer } from './Footer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { proyectosEnCurso } from '../constants/constants';
import { proyectosEnHistoria } from '../constants/constants';
import { Link } from 'react-router-dom';
import { calculateTotalExpenses, nivelDeEjecucion } from '../utils/presupuestos';
import { getPresupuesto } from '../services/presupuestos';
import { getAllCompras } from '../services/compras';
import { Box, CircularProgress, Typography } from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);


const StyledTableRow = withStyles(() => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: 'theme.palette.action.hover,'
    },
  },
}))(TableRow);

const StyledTableHead = withStyles(() => ({
  root: {
    '&:nth-of-type(odd)': {
      background: 'linear-gradient(to left , #9BC76D, #80B05C ,#5AA123)', 
    },
  },
}))(TableRow);

const StyledTableHeadTerminados = withStyles(() => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#DCDCDC'
    },
  },
}))(TableRow);

const circularProgressWithValue = (nivelEjecucion) => {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" value={nivelEjecucion} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" color="textSecondary">{nivelEjecucion}%</Typography>
      </Box>
    </Box>
  );
}

export const MisProyectos = () => {
    const $ = useStyles();
    
    const [nivelEjecucion, setNivelEjecicion] = useState();
    //Porcentaje USAR REDUX porque lo comparten presupuestos y CardMontos.
     useEffect(() => {
      async function getPorcentaje() {
        const presupuesto = await getPresupuesto();
        const comprasRealizadas = await getAllCompras();
        const gastos = calculateTotalExpenses(comprasRealizadas);
        const totalPresupuesto = presupuesto[0].total
        const ejecucion = nivelDeEjecucion(totalPresupuesto, gastos).split(",")[0]; //Truncamiento del porcentaje.
        console.log("Ejecucion ",presupuesto,gastos)
        setNivelEjecicion(ejecucion);
      }
      getPorcentaje();
     })
    return <>
        <h2>En curso</h2>
        <TableContainer className={$.container} component={Paper}>
            <Table aria-label="customized table">
                <StyledTableHead>
                    <StyledTableCell className={ $.textColor }>Proyecto</StyledTableCell>
                    <StyledTableCell align="center" className={ $.textColor }>Director</StyledTableCell>
                    <StyledTableCell align="center" className={ $.textColor }>Fecha de Inicio</StyledTableCell>
                    <StyledTableCell align="center" className={ $.textColor }>Porcentaje</StyledTableCell>
                </StyledTableHead>
                <TableBody>
                  

                {proyectosEnCurso.map((proyectosEnCurso) => (
                    <StyledTableRow key={proyectosEnCurso.nombre}>
                      <StyledTableCell scope="row" component={Link} to={'/proyectos'}>{proyectosEnCurso.nombre}</StyledTableCell>
                      <StyledTableCell align="center" >{proyectosEnCurso.director}</StyledTableCell>
                      <StyledTableCell align="center">{proyectosEnCurso.fechaInicio}</StyledTableCell>
                      <StyledTableCell align="center">
                        {circularProgressWithValue(nivelEjecucion)}
                      </StyledTableCell>
                    </StyledTableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        <br></br>
        <h2>Historia</h2>
        <TableContainer className={$.container} component={Paper}>
            <Table aria-label="customized table">
                <StyledTableHeadTerminados>
                    <StyledTableCell className={ $.textColorHistoric }>Proyecto</StyledTableCell>
                    <StyledTableCell align="center" className={ $.textColorHistoric }>Director</StyledTableCell>
                    <StyledTableCell align="center" className={ $.textColorHistoric }>Fecha de Inicio</StyledTableCell>
                    <StyledTableCell align="center" className={ $.textColorHistoric }>Porcentaje</StyledTableCell>
                </StyledTableHeadTerminados>
                <TableBody>
                {proyectosEnHistoria.map((proyectosEnHistoria) => (
                    <StyledTableRow key={proyectosEnHistoria.nombre}>
                    <StyledTableCell scope="row" className={ $.tableCellContent }>{proyectosEnHistoria.nombre}</StyledTableCell>
                    <StyledTableCell align="center">{proyectosEnHistoria.director}</StyledTableCell>
                    <StyledTableCell align="center">{proyectosEnHistoria.fechaInicio}</StyledTableCell>
                    <StyledTableCell align="center">
                      {circularProgressWithValue(proyectosEnHistoria.porcentaje)}
                    </StyledTableCell>
                    </StyledTableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        <Footer />
    </>
}

const useStyles = makeStyles({
    container: {
        display: 'flex',
        width: '100%',
    },
    textColor: {
      color: 'white', 
      fontWeight: 'bold'
    },
    textColorHistoric: {
      fontWeight: 'bold'
    },
    tableCellContent: {
      maxWidth: '10vw'
    }
  });
