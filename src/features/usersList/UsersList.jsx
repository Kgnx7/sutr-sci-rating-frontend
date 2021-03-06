import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import debounce from '../../utils/debounce'
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { Can } from '../../components/Can'

import {
  SortingState,
  SearchState,
  PagingState,
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
} from '@devexpress/dx-react-grid-material-ui'

import Paper from '@material-ui/core/Paper'
import Header from '../../components/Header'
import Container from '@material-ui/core/Container'
import { tableHeaderMessages, tableMessages, searchPanelMessages } from '../../utils/localization'
import { getAllUsers } from './usersSlice'

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 100,
  },
  gutterTop: {
    marginTop: theme.spacing(3),
  },
  gutterBottom: {
    marginBottom: theme.spacing(3),
  },
}))

const columns = [
  { name: 'login', title: 'Логин' },
  { name: 'displayName', title: 'ФИО' },
  { name: 'academicRank', title: 'Ученое знавание' },
]

const PAGE_SIZE = 10

const TableRow = ({ row, ...restProps }) => {
  const history = useHistory()

  const handleRowClick = () => {
    history.push(`/users/get/${row.id}`)
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
  const users = useSelector((state) => state.usersList.users)
  const totalCount = useSelector((state) => state.usersList.count)

  useEffect(() => {
    dispatch(getAllUsers(searchValue, PAGE_SIZE * currentPage, PAGE_SIZE, history))
  }, [])

  const handleCurrentPageChange = (page) => {
    setCurrentPage(page)
    dispatch(getAllUsers(searchValue, PAGE_SIZE * page, PAGE_SIZE, history))
  }

  const handleSearchChangeDebounced = useRef(
    debounce((search) => {
      dispatch(getAllUsers(search, PAGE_SIZE * currentPage, PAGE_SIZE, history))
    }, 1000)
  ).current

  const handleSearchChange = (search) => {
    setSearchState(search)
    handleSearchChangeDebounced(search)
  }

  return (
    <>
      <Header />
      <Container className={classes.container}>
        <Typography variant="h2" gutterBottom>
          Список преподавателей
        </Typography>
        <Can I="create" a="User">
          <Link component={RouterLink} to={`/users/create`}>
            <Button
              variant="contained"
              color="primary"
              className={`${classes.gutterTop} ${classes.gutterBottom}`}
            >
              Создать пользователя
            </Button>
          </Link>
        </Can>
        <Paper>
          <Grid rows={users} columns={columns}>
            <SearchState value={searchValue} onValueChange={handleSearchChange} />
            <SortingState />
            <PagingState
              currentPage={currentPage}
              onCurrentPageChange={handleCurrentPageChange}
              pageSize={PAGE_SIZE}
            />
            <IntegratedSorting />
            <Table messages={tableMessages} rowComponent={TableRow} />
            <TableHeaderRow showSortingControls messages={tableHeaderMessages} />
            <CustomPaging totalCount={totalCount} />
            <Toolbar />
            <SearchPanel messages={searchPanelMessages} />
            <PagingPanel />
          </Grid>
        </Paper>
      </Container>
    </>
  )
}
