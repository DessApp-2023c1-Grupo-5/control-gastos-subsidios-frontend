/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Footer } from './Footer';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import { getProyectoById } from '../services/proyectos.js';
import Alert from '@material-ui/lab/Alert';
import { formatPrice, formatDate, formatYear } from '../utils/validaciones';

export const DatosGenerales = ({ idProyecto }) => {
  const $ = useStyles();

  const [proyecto, setProyecto] = useState(null);
  // const userName = sessionStorage.getItem("username");
  //const idProyecto = sessionStorage.getItem("idProyecto");
  //useEffect para traer la proyecto del proyecto de la api.
  useEffect(() => {
    let isMounted = true;
    async function fetchProyectos() {
      if (idProyecto)
        try {
          const proyecto = await getProyectoById(idProyecto); //Tiene que ser por ID la busqueda
          if (isMounted) {
            setProyecto(proyecto[0]);
          }
        } catch (err) {
          ('[DatosGenerales Component] ERROR : ' + err);
        }
      else {
        return window.history.back();
      }
    }
    fetchProyectos();
    return () => {
      isMounted = false;
    };
  }, []);

  const loadingRendering = () => {
    return <Alert severity="info">Cargando...</Alert>;
  };

  const DatosList = () => {
    return (
      <List>
        <ListItem className={$.item}>
          <ListItemText primary={'Título: ' + proyecto.titulo} sx={{ ml: 1 }} />
        </ListItem>
        <ListItem>
          <ListItemText primary={'Tipo: ' + proyecto.tipo} sx={{ ml: 1 }} />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={'Organismo: ' + proyecto.organismo}
            sx={{ ml: 2 }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={'Línea de financiamiento: ' + proyecto.lineaFinanciamiento}
            sx={{ ml: 2 }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={'Año de convocatoria: ' + formatYear(proyecto.año)}
            sx={{ ml: 2 }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={'Unidad Académica: ' + proyecto.unidadAcademica}
            sx={{ ml: 2 }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={'Área: ' + proyecto.areaTematica}
            sx={{ ml: 2 }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={'Subsidio: ' + formatPrice(proyecto.subsidio)}
            sx={{ ml: 2 }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={'Fecha Inicio: ' + formatDate(proyecto.fechaInicio)}
            sx={{ ml: 2 }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={'Fecha Fin: ' + formatDate(proyecto.fechaFin)}
            sx={{ ml: 2 }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={'Usuario: ' + proyecto.usuario}
            sx={{ ml: 2 }}
          />
        </ListItem>
      </List>
    );
  };
  const rendering = () => {
    return (
      <>
        <div className={$.root}>
          <Card className={$.card}>
            <CardContent>
              <DatosList />
            </CardContent>
          </Card>
          <Card className={$.card}>
            <CardContent>
              <List>
                <Typography className={$.title}>Resumen:</Typography>
                <Typography paragraph={true} className={$.parrafo}>
                  {proyecto.resumen}
                </Typography>
              </List>
            </CardContent>
          </Card>
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
      <Footer />
    </>
  );
};

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  card: {
    margin: '1rem',
    borderTop: '1rem solid #5AA123',
    borderRadius: '17px 17px 0 0',
  },
  divider: {
    marginBottom: '1rem',
  },
  item: {
    display: 'flex',
  },
  key: {
    fontWeight: 'bolder',
  },
  parrafo: {
    padding: '1rem',
    fontSize: '16px',
    textAlign: 'justify',
  },
  title: {
    fontWeight: 'bold',
    marginLeft: '1rem',
  },
  dropDown: {
    marginRight: '1rem',
    width: '10rem',
  },
});
