import React, { useState, useEffect } from 'react'
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
import { getFaculty, getFacultyDepartments } from './facultySlice'
import {
  VirtualTableState,
  SortingState,
  SearchState,
  PagingState,
  IntegratedSorting,
  IntegratedFiltering,
  IntegratedPaging,
} from '@devexpress/dx-react-grid'
import { tableHeaderMessages, tableMessages } from '../../utils/localization'
import {
  Grid,
  VirtualTable,
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

function FacultyInfo({ faculty }) {
  return (
    <>
      <Typography>{`Наименование: ${faculty.title || ''}`}</Typography>
      <Typography>{`Сокращение: ${faculty.short || ''}`}</Typography>
      <Typography>{`Декан: ${faculty.dean}`}</Typography>
      {/* <Typography>{`Декан: ${faculty.dean}`}</Typography> */}
      <Typography>{`Адресс: ${faculty.address || ''}`}</Typography>
      <Typography>{`Телефон: ${faculty.phone || ''}`}</Typography>
      <Typography>{`Электронная почта: ${faculty.email || ''}`}</Typography>
    </>
  )
}

const DepartmentsListColumns = [
  { name: 'short', title: 'Наименование' },
  { name: 'manager', title: 'Заведующий' },
  { name: 'address', title: 'Адресс' },
  { name: 'phone', title: 'Телефон' },
  { name: 'email', title: 'Электронная почта' },
]

const VIRTUAL_PAGE_SIZE = 100

const TableRow = ({ row, ...restProps }) => {
  const history = useHistory()

  const handleRowClick = () => {
    history.push(`/faculties/${row.facultyId}/departments/${row.id}`)
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

function FacultyDepartments({ facultyId }) {
  const [searchValue, setSearchState] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const dispatch = useDispatch()
  const history = useHistory()
  const departments = useSelector((state) => state.faculty.departments)
  const loading = useSelector((state) => state.faculty.loading)

  const getDepartments = () => {
    dispatch(getFacultyDepartments(facultyId, history))
  }

  return (
    <>
      <Paper>
        <Grid rows={departments} columns={DepartmentsListColumns}>
          <SearchState value={searchValue} onValueChange={setSearchState} />
          <SortingState />
          <PagingState
            currentPage={currentPage}
            onCurrentPageChange={setCurrentPage}
            pageSize={20}
          />
          <IntegratedSorting />
          <IntegratedFiltering />
          <IntegratedPaging />
          <VirtualTableState
            loading={loading}
            totalRowCount={departments.lenght}
            pageSize={VIRTUAL_PAGE_SIZE}
            skip={0}
            getRows={getDepartments}
          />
          <VirtualTable messages={tableMessages} rowComponent={TableRow} />
          <TableHeaderRow showSortingControls messages={tableHeaderMessages} />
          <Toolbar />
          <SearchPanel />
          <PagingPanel />
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

export default function FacultyShow() {
  const [tab, setTab] = useState(0)
  const dispatch = useDispatch()
  const { id } = useParams()
  const faculty = useSelector((state) => state.faculty.faculty)
  const history = useHistory()

  useEffect(() => {
    dispatch(getFaculty(id, history))
  }, [])

  const classes = useStyles()

  const handleTabChange = (event, newValue) => {
    setTab(newValue)
  }

  return (
    <>
      <Header />
      <Container className={classes.profileContainer}>
        {faculty && (
          <>
            <Typography variant="h2" gutterBottom>
              {faculty.short}
            </Typography>
            <Tabs value={tab} onChange={handleTabChange} aria-label="Разделы факультета">
              <Tab label="Общая информация" />
              <Tab label="Кафедры" />
            </Tabs>
            <Box mt={3}>
              <TabPanel value={tab} index={0}>
                <FacultyInfo faculty={faculty} />
              </TabPanel>
              <TabPanel value={tab} index={1}>
                <FacultyDepartments facultyId={faculty.id} />
              </TabPanel>
            </Box>
          </>
        )}
      </Container>
    </>
  )
}
