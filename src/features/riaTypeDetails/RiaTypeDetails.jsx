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

import { getRiaType, deleteRiaType } from './riaTypeDetailsSlice'

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

function RiaTypeInfo({ riaType }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  const handleDelete = () => {
    dispatch(deleteRiaType(riaType.id, history))
  }

  return (
    <>
      <Typography>{`Наименование: ${riaType.title || ''}`}</Typography>
      <Typography>{`Единица измерения: ${riaType.unit || ''}`}</Typography>
      <Typography>{`Баллы за единицу: ${riaType.perUnit || ''}`}</Typography>
      <Typography>{`Тип: ${riaType.generalType || ''}`}</Typography>
      <Typography>{`Описание: ${riaType.description || ''}`}</Typography>

      <div>
        {/* <Can I="edit" a="RiaType">
          <Link component={RouterLink} to={`/riaTypes/${riaType.id}/edit`}>
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

const PropertiesListColumns = [
  { name: 'title', title: 'Наименование' },
  { name: 'dataType', title: 'Тип данных' },
]

function RiaTypeProperty({ properties }) {
  const [searchValue, setSearchState] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles()

  return (
    <>
      {/* <Can I="create" a="Department">
        <Link component={RouterLink} to={`/departments/create`}>
          <Button variant="contained" color="primary" className={classes.gutterAll}>
            Добавить
          </Button>
        </Link>
      </Can> */}
      <Paper>
        <Grid rows={properties || []} columns={PropertiesListColumns}>
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

export default function RiaTypeShow() {
  const [tab, setTab] = useState(0)
  const dispatch = useDispatch()
  const { id } = useParams()
  const riaType = useSelector((state) => state.riaTypesDetails.riaType)
  const history = useHistory()

  useEffect(() => {
    dispatch(getRiaType(id, history))
  }, [])

  const classes = useStyles()

  const handleTabChange = (event, newValue) => {
    setTab(newValue)
  }

  return (
    <>
      <Header />
      <Container className={classes.profileContainer}>
        {riaType && (
          <>
            <Typography variant="h2" gutterBottom>
              {riaType.short}
            </Typography>
            <Tabs value={tab} onChange={handleTabChange} aria-label="Разделы факультета">
              <Tab label="Общая информация" />
              <Tab label="Свойства" />
            </Tabs>
            <Box mt={3}>
              <TabPanel value={tab} index={0}>
                <RiaTypeInfo riaType={riaType} />
              </TabPanel>
              <TabPanel value={tab} index={1}>
                <RiaTypeProperty properties={riaType.specifications} />
              </TabPanel>
            </Box>
            <Can I="edit" a="RiaType">
              <Link component={RouterLink} to={`/riaTypes/edit/${riaType.id}`}>
                <Button variant="contained" color="primary" className={classes.gutterAll}>
                  Редактировать
                </Button>
              </Link>
            </Can>
          </>
        )}
      </Container>
    </>
  )
}
