/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Footer } from '../Footer';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
//import PopUpCompras from './PopUpCompras';
import { getComprasByProyecto } from '../../services/compras';
import { getProyectoById } from '../../services/proyectos';
import { formatPrice, formatDate, formatYear } from '../../utils/validaciones';
import {

    Table,
    TableBody,
    TableCell,
    TableContainer,
    Paper,
    TableRow,

} from '@material-ui/core';
//import { id } from 'date-fns/locale';
//import { Compras } from './Compras';
import { Link } from 'react-router-dom';

export const VistaProyecto = () => {



    const [proyecto, setProyecto] = useState(null);
    // const userName = sessionStorage.getItem("username");
    //const idProyecto = sessionStorage.getItem("idProyecto");
    //useEffect para traer la proyecto del proyecto de la api.
    //Styles
    const $ = useStyles();
    //States
    const [compras, setCompras] = useState(null);
    //const [open, setOpen] = useState(false);
    const [newCompra, setNewCompra] = useState(true);
    const handleSelectCompras = (id) => {
        sessionStorage.setItem('idCompra', id);
        sessionStorage.setItem('tituloProyecto', proyecto.titulo)
        //setIdProyecto(id);
    };
    //const handleOpen = () => {
    //   setOpen(true);
    //};

    //const handleClose = () => {
    //  setOpen(false);
    //};

    //API Call
    useEffect(() => {        //getComprasByProyecto(id);
        async function fetchCompra() {
            try {
                const id = sessionStorage.getItem('idProyecto');
                const compras = await getComprasByProyecto(id);
                setCompras(compras);
            } catch (err) {
                console.log('ERROR FETCH API [compras]: ' + err);
            }
        }
        if (newCompra) fetchCompra();
        setNewCompra(false);
    }, [newCompra]);
    useEffect(() => {
        async function fetchUsuarios() {
            try {
                const id = sessionStorage.getItem('idProyecto');
                const proyecto = await getProyectoById(id); //Tiene que ser por ID la busqueda
                setProyecto(proyecto[0]);
            } catch (err) {
                console.log('[DatosGenerales Component] ERROR : ' + err);
            }
        }
        const id = sessionStorage.getItem('idProyecto');
        if (id) {
            fetchUsuarios();
        } else {
            window.location.replace(
                "/error"

            );
        }
    }, []);
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
                backgroundColor: 'theme.palette.action.hover,',
            },
        },
    }))(TableRow);

    const loadingRendering = () => {
        return <Alert severity="info">Cargando...</Alert>;
    };

    const StyledTableHead = withStyles(() => ({
        root: {
            '&:nth-of-type(odd)': {
                background: 'linear-gradient(to left , #9BC76D, #80B05C ,#5AA123)',
            },
        },
    }))(TableRow);


    const DatosList = () => {

        return (


            <TableContainer className={$.container} component={Paper} >

                <Table aria-label="customized table">
                    <StyledTableHead>


                        <StyledTableCell align="left" className={$.textColor}>
                            Titulo
                        </StyledTableCell>
                        <StyledTableCell align="left" className={$.textColor}>
                            Tipo
                        </StyledTableCell>
                        <StyledTableCell align="left" className={$.textColor}>
                            Organismo
                        </StyledTableCell>
                        <StyledTableCell align="left" className={$.textColor}>
                            Linea de Financiamiento
                        </StyledTableCell>
                        <StyledTableCell align="left" className={$.textColor}>
                            Año de Convocatoria
                        </StyledTableCell>
                        <StyledTableCell align="left" className={$.textColor}>
                            Uniidad Academica
                        </StyledTableCell>
                        <StyledTableCell align="left" className={$.textColor}>
                            Area
                        </StyledTableCell>
                        <StyledTableCell align="left" className={$.textColor}>
                            Subsidio
                        </StyledTableCell>
                        <StyledTableCell align="left" className={$.textColor}>
                            Fecha Inicio
                        </StyledTableCell>
                        <StyledTableCell align="left" className={$.textColor}>
                            Fecha Fin
                        </StyledTableCell>
                        <StyledTableCell align="left" className={$.textColor}>
                            Usuario
                        </StyledTableCell>
                    </StyledTableHead>
                    <TableBody>
                        <StyledTableRow>

                            <StyledTableCell scope="row">
                                {proyecto.titulo}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                {proyecto.tipo}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                {proyecto.organismo}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                {proyecto.lineaFinanciamiento}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                {formatYear(proyecto.año)}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                {proyecto.unidadAcademica}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                {proyecto.areaTematica}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                {formatPrice(proyecto.subsidio)}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                {formatDate(proyecto.fechaInicio)}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                {formatDate(proyecto.fechaFin)}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                {proyecto.usuario}
                            </StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>


        );
    };

    const DatosList1 = () => {

        return (
            <>

                <TableContainer className={$.container} component={Paper}>
                    <Table aria-label="customized table">
                        <StyledTableHead>
                            <StyledTableCell className={$.textColor}>N* Factura</StyledTableCell>
                            <StyledTableCell align="center" className={$.textColor}>
                                Nombre
                            </StyledTableCell>
                            <StyledTableCell align="center" className={$.textColor}>
                                Monto
                            </StyledTableCell>
                            <StyledTableCell align="center" className={$.textColor}>
                                Estado
                            </StyledTableCell>
                            <StyledTableCell align="center" className={$.textColor}>
                                Rubro
                            </StyledTableCell>
                        </StyledTableHead>
                        <TableBody>
                            {compras.map((compras) => (
                                <StyledTableRow key={compras.id}>
                                    <StyledTableCell
                                        scope="row"
                                        onClick={() => handleSelectCompras(compras.id)}
                                        component={Link}
                                        to={'/admin/proyectView/compra'}//edit cuando se cree la vista de compra singular 
                                    >
                                        {compras.factura}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {compras.nombre}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {formatPrice(compras.monto)}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {compras.estado}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {compras.rubro}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        );
    };

    const rendering = () => {
        return (
            <>
                <div className={$.root}>

                    <CardContent>
                        <DatosList />
                    </CardContent>

                </div>
            </>
        );

    };

    const rendering1 = () => {
        return (
            <>
                <div className={$.root}>

                    <CardContent>
                        <DatosList1 />
                    </CardContent>

                </div>
            </>
        );

    };


    return (
        <>


            <h1>Datos Generales</h1>
            <div className={$.root}>
                <Divider className={$.divider} />
                {proyecto ? rendering() : loadingRendering()}
            </div>

            <h1>Solicitudes de Compras</h1>
            <div className={$.container}>
                <Divider className={$.divider} />
                {compras ? rendering1() : loadingRendering()}

            </div>
            <Footer />
        </>
    );
};




const useStyles = makeStyles({
    root: {
        display: 'flex',
        width: '100%',
    },
    container: {
        display: 'flex',
        width: '100%',
    },
    card: {
        width: '100%',
        display: 'flex',
        margin: '1rem',
        maxHeight: '45rem',
        borderTop: '1rem solid #5AA123',
        borderRadius: '17px 17px 0 0',
    },
    divider: {
        marginBottom: '2rem',
    },
    item: {
        display: 'flex',
    },
    key: {
        fontWeight: 'bolder',
    },
    parrafo: {
        padding: '3rem',
        fontSize: '16px',
        textAlign: 'justify',
    },
    title: {
        fontWeight: 'bold',
        marginLeft: '3rem',
    },
    dropDown: {
        marginRight: '1rem',
        width: '10rem',
    },
    menuItem: {
        marginTop: '46rem',
        marginLeft: '30rem',
    },
    textColor: {
        color: 'black',
        fontWeight: 'bold',
    },

    tableCellContent: {
        maxWidth: '10vw',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '98%',
    },
});

export default VistaProyecto;
