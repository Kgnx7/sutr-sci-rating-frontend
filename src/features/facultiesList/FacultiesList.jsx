import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Header from '../../components/Header'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { SortingState, IntegratedSorting } from '@devexpress/dx-react-grid'
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui'
import { getAllFaculties } from './facultiesSlice'
import { tableHeaderMessages, tableMessages } from '../../utils/localization'

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 100,
  },
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
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
    width: 1,
  },
}))

const columns = [
  { name: 'title', title: 'Наименование' },
  { name: 'short', title: 'Сокращение' },
]

const TableRow = ({ row, ...restProps }) => {
  const history = useHistory()

  const handleRowClick = () => {
    history.push(`/faculties/${row.id}`)
  }

  return (
    <Table.Row
      {...restProps}
      onClick={handleRowClick}
      style={{
        cursor: 'pointer',
      }}
    />
  )
}

export default function FacultyList() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const faculties = useSelector((state) => state.faculties.faculties)

  useEffect(() => {
    dispatch(getAllFaculties(history))
  }, [])

  const handleCreate = () => {
    history.push('/faculties/create')
  }

  return (
    <>
      <Header />
      <Container className={classes.container}>
        <Typography variant="h2" gutterBottom>
          Список факультетов
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreate}
          className={classes.addBtn}
        >
          Добавить
        </Button>
        <Paper>
          <Grid rows={faculties} columns={columns}>
            <SortingState />
            <IntegratedSorting />
            <Table messages={tableMessages} rowComponent={TableRow} />
            <TableHeaderRow showSortingControls messages={tableHeaderMessages} />
          </Grid>
        </Paper>
      </Container>
    </>
  )
}
