import React, { useState, useRef, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Layout from 'components/Layout'
import { useDispatch } from 'react-redux'
import { createProject } from 'dux/projectsSlice'
import { typesProjects } from '../../lib/constants.js'
import {
  TextField,
  Card,
  Grid,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Container,
  Box,
  Typography,
  Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import InfoIcon from '@material-ui/icons/Info'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  card: {
    padding: theme.spacing(5),
    textAlign: 'initial'
  },
  form: {
    width: '100%'
  },
  formControl: {
    minWidth: '100%',
    marginTop: theme.spacing(1)
  },
  selectInput: {
    minWidth: 100
  },
  titles: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1)
  },
  adminData: {
    display: 'flex',
    flexGrow: 1
  },
  adminButton: {
    flexGrow: 1,
    marginTop: theme.spacing(1),
    padding: theme.spacing(1)
  },
  TextField: {
    marginTop: theme.spacing(1)
  },
  button: {
    marginTop: '2.5em',
    display: 'flex',
    justifyContent: 'center'
  },
  container: {
    backgroundColor: '#cfe8fc',
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2)
  },
  box: {
    marginBottom: theme.spacing(2)
  },
  checkWrapper: {
    width: '100%',
    margin: theme.spacing(2)
  },
  tableContainer: {
    marginTop: theme.spacing(2)
  },
  table: {
    minWidth: 700,
    borderRadius: '9px'
  },
  input: {
    display: 'none'
  },

  buttonCargar: {
    marginTop: theme.spacing(2)
  }
}))

const ComponentNewProject = () => {
  const { register, handleSubmit, control, errors } = useForm(
    {
      mode: 'onSubmit',
      reValidateMode: 'onSubmit'
    }
  )

  const typeProject = typesProjects
  const inputLabel = useRef(null)
  const [labelWidth, setLabelWidth] = useState(0)
  const classes = useStyles()

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  const dispatch = useDispatch()
  const onSubmit = (data) => {
    console.log('envio de datos: ', data)
    const { value: projectType } = data.projectType

    const {
      projectName,
      projectLocation,
      projectValueInLetters,
      projectValueInNumbers,
      structuringName,
      structuringPhone,
      structuringAddress,
      structuringEmail,
      registerName,
      registerPhone,
      registerAddress,
      registerEmail
    } = data

    dispatch(
      createProject(
        {
          projectName,
          projectType,
          projectLocation,
          projectValueInLetters,
          projectValueInNumbers,
          structuringName,
          structuringPhone,
          structuringAddress,
          structuringEmail,
          registerName,
          registerPhone,
          registerAddress,
          registerEmail
        }
      )
    )
  }
  return (
    <Layout pageTitle='Nuevo proyecto'>
      <Container className={classes.container}>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Box display='flex' justifyContent='center' className={classes.box}>
            <Typography variant='h4' color='primary'>
              Crear nuevo proyecto
            </Typography>
          </Box>

          <div className={classes.root}>
            <Card raised className={classes.card}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    name='projectName'
                    id='projectName'
                    label='Nombre del proyecto'
                    inputRef={register({ required: true })}
                    className={classes.TextField}
                    variant='outlined'
                    autoFocus
                    fullWidth
                  />
                  {errors.projectName && (
                    <Typography variant='caption' color='error'>
                      <InfoIcon color='error' fontSize='small' />
                      Campo obligatorio
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl className={classes.formControl} variant='outlined'>
                    <InputLabel ref={inputLabel} id='projectType'>
                      Tipo de Proyecto
                    </InputLabel>
                    <Controller
                      as={
                        <Select labelWidth={labelWidth}>
                          {typeProject.map((doc, index) => {
                            return (
                              <MenuItem key={index} value={doc}>
                                {doc.value}
                              </MenuItem>
                            )
                          })}
                        </Select>
                  }
                      name='projectType'
                      id='projectType'
                      variant='outlined'
                      className={classes.selectInput}
                      control={control}
                      rules={{ required: true }}
                      defaultValue=''
                    />
                    {errors.projectType && (
                      <Typography variant='caption' color='error'>
                        <InfoIcon color='error' fontSize='small' />
                        Campo obligatorio
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    name='projectLocation'
                    id='projectLocation'
                    label='Ubicación del proyecto'
                    inputRef={register({ required: true })}
                    className={classes.TextField}
                    variant='outlined'
                    fullWidth
                  />
                  {errors.projectLocation && (
                    <Typography variant='caption' color='error'>
                      <InfoIcon color='error' fontSize='small' />
                      Campo obligatorio
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    name='projectValueInLetters'
                    id='projectValueInLetters'
                    label='Valor en letras del proyecto'
                    inputRef={register({ required: true })}
                    className={classes.TextField}
                    variant='outlined'
                    fullWidth
                  />
                  {errors.projectValueInLetters && (
                    <Typography variant='caption' color='error'>
                      <InfoIcon color='error' fontSize='small' />
                      Campo obligatorio
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    name='projectValueInNumbers'
                    id='projectValueInNumbers'
                    label='Valor en números del proyecto'
                    inputRef={register({ required: true })}
                    className={classes.TextField}
                    variant='outlined'
                    fullWidth
                  />
                  {errors.projectValueInNumbers && (
                    <Typography variant='caption' color='error'>
                      <InfoIcon color='error' fontSize='small' />
                      Campo obligatorio
                    </Typography>
                  )}
                </Grid>
                <div className={classes.titles}>
                  <Typography
                    color='primary'
                    component='h1'
                    variant='h5'
                    gutterBottom
                  >
                    Datos del estructurador del proyecto
                  </Typography>
                </div>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    name='structuringName'
                    id='structuringName'
                    label='Nombre del estructurador del proyecto'
                    inputRef={register({ required: true })}
                    className={classes.TextField}
                    variant='outlined'
                    fullWidth
                  />
                  {errors.structuringName && (
                    <Typography variant='caption' color='error'>
                      <InfoIcon color='error' fontSize='small' />
                      Campo obligatorio
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    name='structuringPhone'
                    id='structuringPhone'
                    label='Teléfono del estructurador'
                    inputRef={register({ required: true })}
                    className={classes.TextField}
                    variant='outlined'
                    fullWidth
                  />
                  {errors.structuringPhone && (
                    <Typography variant='caption' color='error'>
                      <InfoIcon color='error' fontSize='small' />
                      Campo obligatorio
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    name='structuringAddress'
                    id='structuringAddress'
                    label='Dirección del estructurador'
                    inputRef={register({ required: true })}
                    className={classes.TextField}
                    variant='outlined'
                    fullWidth
                  />
                  {errors.structuringAddress && (
                    <Typography variant='caption' color='error'>
                      <InfoIcon color='error' fontSize='small' />
                      Campo obligatorio
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    className={classes.TextField}
                    name='structuringEmail'
                    id='structuringEmail'
                    label='Email del Estructurador'
                    variant='outlined'
                    inputRef={register({
                      required: 'Campo obligatorio',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Formato de correo inválido'
                      }
                    })}
                    fullWidth
                  />
                  {errors.structuringEmail && (
                    <Typography
                      variant='caption'
                      color='error'
                      className={classes.errorField}
                    >
                      <InfoIcon
                        color='error'
                        fontSize='small'
                        className={classes.errorIcon}
                      />
                      {errors.structuringEmail.message}
                    </Typography>
                  )}
                  {errors.structuringEmail === ' ' && (
                    <Typography
                      variant='caption'
                      color='error'
                      className={classes.errorField}
                    >
                      <InfoIcon
                        color='error'
                        fontSize='small'
                        className={classes.errorIcon}
                      />
                      {errors.structuringEmail.message}
                    </Typography>
                  )}
                </Grid>
                <div className={classes.titles}>
                  <Typography
                    color='primary'
                    component='h1'
                    variant='h5'
                    gutterBottom
                  >
                    Datos de quien registra el proyecto
                  </Typography>
                </div>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    name='registerName'
                    id='registerName'
                    label='Nombre de quien registra el Proyecto'
                    inputRef={register({ required: true })}
                    variant='outlined'
                    className={classes.TextField}
                    fullWidth
                  />
                  {errors.registerName && (
                    <Typography variant='caption' color='error'>
                      <InfoIcon color='error' fontSize='small' />
                      Campo obligatorio
                    </Typography>
                  )}
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    name='registerPhone'
                    id='registerPhone'
                    label='Teléfono de quien registra'
                    inputRef={register({ required: true })}
                    variant='outlined'
                    className={classes.TextField}
                    fullWidth
                  />
                  {errors.registerPhone && (
                    <Typography variant='caption' color='error'>
                      <InfoIcon color='error' fontSize='small' />
                      Campo obligatorio
                    </Typography>
                  )}
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    name='registerAddress'
                    id='registerAddress'
                    label='Dirección de quien registra'
                    inputRef={register({ required: true })}
                    className={classes.TextField}
                    variant='outlined'
                    fullWidth
                  />
                  {errors.registerAddress && (
                    <Typography variant='caption' color='error'>
                      <InfoIcon color='error' fontSize='small' />
                      Campo obligatorio
                    </Typography>
                  )}
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    className={classes.TextField}
                    name='registerEmail'
                    id='registerEmail'
                    label='Email de quien registra'
                    variant='outlined'
                    inputRef={register({
                      required: 'Campo obligatorio',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Formato de correo inválido'
                      }
                    })}
                    fullWidth
                  />
                  {errors.registerEmail && (
                    <Typography
                      variant='caption'
                      color='error'
                      className={classes.errorField}
                    >
                      <InfoIcon
                        color='error'
                        fontSize='small'
                        className={classes.errorIcon}
                      />
                      {errors.registerEmail.message}
                    </Typography>
                  )}
                  {errors.registerEmail === ' ' && (
                    <Typography
                      variant='caption'
                      color='error'
                      className={classes.errorField}
                    >
                      <InfoIcon
                        color='error'
                        fontSize='small'
                        className={classes.errorIcon}
                      />
                      {errors.registerEmail.message}
                    </Typography>
                  )}
                </Grid>

                <div className={classes.titles}>
                  <div className={classes.button}>
                    <Button
                      color='primary'
                      variant='contained'
                      fullWidth
                      type='submit'
                    >
                      Guardar
                    </Button>
                  </div>
                </div>
              </Grid>
            </Card>
          </div>
        </form>
      </Container>
    </Layout>
  )
}

export default ComponentNewProject