import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'
import Header from '../../components/Header'
import { getUser, deleteUser } from './userDetailsSlice'
import { tableHeaderMessages, tableMessages } from '../../utils/localization'
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui'
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'
import { Can } from '../../components/Can'
import AlertDialog from '../../components/AlertDialog'

const useStyles = makeStyles((theme) => ({
  profileContainer: {
    paddingTop: 100,
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  gutterTop: {
    marginTop: theme.spacing(3),
  },
  gutterAll: {
    margin: theme.spacing(3),
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

const AcademicRanks = ({ user }) => {
  const classes = useStyles()

  const columns = [
    { name: 'position', title: 'Должность' },
    { name: 'department', title: 'Кафедра' },
    { name: 'employmentType', title: 'Тип занятости' },
    { name: 'salaryRate', title: 'Ставка' },
  ]

  const columnExtensions = [
    { columnName: 'position', wordWrapEnabled: true },
    { columnName: 'department', wordWrapEnabled: true },
  ]

  return (
    <>
      <Grid rows={user.states} columns={columns}>
        <Table messages={tableMessages} columnExtensions={columnExtensions} />
        <TableHeaderRow messages={tableHeaderMessages} />
      </Grid>
      <Can I="create" a="UserStatus">
        <Link component={RouterLink} to={`/users/${user.id}/statuses/create`}>
          <Button variant="contained" color="primary" className={classes.gutterAll}>
            Добавить должность
          </Button>
        </Link>
      </Can>
    </>
  )
}

const TableRow = ({ row, ...restProps }) => {
  const history = useHistory()

  const handleRowClick = () => {
    history.push(`/ria/get/${row.id}`)
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

const RiaList = ({ user }) => {
  const classes = useStyles()

  const columns = [
    { name: 'title', title: 'Наименование' },
    { name: 'authors', title: 'Авторы' },
    { name: 'description', title: 'Описание' },
  ]

  const columnExtensions = [
    { columnName: 'title', wordWrapEnabled: true },
    { columnName: 'authors', wordWrapEnabled: true },
    { columnName: 'description', wordWrapEnabled: true },
  ]

  return (
    <>
      <Can I="create" a="UserStatus">
        <Link component={RouterLink} to={`/ria/create`}>
          <Button variant="contained" color="primary" className={classes.gutterAll}>
            Добавить РИД
          </Button>
        </Link>
      </Can>
      <Grid rows={user.ria} columns={columns}>
        <Table
          messages={tableMessages}
          columnExtensions={columnExtensions}
          rowComponent={TableRow}
        />
        <TableHeaderRow messages={tableHeaderMessages} />
      </Grid>
    </>
  )
}

const AcademicDegrees = ({ user }) => {
  const classes = useStyles()

  const userAcademicDegreesColumns = [
    { name: 'degreeType', title: 'Степень' },
    { name: 'specialty', title: 'Специальность' },
  ]

  const userAcademicDegreesColumnExtensions = [
    { columnName: 'degreeType', wordWrapEnabled: true },
    { columnName: 'specialty', wordWrapEnabled: true },
  ]

  return (
    <>
      <Grid rows={user.academicDegrees} columns={userAcademicDegreesColumns}>
        <Table messages={tableMessages} columnExtensions={userAcademicDegreesColumnExtensions} />
        <TableHeaderRow messages={tableHeaderMessages} />
      </Grid>
      <Can I="create" a="AcademicDegree">
        <Link component={RouterLink} to={`/users/${user.id}/academicDegrees/create`}>
          <Button variant="contained" color="primary" className={classes.gutterAll}>
            Добавить степень
          </Button>
        </Link>
      </Can>
    </>
  )
}

const UserInfo = ({ user }) => {
  const [alertDialog, setAlertDialog] = useState(false)
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  const handleDelete = () => {
    dispatch(deleteUser(user.id, history))
  }

  const toggleAlertDialog = () => {
    setAlertDialog(!alertDialog)
  }

  return (
    <>
      <Avatar src="/avatar.jpg" className={classes.avatar} />
      <Typography className={classes.gutterTop}>{`Логин: ${user.login}`}</Typography>
      <Typography>{`ФИО: ${user.displayName}`}</Typography>
      <Typography>{`Ученая степень: ${user.academicRank || ''}`}</Typography>
      <Typography>{`Электронная почта: ${user.email || ''}`}</Typography>
      <Typography>{`Телефон: ${user.phone || ''}`}</Typography>

      <div>
        <Can I="edit" a="User">
          <Link component={RouterLink} to={`/users/${user.id}/edit`}>
            <Button variant="contained" color="primary" className={classes.gutterAll}>
              Редактировать
            </Button>
          </Link>
        </Can>
        <Can I="delete" a="User">
          <Button
            variant="contained"
            color="secondary"
            className={classes.gutterAll}
            onClick={toggleAlertDialog}
          >
            Удалить
          </Button>
        </Can>
        <AlertDialog open={alertDialog} onSubmit={handleDelete} handleClose={toggleAlertDialog} />
      </div>
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

  const handleTabChange = (event, newValue) => {
    setTab(newValue)
  }

  return (
    <>
      <Header />
      <Container className={classes.profileContainer}>
        {user ? (
          <>
            <Tabs value={tab} onChange={handleTabChange} aria-label="Разделы факультета">
              <Tab label="Общая информация" />
              <Tab label="Занимаемые должности" />
              <Tab label="Ученые степени" />
              <Tab label="РИДЫ" />
            </Tabs>
            <Box mt={3}>
              <TabPanel value={tab} index={0}>
                <UserInfo user={user} />
              </TabPanel>
              <TabPanel value={tab} index={1}>
                <AcademicRanks user={user} />
              </TabPanel>
              <TabPanel value={tab} index={2}>
                <AcademicDegrees user={user} />
              </TabPanel>
              <TabPanel value={tab} index={3}>
                <RiaList user={user} />
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
