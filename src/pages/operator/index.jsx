import React, { useEffect, useState } from 'react'
import Layout from 'components/Layout'
import DownloadPDF from 'components/DownloadPDF'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProjects } from 'dux/projectsSlice'
import { fetchOrganizations } from 'dux/organizationsSlice'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableSortLabel,
  Paper,
  Box,
  Typography,
  TableRow,
  Container,
  Button
} from '@material-ui/core'
import Animations from 'components/Animations'
import { getProjectTypesById } from 'lib/helpers'
export { getServerSideProps } from 'lib/ssr'

function descendingComparator (a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator (order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort (array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

const headCells = [
  { id: 'id', numeric: true, label: 'Número' },
  { id: 'name_project', numeric: false, label: 'Nombre del proyecto' },
  { id: 'type_project', numeric: false, label: 'Tipo de proyecto' },
  { id: 'qoute_numbers_project', numeric: false, label: 'Valor del proyecto' },
  { id: 'structuring_name', numeric: false, label: 'Formulado por' },
  { id: 'certificado', numeric: false, label: 'Certificado' }
]

function EnhancedTableHead (props) {
  const { classes, order, orderBy, onRequestSort } = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox' />
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (<span className={classes.visuallyHidden}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</span>) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired
}

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2)
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  },
  box: {
    marginBottom: theme.spacing(1)
  }
}))

export default function ListProjects () {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('calories')
  const [selected] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const isLoading = useSelector((state) => state.projects.isLoading)
  const projects = useSelector((state) => state.projects.data)

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

  const organizations = useSelector(state => state.organizations.data)
  useEffect(() => {
    dispatch(fetchOrganizations())
  }, [dispatch])
  const aws = organizations[0]

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = (id) => selected.indexOf(id) !== -1

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, projects.length - page * rowsPerPage)

  if (isLoading) {
    return (
      <Animations />
    )
  }

  return (
    <Layout pageTitle='listar usuarios'>
      <Container className={classes.container}>
        <Box display='flex' justifyContent='space-between' className={classes.box}>
          <Typography variant='h4' color='primary'>
            Listar proyectos
          </Typography>
        </Box>

        <Paper className={classes.paper}>
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby='tableTitle'
              aria-label='enhanced table'
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={projects.length}
              />
              <TableBody>
                {stableSort(projects, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row._id)
                    const labelId = `enhanced-table-checkbox-${index}`

                    return (
                      <TableRow
                        hover
                        role='checkbox'
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row._id}
                        selected={isItemSelected}
                      >
                        <TableCell padding='checkbox' />
                        <TableCell component='th' id={labelId} scope='row'>
                          {index + 1}
                        </TableCell>
                        <TableCell align='left'>{row.projectName}</TableCell>
                        <TableCell align='left'>{getProjectTypesById(row.projectType)?.value}</TableCell>
                        <TableCell align='left'>
                          ${' '}{row.projectValueInNumbers}
                        </TableCell>
                        <TableCell align='left'>{row.structuringName}</TableCell>

                        <TableCell align='left'>
                          <Button>
                            <DownloadPDF
                              awsURL={aws}
                              projectName={row.projectName}
                              projectLocation={row.projectLocation}
                              projectValueInLetters={row.projectValueInLetters}
                              projectValueInNumbers={row.projectValueInNumbers}
                            />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                {emptyRows > 0 && (
                  <TableRow>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={projects.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
    </Layout>
  )
}
