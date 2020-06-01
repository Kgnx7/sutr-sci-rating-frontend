import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Header from '../../components/Header'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { VirtualTableState, SortingState, IntegratedSorting } from '@devexpress/dx-react-grid'
import { Grid, VirtualTable, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui'
import { getAllAcademicDegrees } from './academicDegreesSlice'
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

const columns = [{ name: 'title', title: 'Наименование' }]

const VIRTUAL_PAGE_SIZE = 100

export default function AcademicDegreeList() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const academicDegrees = useSelector((state) => state.academicDegrees.academicDegrees)
  const loading = useSelector((state) => state.academicDegrees.loading)

  const getAcademicDegrees = () => {
    dispatch(getAllAcademicDegrees(history))
  }

  return (
    <>
      <Header />
      <Container className={classes.container}>
        <Typography variant="h2" gutterBottom>
          Список академических степеней
        </Typography>
        <Paper>
          <Grid rows={academicDegrees} columns={columns}>
            <SortingState />
            <IntegratedSorting />
            <VirtualTableState
              loading={loading}
              totalRowCount={academicDegrees.lenght}
              pageSize={VIRTUAL_PAGE_SIZE}
              skip={0}
              getRows={getAcademicDegrees}
            />
            <VirtualTable messages={tableMessages} />
            <TableHeaderRow showSortingControls messages={tableHeaderMessages} />
          </Grid>
        </Paper>
      </Container>
    </>
  )
}
