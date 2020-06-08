import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Header from '../../components/Header'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { SortingState, EditingState, IntegratedSorting } from '@devexpress/dx-react-grid'
import { Grid, Table, TableHeaderRow, TableEditColumn } from '@devexpress/dx-react-grid-material-ui'
import { getAllAcademicRanks, deleteAcademicRank } from './academicRanksSlice'
import { tableHeaderMessages, tableMessages, editColumnMessages } from '../../utils/localization'

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

export default function AcademicRankList() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const academicRanks = useSelector((state) => state.academicRanks.academicRanks)

  useEffect(() => {
    dispatch(getAllAcademicRanks(history))
  }, [])

  const commitChanges = ({ deleted }) => {
    const academicRankId = academicRanks[deleted].id

    dispatch(deleteAcademicRank(academicRankId, history))
  }

  const handleAddAcademicRank = () => {
    history.push('/academicRanks/create')
  }

  return (
    <>
      <Header />
      <Container className={classes.container}>
        <Typography variant="h2" gutterBottom>
          Список академических званий
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddAcademicRank}
          className={classes.addBtn}
        >
          Добавить
        </Button>
        <Paper>
          <Grid rows={academicRanks} columns={columns}>
            <SortingState />
            <EditingState onCommitChanges={commitChanges} />
            <IntegratedSorting />
            <Table messages={tableMessages} />
            <TableHeaderRow showSortingControls messages={tableHeaderMessages} />
            <TableEditColumn showDeleteCommand messages={editColumnMessages} />
          </Grid>
        </Paper>
      </Container>
    </>
  )
}
