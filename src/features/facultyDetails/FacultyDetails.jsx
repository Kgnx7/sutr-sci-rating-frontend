import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams, Link as RouterLink } from 'react-router-dom'

import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'

import {
  SortingState,
  SearchState,
  IntegratedSorting,
  IntegratedFiltering,
} from '@devexpress/dx-react-grid'
import { tableHeaderMessages, tableMessages, searchPanelMessages } from '../../utils/localization'
import {
  Grid,
  Table,
  TableHeaderRow,
  SearchPanel,
  Toolbar,
} from '@devexpress/dx-react-grid-material-ui'

import Header from '../../components/Header'
import { Can } from '../../components/Can'

import { getDepartmentsByFaculty } from '../departmentsList/departmentsSlice'
import { getFaculty, deleteFaculty } from './facultySlice'

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
  gutterTop: {
    marginTop: theme.spacing(3),
  },
  gutterAll: {
    margin: theme.spacing(3),
  },
}))

function FacultyInfo({ faculty }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  const handleDelete = () => {
    dispatch(deleteFaculty(faculty.id, history))
  }

  return (
    <>
      <Typography>{`Наименование: ${faculty.title || ''}`}</Typography>
      <Typography>{`Сокращение: ${faculty.short || ''}`}</Typography>
      <Typography>{`Декан: ${faculty.dean}`}</Typography>
      <Typography>{`Зам. декана по научной наботе: ${faculty.deanAssistant}`}</Typography>
      <Typography>{`Адресс: ${faculty.address || ''}`}</Typography>
      <Typography>{`Телефон: ${faculty.phone || ''}`}</Typography>
      <Typography>{`Электронная почта: ${faculty.email || ''}`}</Typography>

      <div>
        <Can I="edit" a="Faculty">
          <Link component={RouterLink} to={`/faculties/${faculty.id}/edit`}>
            <Button variant="contained" color="primary" className={classes.gutterAll}>
              Редактировать
            </Button>
          </Link>
        </Can>
        <Can I="delete" a="Faculty">
          <Button
            variant="contained"
            color="secondary"
            className={classes.gutterAll}
            onClick={() => handleDelete(faculty.id)}
          >
            Удалить
          </Button>
        </Can>
      </div>
    </>
  )
}

const DepartmentsListColumns = [
  { name: 'title', title: 'Наименование' },
  { name: 'short', title: 'Сокращение' },
  { name: 'manager', title: 'Заведующий' },
]

const TableRow = ({ row, ...restProps }) => {
  const history = useHistory()

  const handleRowClick = () => {
    history.push(`/departments/${row.id}`)
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
  const dispatch = useDispatch()
  const history = useHistory()
  const departments = useSelector((state) => state.departments.departments)
  const classes = useStyles()

  useEffect(() => {
    dispatch(getDepartmentsByFaculty(facultyId, history))
  }, [])

  return (
    <>
      <Can I="create" a="Department">
        <Link component={RouterLink} to={`/departments/create`}>
          <Button variant="contained" color="primary" className={classes.gutterAll}>
            Добавить
          </Button>
        </Link>
      </Can>
      <Paper>
        <Grid rows={departments} columns={DepartmentsListColumns}>
          <SearchState value={searchValue} onValueChange={setSearchState} />
          <SortingState />
          <IntegratedSorting />
          <IntegratedFiltering />
          <Table messages={tableMessages} rowComponent={TableRow} />
          <TableHeaderRow showSortingControls messages={tableHeaderMessages} />
          <Toolbar />
          <SearchPanel messages={searchPanelMessages} />
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
