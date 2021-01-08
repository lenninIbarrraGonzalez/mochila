import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import {
  Card, Typography, Grid, Box, Container
} from '@material-ui/core'
import { fetchUserById } from '@dux/usersSlice'
import {
  makeStyles
} from '@material-ui/core/styles'
import Layout from '@components/Layout'
import Skeleton from '@material-ui/lab/Skeleton'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  card: {
    textAlign: 'initial',
    padding: theme.spacing(3)
  },
  typography: {
    marginBottom: theme.spacing(2)
  },
  userInfo: {
    color: '#818181'
  },
  fixmargin: {
    marginRight: '20px'
  },
  box: {
    marginBottom: theme.spacing(5),
    textAlign: 'center'
  },
  container: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2)
  },
  skeleton: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}))

const UserInfo = () => {
  const router = useRouter()
  const { id } = router.query

  const isLoading = useSelector(state => state.users.isLoading)
  const user = useSelector(state => state.users.current)

  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUserById(id))
  }, [dispatch, id])
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
    <Layout pageTitle='información del usuarios'>
      <Container className={classes.container}>
        <div className={classes.root}>
          <Card raised className={classes.card}>
            <Box className={classes.box}>
              <Typography
                variant='h4'
                color='primary'
                gutterBottom
                className={classes.tipography}
              >
                Información del usuario
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6} md={6}>
                <Typography
                  color='primary'
                  gutterBottom
                  className={classes.typography}
                >
                  Nombre
                </Typography>
                <Typography color='initial' className={classes.userInfo}>
                  {user?.userName}
                </Typography>
              </Grid>

              <Grid item xs={6} sm={6} md={6}>
                <Typography
                  color='primary'
                  gutterBottom
                  className={classes.typography}
                >
                  Organización
                </Typography>
                <Typography color='initial' className={classes.userInfo}>
                  Organizacion
                </Typography>
              </Grid>

              <Grid item xs={6} sm={6} md={6}>
                <Typography
                  color='primary'
                  gutterBottom
                  className={classes.typography}
                >
                  Tipo de Documento
                </Typography>
                <Typography color='initial' className={classes.userInfo}>
                  {user?.userIdentificationType}
                </Typography>
              </Grid>

              <Grid item xs={6} sm={6} md={6}>
                <Typography
                  color='primary'
                  gutterBottom
                  className={classes.typography}
                >
                  Número
                </Typography>
                <Typography color='initial' className={classes.userInfo}>
                  {user?.userIdentification}
                </Typography>
              </Grid>

              <Grid item xs={6} sm={6} md={6}>
                <Typography
                  color='primary'
                  gutterBottom
                  className={classes.typography}
                >
                  Correo Electrónico
                </Typography>
                <Typography color='initial' className={classes.userInfo}>
                  {user?.userEmail}
                </Typography>
              </Grid>

              <Grid item xs={6} sm={6} md={6}>
                <Typography
                  color='primary'
                  gutterBottom
                  className={classes.typography}
                >
                  Celular
                </Typography>
                <Typography color='initial' className={classes.userInfo}>
                  {user?.userPhone}
                </Typography>
              </Grid>

              <Grid item xs={6} sm={6} md={6}>
                <Typography
                  color='primary'
                  gutterBottom
                  className={classes.typography}
                >
                  Estado
                </Typography>
                <Typography color='initial' className={classes.userInfo}>
                  {user?.userStatus === true ? 'Activo' : 'Inactivo'}
                </Typography>
              </Grid>

              <Grid item xs={6} sm={6} md={6}>
                <Typography
                  color='primary'
                  gutterBottom
                  className={classes.typography}
                >
                  Rol
                </Typography>
                <Typography color='initial' className={classes.userInfo}>
                  {user?.userRol}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </div>
      </Container>
    </Layout>
  )
}

export default UserInfo
