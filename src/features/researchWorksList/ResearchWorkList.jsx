import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import debounce from '../../utils/debounce'

import {
  SortingState,
  SearchState,
  PagingState,
  EditingState,
  IntegratedSorting,
  CustomPaging,
} from '@devexpress/dx-react-grid'

import {
  Grid,
  Table,
  TableHeaderRow,
  SearchPanel,
  PagingPanel,
  Toolbar,
  TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui'

import Paper from '@material-ui/core/Paper'
import Header from '../../components/Header'
import Container from '@material-ui/core/Container'
import { tableHeaderMessages, tableMessages, editColumnMessages } from '../../utils/localization'
import { getAllResearchWorks } from './researchWorksSlice'

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 100,
  },
  addUserBtn: {
    marginTop: 15,
    marginBottom: 15,
  },
}))

const columns = [
  { name: 'title', title: 'Наименование' },
  // { name: 'displayName', title: 'ФИО' },
  // { name: 'position', title: 'Должность' },
]

const PAGE_SIZE = 10

const TableRow = ({ row, ...restProps }) => {
  const history = useHistory()

  const handleRowClick = () => {
    history.push(`/researchWorks/${row.id}`)
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

export default function UserList() {
  const [searchValue, setSearchState] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const researchWorks = useSelector((state) => state.researchWorks.researchWorks)
  const totalCount = useSelector((state) => state.researchWorks.count)

  // const handleAddUser = () => {
  //   history.push('/researchWorks/create')
  // }

  useEffect(() => {
    dispatch(getAllResearchWorks(searchValue, PAGE_SIZE * currentPage, PAGE_SIZE, history))
  }, [])

  const handleCurrentPageChange = (page) => {
    setCurrentPage(page)
    dispatch(getAllResearchWorks(searchValue, PAGE_SIZE * page, PAGE_SIZE, history))
  }

  const handleSearchChangeDebounced = useRef(
    debounce((search) => {
      dispatch(getAllResearchWorks(search, PAGE_SIZE * currentPage, PAGE_SIZE, history))
    }, 1000)
  ).current

  const handleSearchChange = (search) => {
    setSearchState(search)
    handleSearchChangeDebounced(search)
  }

  // const commitChanges = ({ deleted }) => {
  //   const userId = researchWorks[deleted].id

  //   dispatch(deleteUser(userId))
  // }

  return (
    <>
      <Header />
      <Container className={classes.container}>
        <Typography variant="h2" gutterBottom>
          РИДЫ
        </Typography>
        {/* <Button
          variant="contained"
          color="primary"
          onClick={handleAddUser}
          className={classes.addUserBtn}
        >
          Добавить пользователя
        </Button> */}
        <Paper>
          <Grid rows={researchWorks} columns={columns}>
            <SearchState value={searchValue} onValueChange={handleSearchChange} />
            <SortingState />
            <PagingState
              currentPage={currentPage}
              onCurrentPageChange={handleCurrentPageChange}
              pageSize={PAGE_SIZE}
            />
            {/* <EditingState onCommitChanges={commitChanges} /> */}
            <IntegratedSorting />
            <Table messages={tableMessages} rowComponent={TableRow} />
            <TableHeaderRow showSortingControls messages={tableHeaderMessages} />
            <CustomPaging totalCount={totalCount} />
            <Toolbar />
            <SearchPanel />
            <PagingPanel />
            {/* <TableEditColumn showDeleteCommand messages={editColumnMessages} /> */}
          </Grid>
        </Paper>
      </Container>
    </>
  )
}
