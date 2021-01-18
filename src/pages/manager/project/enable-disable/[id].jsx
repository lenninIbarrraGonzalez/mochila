import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from 'components/Layout'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProjectById, updateProjectStatus } from 'dux/projectsSlice'
import {
  CssBaseline,
  Card,
  Container,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button
} from '@material-ui/core'
import {
  withStyles,
  makeStyles
} from '@material-ui/core/styles'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import Skeleton from '@material-ui/lab/Skeleton'
import { getProjectTypesById, getAttachmentTypeById } from 'lib/helpers'
export { getServerSideProps } from 'lib/ssr'

const useStyles = makeStyles((theme) => ({
  card: {
    textAlign: 'initial',
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      fontSize: '1em'
    }
  },
  container: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2)
  },
  tipography: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '1em'
    },
    display: 'flex',
    justifyContent: 'left'
  },
  titles: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      fontSize: '2em'
    }
  },
  tableContainer: {
    marginTop: theme.spacing(2)
  },
  downloadFile: {
    cursor: 'pointer'
  },
  box: {
    marginBottom: theme.spacing(2)
  },
  button: {
    marginTop: '2.5em'
  },
  skeleton: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}))

const StyledTabletCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white
  }
}))(TableCell)

const UserInfo = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const router = useRouter()
  const { id } = router.query
  const isLoading = useSelector(state => state.projects.isLoading)
  const project = useSelector(state => state.projects.current)
  const attached = project?.attached

  const [estado, setEstado] = useState('')

  useEffect(() => {
    dispatch(fetchProjectById(id))
  }, [dispatch, id])

  useEffect(() => {
    setEstado(project?.projectStatus)
  }, [project])

  const handleState = () => {
    const data = !estado
    dispatch(
      updateProjectStatus({
        id,
        data
      })
    )
    router.push('/admin')
  }

  if (isLoading) {
    return (
      <div className={classes.skeleton}>
        <Skeleton animation={false} width={350} height={30} />
        <Skeleton animation='pulse' width={350} height={30} />
        <Skeleton animation='pulse' width={350} height={30} />
        <Skeleton animation='pulse' width={350} height={30} />
        <Skeleton animation='pulse' width={350} height={30} />
        <Skeleton animation='wave' width={350} height={30} />
        <Skeleton animation='wave' width={350} height={30} />
        <Skeleton animation='wave' width={350} height={30} />
        <Skeleton animation='wave' variant='rect' width={350} height={200} />
      </div>
    )
  }

  return (
    <Layout pageTitle='Editar proyecto'>
      <Container className={classes.container}>
        <CssBaseline />
        <Box className={classes.box}>
          <Typography
            variant='h4'
            color='primary'
            gutterBottom
            className={classes.tipography}
          >
            Habilitar o deshabilitar un proyecto
          </Typography>
        </Box>
        <Card raised className={classes.card}>
          <Typography variant='h5' color='primary' gutterBottom>
            Datos del Proyecto
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <Typography
                variant='h7'
                color='primary'
                gutterBottom
                className={classes.typography}
              >
                Nombre del proyecto:
              </Typography>
              <Typography
                variant='h7'
                color='initial'
              >
                {' '}{project?.projectName}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Typography
                variant='h7'
                color='primary'
                gutterBottom
                className={classes.typography}
              >
                Tipo de Proyecto:
              </Typography>
              <Typography
                variant='h7'
                color='initial'
              >
                {' '}{getProjectTypesById(project?.projectType)?.value}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Typography
                variant='h7'
                color='primary'
                gutterBottom
                className={classes.typography}
              >
                Ubicación del Proyecto:
              </Typography>
              <Typography
                variant='h7'
                color='initial'
              >
                {' '}{project?.projectLocation}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Typography
                variant='h7'
                color='primary'
                gutterBottom
                className={classes.typography}
              >
                Valor en letras del Proyecto:
              </Typography>
              <Typography
                variant='h7'
                color='initial'
              >
                {' '}{project?.projectValueInLetters}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Typography
                variant='h7'
                color='primary'
                gutterBottom
                className={classes.typography}
              >
                Valor en Números del Proyecto:
              </Typography>
              <Typography
                variant='h7'
                color='initial'
              >
                {' '}$ {' '}{project?.projectValueInNumbers}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Typography
                variant='h7'
                color='primary'
                gutterBottom
                className={classes.typography}
              >
                Estado:
              </Typography>
              <Typography
                variant='h7'
                color='initial'
              >
                {' '}{' '}{project?.projectStatus === true ? 'Activo' : 'Inactivo'}
              </Typography>
            </Grid>

            <div className={classes.titles}>
              <Typography variant='h5' color='primary' gutterBottom>
                Datos del estructurador del proyecto
              </Typography>
            </div>

            <Grid item xs={12} sm={6} md={6}>
              <Typography
                variant='h7'
                color='primary'
                gutterBottom
                className={classes.typography}
              >
                Nombre del estructurador:
              </Typography>
              <Typography
                variant='h7'
                color='initial'
              >
                {' '}{project?.structuringName}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Typography
                variant='h7'
                color='primary'
                gutterBottom
                className={classes.typography}
              >
                Teléfono del estructurador:
              </Typography>
              <Typography
                variant='h7'
                color='initial'
              >
                {' '}{project?.structuringPhone}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Typography
                variant='h7'
                color='primary'
                gutterBottom
                className={classes.typography}
              >
                Dirección del estructurador:
              </Typography>
              <Typography
                variant='h7'
                color='initial'
              >
                {' '}{project?.structuringAddress}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Typography
                variant='h7'
                color='primary'
                gutterBottom
                className={classes.typography}
              >
                Email del estructurador:
              </Typography>
              <Typography
                variant='h7'
                color='initial'
              >
                {' '}{project?.structuringEmail}
              </Typography>
            </Grid>

            <div className={classes.titles}>
              <Typography variant='h5' color='primary' gutterBottom>
                Datos de quien registró el proyecto
              </Typography>
            </div>

            <Grid item xs={12} sm={6} md={6}>
              <Typography
                variant='h7'
                color='primary'
                gutterBottom
                className={classes.typography}
              >
                Nombre de quien registra el proyecto:
              </Typography>
              <Typography
                variant='h7'
                color='initial'
              >
                {' '}{project?.registerName}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Typography
                variant='h7'
                color='primary'
                gutterBottom
                className={classes.typography}
              >
                Teléfono de quien registra:
              </Typography>
              <Typography
                variant='h7'
                color='initial'
              >
                {' '}{project?.registerPhone}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Typography
                variant='h7'
                color='primary'
                gutterBottom
                className={classes.typography}
              >
                Dirección de quien registra:
              </Typography>
              <Typography
                variant='h7'
                color='initial'
              >
                {' '}{project?.registerAddress}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Typography
                variant='h7'
                color='primary'
                gutterBottom
                className={classes.typography}
              >
                Email de quien registra:
              </Typography>
              <Typography
                variant='h7'
                color='initial'
              >
                {' '}{project?.registerEmail}
              </Typography>
            </Grid>

            <div className={classes.titles}>
              <Typography variant='h5' color='primary' gutterBottom>
                Archivos adjuntos del proyecto
              </Typography>
            </div>

            <TableContainer
              component={Paper}
              elevation={1}
              className={classes.tableContainer}
            >
              <Table className={classes.table} aria-label='docs'>
                <TableHead>
                  <TableRow>
                    <StyledTabletCell align='center'>#</StyledTabletCell>
                    <StyledTabletCell align='center'>
                      Nombre del Archivo
                    </StyledTabletCell>
                    <StyledTabletCell align='center'>
                      Categoría del Archivo
                    </StyledTabletCell>
                    <StyledTabletCell align='center'>
                      Ver archivo
                    </StyledTabletCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attached?.map((files, index) => (
                    <TableRow key={index}>
                      <TableCell align='center'>{index + 1}</TableCell>
                      <TableCell align='center'>{files.attachedName}</TableCell>
                      <TableCell align='center'>
                        {getAttachmentTypeById(files.attachedType)?.value}
                      </TableCell>
                      <TableCell
                        align='center'
                        className={classes.downloadFile}
                      >
                        <Button>
                          <a href={files.attachedArchive} id='download' target='blank'>
                            <CloudDownloadIcon color='primary' />
                          </a>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <div className={classes.button}>
            <Button
              color='primary'
              variant='contained'
              fullWidth
              type='submit'
              onClick={handleState}
            >
              {estado === true ? 'Deshabilitar' : 'habilitar'}
            </Button>
          </div>
        </Card>
      </Container>
    </Layout>
  )
}

export default UserInfo
