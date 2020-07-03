import React, { useState, useEffect, useRef } from 'react'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import { getDepartment, getUsersByDepartment } from './departmentSlice'
import debounce from '../../utils/debounce'

import {
  SortingState,
  SearchState,
  PagingState,
  IntegratedSorting,
  IntegratedFiltering,
  CustomPaging,
} from '@devexpress/dx-react-grid'
import { tableHeaderMessages, tableMessages } from '../../utils/localization'
import {
  Grid,
  Table,
  TableHeaderRow,
  SearchPanel,
  PagingPanel,
  Toolbar,
} from '@devexpress/dx-react-grid-material-ui'

import Header from '../../components/Header'

const useStyles = makeStyles((theme) => ({
  profileContainer: {
    paddingTop: 100,
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  text: {
    marginTop: theme.spacing(3),
  },
}))

function DepartmentInfo({ department }) {
  return (
    <>
      <Typography>{`Наименование: ${department.title || ''}`}</Typography>
      <Typography>{`Сокращение: ${department.short || ''}`}</Typography>
      <Typography>{`Заведующий: ${department.manager}`}</Typography>
      <Typography>{`Факультет: ${department.faculty}`}</Typography>
      <Typography>{`Адресс: ${department.address || ''}`}</Typography>
      <Typography>{`Телефон: ${department.phone || ''}`}</Typography>
      <Typography>{`Электронная почта: ${department.email || ''}`}</Typography>
    </>
  )
}

const DepartmentUsersColumns = [
  // { name: 'login', title: 'Логин' },
  { name: 'displayName', title: 'ФИО' },
  { name: 'position', title: 'Должность' },
]

const TableRow = ({ row, ...restProps }) => {
  const history = useHistory()

  const handleRowClick = () => {
    history.push(`/users/${row.userId}`)
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

const PAGE_SIZE = 10

function UsersByDepartment({ departmentId }) {
  const [searchValue, setSearchState] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const dispatch = useDispatch()
  const history = useHistory()
  const users = useSelector((state) => state.department.users)
  const totalCount = useSelector((state) => state.department.usersCount)

  useEffect(() => {
    dispatch(
      getUsersByDepartment(departmentId, searchValue, PAGE_SIZE * currentPage, PAGE_SIZE, history)
    )
  }, [])

  const handleCurrentPageChange = (page) => {
    setCurrentPage(page)
    dispatch(
      getUsersByDepartment(departmentId, searchValue, PAGE_SIZE * currentPage, PAGE_SIZE, history)
    )
  }

  const handleSearchChangeDebounced = useRef(
    debounce(() => {
      dispatch(
        getUsersByDepartment(departmentId, searchValue, PAGE_SIZE * currentPage, PAGE_SIZE, history)
      )
    }, 1000)
  ).current

  const handleSearchChange = (search) => {
    setSearchState(search)
    handleSearchChangeDebounced(search)
  }

  return (
    <>
      <Paper>
        <Grid rows={users} columns={DepartmentUsersColumns}>
          <SearchState value={searchValue} onValueChange={handleSearchChange} />
          <SortingState />
          <PagingState
            currentPage={currentPage}
            onCurrentPageChange={handleCurrentPageChange}
            pageSize={PAGE_SIZE}
          />
          <IntegratedSorting />
          <IntegratedFiltering />
          <Table messages={tableMessages} rowComponent={TableRow} />
          <TableHeaderRow showSortingControls messages={tableHeaderMessages} />
          <Toolbar />
          <SearchPanel />
          <PagingPanel />
          <CustomPaging totalCount={totalCount} />
        </Grid>
      </Paper>
    </>
  )
}

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  )
}

export default function DepartmentShow() {
  const [tab, setTab] = useState(0)
  const { id } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const department = useSelector((state) => state.department.department)

  useEffect(() => {
    dispatch(getDepartment(id, history))
  }, [])

  const classes = useStyles()

  const handleTabChange = (event, newValue) => {
    setTab(newValue)
  }

  return (
    <>
      <Header />
      <Container className={classes.profileContainer}>
        {department && (
          <>
            <Typography variant="h2" gutterBottom>
              {department.short}
            </Typography>
            <Tabs value={tab} onChange={handleTabChange} aria-label="Разделы факультета">
              <Tab label="Общая информация" />
              <Tab label="Сотрудники" />
            </Tabs>
            <Box mt={3}>
              <TabPanel value={tab} index={0}>
                <DepartmentInfo department={department} />
              </TabPanel>
              <TabPanel value={tab} index={1}>
                <UsersByDepartment departmentId={department.id} />
              </TabPanel>
            </Box>
          </>
        )}
      </Container>
    </>
  )
}
