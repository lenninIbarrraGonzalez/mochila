import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  Card, Typography, Grid, Box, Container, Button
} from '@material-ui/core'
import { fetchUserById } from 'dux/usersSlice'
import {
  makeStyles
} from '@material-ui/core/styles'
import Layout from 'components/Layout'
import Animations from 'components/Animations'
import { getIdentificationTypeById, getRolesTypeById } from 'lib/helpers'
export { getServerSideProps } from 'lib/ssr'

const useStyles = makeStyles((theme) => ({
  card: {
    textAlign: 'initial',
    padding: theme.spacing(3)
  },
  typography: {
    marginBottom: theme.spacing(2)
  },
  box: {
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  container: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2)
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
      <Animations />
    )
  }

  return (
    <Layout pageTitle='información del usuarios'>
      <Container className={classes.container}>
        <Box className={classes.box}>
          <Typography
            variant='h4'
            color='primary'
            gutterBottom
            className={classes.tipography}
          >
            Información del usuario
          </Typography>
          <Link href={`/manager/user/edit/${id}`} shallow>
            <Button
              variant='contained'
              color='primary'
            >
              Editar
            </Button>
          </Link>
        </Box>
        <Card raised className={classes.card}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <Typography
                color='primary'
                gutterBottom
                className={classes.typography}
              >
                Nombre
              </Typography>
              <Typography color='initial'>
                {user?.userName}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Typography
                color='primary'
                gutterBottom
                className={classes.typography}
              >
                Organización
              </Typography>
              <Typography color='initial'>
                {user?.userOrganization}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Typography
                color='primary'
                gutterBottom
                className={classes.typography}
              >
                Tipo de Documento
              </Typography>
              <Typography color='initial'>
                {getIdentificationTypeById(user?.userIdentificationType)?.value}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Typography
                color='primary'
                gutterBottom
                className={classes.typography}
              >
                Número
              </Typography>
              <Typography color='initial'>
                {user?.userIdentification}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Typography
                color='primary'
                gutterBottom
                className={classes.typography}
              >
                Correo Electrónico
              </Typography>
              <Typography color='initial'>
                {user?.userEmail}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
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

            <Grid item xs={12} sm={6} md={6}>
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

            <Grid item xs={12} sm={6} md={6}>
              <Typography
                color='primary'
                gutterBottom
                className={classes.typography}
              >
                Rol
              </Typography>
              <Typography color='initial' className={classes.userInfo}>
                {getRolesTypeById(user?.userRole)?.value}
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Layout>
  )
}

export default UserInfo
