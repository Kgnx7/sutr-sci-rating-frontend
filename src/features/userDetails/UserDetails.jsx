import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import Header from '../../components/Header'
import { getUser } from './userDetailsSlice'
import {
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
  Table,
  TableHeaderRow,
  SearchPanel,
  PagingPanel,
  Toolbar,
} from '@devexpress/dx-react-grid-material-ui'

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
  createButton: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}))

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

const ResearchWorks = ({ researchWorks }) => {
  const [searchValue, setSearchState] = useState('')
  const classes = useStyles()
  const history = useHistory()

  const reseachWorksColumns = [
    { name: 'title', title: 'Наименование' },
    { name: 'description', title: 'Описание' },
    { name: 'authors', title: 'Авторы' },
  ]

  const tableColumnExtensions = [
    { columnName: 'title', wordWrapEnabled: true },
    { columnName: 'description', wordWrapEnabled: true },
    { columnName: 'authors', wordWrapEnabled: true },
  ]

  const handleCreateResearchWork = () => {
    history.push(`/researchWorks/create`)
  }

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateResearchWork}
        className={classes.createButton}
      >
        Добавить РИД
      </Button>
      <Paper>
        <Grid rows={researchWorks} columns={reseachWorksColumns}>
          <SearchState value={searchValue} onValueChange={setSearchState} />
          <SortingState />
          <IntegratedSorting />
          <IntegratedFiltering />
          <Table
            messages={tableMessages}
            rowComponent={TableRow}
            columnExtensions={tableColumnExtensions}
          />
          <TableHeaderRow showSortingControls messages={tableHeaderMessages} />
          <Toolbar />
          <SearchPanel />
        </Grid>
      </Paper>
    </>
  )
}

const UserInfo = ({ user }) => {
  const classes = useStyles()
  return (
    <>
      <Avatar src="/avatar.jpg" className={classes.avatar} />
      <Typography className={classes.text}>{`Логин: ${user.login}`}</Typography>
      <Typography>{`ФИО: ${user.displayName}`}</Typography>
      <Typography>{`Должность: ${user.position || ''}`}</Typography>
      <Typography>{`Кафедра: ${user.department || ''}`}</Typography>
      <Typography>{`Ученая степень: ${user.academicDegree || ''}`}</Typography>
      <Typography>{`Ученое звание: ${user.academicDegree || ''}`}</Typography>
    </>
  )
}

export default function UserDetails() {
  const [tab, setTab] = useState(0)
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles()
  const { id } = useParams()
  const user = useSelector((state) => state.userDetails.user)

  useEffect(() => {
    dispatch(getUser(id, history))
  }, [])

  const handleBack = () => {
    history.goBack()
  }

  // const handleEditUser = () => {
  //   history.push(`/user/${id}/edit`)
  // }

  const handleTabChange = (event, newValue) => {
    setTab(newValue)
  }

  return (
    <>
      <Header />
      <Container className={classes.profileContainer}>
        <IconButton aria-label="назад" onClick={handleBack}>
          <ArrowBackIosIcon />
        </IconButton>
        {user ? (
          <>
            <Tabs value={tab} onChange={handleTabChange} aria-label="Разделы факультета">
              <Tab label="Общая информация" />
              <Tab label="РИДЫ" />
            </Tabs>
            <Box mt={3}>
              <TabPanel value={tab} index={0}>
                <UserInfo user={user} />
              </TabPanel>
              <TabPanel value={tab} index={1}>
                <ResearchWorks researchWorks={user.researchWorks} />
              </TabPanel>
            </Box>
          </>
        ) : (
          <Typography className={classes.text}>Нет информации о пользователе</Typography>
        )}
      </Container>
    </>
  )
}
