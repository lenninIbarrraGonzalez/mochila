import React, { useEffect } from 'react'
import {
  Box,
  Card,
  Container,
  CardContent,
  Typography
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Layout from 'components/Layout'
import { fetchOrganizations } from 'dux/organizationsSlice'
import Animations from 'components/Animations'
export { getServerSideProps } from 'lib/ssr'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2)
  },
  pos: {
    marginBottom: 12
  },
  box: {
    marginBottom: theme.spacing(5)
  },
  card: {
    minWidth: 275,
    maxWidth: 300,
    marginLeft: theme.spacing(4)
  }
}))

const ComponentDashboard = () => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.organizations.isLoading)
  const organizations = useSelector(state => state.organizations.data)

  useEffect(() => {
    dispatch(fetchOrganizations())
  }, [dispatch])

  if (isLoading) {
    return (
      <Animations />
    )
  }

  return (
    <Layout pageTitle='dashboard'>
      <Container className={classes.container}>
        <Box className={classes.box}>
          <Typography variant='h4' color='primary' component='h1'>
            Organizaciones registradas
          </Typography>
        </Box>
        <div className={classes.root}>
          <Grid container spacing={3}>
            {organizations.map((row, index) => {
              return (
                <Grid item xs key={index}>
                  <Card className={classes.card}>
                    <CardContent>
                      <Typography variant='h6' color='primary' gutterBottom>
                        {row?.name}
                      </Typography>
                      <Typography variant='h6' component='h2'>
                        {row?.legalRepresentative}
                      </Typography>
                      <Typography variant='h6' component='h2'>
                        {row?.projectType}
                      </Typography>
                      <Typography className={classes.pos} color='textSecondary'>
                        {row?.community}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </div>
      </Container>
    </Layout>
  )
}
export default ComponentDashboard
