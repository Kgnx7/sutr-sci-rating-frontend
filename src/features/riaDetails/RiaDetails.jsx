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

import { getRia } from './riaDetailsSlice'

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
  gutterBottom: {
    marginBottom: theme.spacing(3),
  },
  gutterAll: {
    margin: theme.spacing(3),
  },
}))

function RiaInfo({ riaDetails }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  const handleDelete = () => {
    // dispatch(deleteRiaType(riaType.id, history))
  }

  return (
    <>
      <Typography>{`Наименование: ${riaDetails.title || ''}`}</Typography>
      <Typography>{`Авторы: ${riaDetails.authors || ''}`}</Typography>
      <Typography>{`Описание: ${riaDetails.description || ''}`}</Typography>
      <Typography>{`Тип РИД: ${riaDetails.riaDetails || ''}`}</Typography>
      <Typography>{`Тип НИР: ${riaDetails.rsType || ''}`}</Typography>
      <Typography>{`Статус РИД: ${riaDetails.riaStatus || ''}`}</Typography>

      <div>
        {/* <Can I="edit" a="RiaType">
          <Link component={RouterLink} to={`/riaTypes/edit/${riaType.id}`}>
            <Button variant="contained" color="primary" className={classes.gutterAll}>
              Редактировать
            </Button>
          </Link>
        </Can>
        <Can I="delete" a="RiaType">
          <Button
            variant="contained"
            color="secondary"
            className={classes.gutterAll}
            onClick={() => handleDelete(riaType.id)}
          >
            Удалить
          </Button>
        </Can> */}
      </div>
    </>
  )
}

function RiaAuthors({ riaDetails }) {
  const [searchValue, setSearchState] = useState('')
  const classes = useStyles()

  const columns = [
    { name: 'displayName', title: 'ФИО' },
    { name: 'role', title: 'Роль' },
    { name: 'part', title: 'Часть' },
  ]

  return (
    <>
      {/* <Can I="edit" a="RiaType">
        <Link component={RouterLink} to={`/riaTypes/${riaTypeId}/addProperty`}>
          <Button variant="contained" color="primary" className={classes.gutterBottom}>
            Добавить
          </Button>
        </Link>
      </Can> */}
      <Paper>
        <Grid rows={riaDetails.users || []} columns={columns}>
          <SearchState value={searchValue} onValueChange={setSearchState} />
          <SortingState />
          <IntegratedSorting />
          <IntegratedFiltering />
          <Table messages={tableMessages} />
          <TableHeaderRow showSortingControls messages={tableHeaderMessages} />
          <Toolbar />
          <SearchPanel messages={searchPanelMessages} />
        </Grid>
      </Paper>
    </>
  )
}

function RiaProperties({ riaDetails }) {
  const [searchValue, setSearchState] = useState('')
  const classes = useStyles()

  const columns = [
    { name: 'title', title: 'Наименование' },
    { name: 'value', title: 'Значение' },
  ]

  return (
    <>
      <Can I="edit" a="Ria">
        <Link component={RouterLink} to={`/ria/${riaDetails.id}/addProperty`}>
          <Button variant="contained" color="primary" className={classes.gutterBottom}>
            Добавить
          </Button>
        </Link>
      </Can>
      <Paper>
        <Grid rows={riaDetails.properties || []} columns={columns}>
          <SearchState value={searchValue} onValueChange={setSearchState} />
          <SortingState />
          <IntegratedSorting />
          <IntegratedFiltering />
          <Table messages={tableMessages} />
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

export default function RiaDetails() {
  const [tab, setTab] = useState(0)
  const dispatch = useDispatch()
  const { id } = useParams()
  const riaDetails = useSelector((state) => state.riaDetails.ria)
  const history = useHistory()

  useEffect(() => {
    dispatch(getRia(id, history))
  }, [])

  const classes = useStyles()

  const handleTabChange = (event, newValue) => {
    setTab(newValue)
  }

  return (
    <>
      <Header />
      <Container className={classes.profileContainer}>
        {riaDetails && (
          <>
            <Typography variant="h2" gutterBottom>
              {riaDetails.short}
            </Typography>
            <Tabs value={tab} onChange={handleTabChange}>
              <Tab label="Общая информация" />
              <Tab label="Авторы" />
              <Tab label="Свойства" />
            </Tabs>
            <Box mt={3}>
              <TabPanel value={tab} index={0}>
                <RiaInfo riaDetails={riaDetails} />
              </TabPanel>
              <TabPanel value={tab} index={1}>
                <RiaAuthors riaDetails={riaDetails} />
              </TabPanel>
              <TabPanel value={tab} index={2}>
                <RiaProperties riaDetails={riaDetails} />
              </TabPanel>
            </Box>
          </>
        )}
      </Container>
    </>
  )
}
