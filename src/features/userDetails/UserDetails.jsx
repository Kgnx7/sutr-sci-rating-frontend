import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'
import Header from '../../components/Header'
import { getUser } from './userDetailsSlice'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import {
  SortingState,
  SearchState,
  IntegratedSorting,
  IntegratedFiltering,
} from '@devexpress/dx-react-grid'
import { tableHeaderMessages, tableMessages } from '../../utils/localization'
import {
  Grid,
  Table,
  TableHeaderRow,
  SearchPanel,
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
  gutterTop: {
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

// const TableRow = ({ row, ...restProps }) => {
//   const history = useHistory()

//   const handleRowClick = () => {
//     history.push(`/researchWorks/${row.id}`)
//   }

//   return (
//     <Table.Row
//       {...restProps}
//       onClick={handleRowClick}
//       style={{
//         cursor: 'pointer',
//       }}
//     />
//   )
// }

// const ResearchWorks = ({ researchWorks }) => {
//   const [searchValue, setSearchState] = useState('')
//   const classes = useStyles()
//   const history = useHistory()

//   const reseachWorksColumns = [
//     { name: 'title', title: 'Наименование' },
//     { name: 'description', title: 'Описание' },
//     { name: 'authors', title: 'Авторы' },
//   ]

//   const tableColumnExtensions = [
//     { columnName: 'title', wordWrapEnabled: true },
//     { columnName: 'description', wordWrapEnabled: true },
//     { columnName: 'authors', wordWrapEnabled: true },
//   ]

//   const handleCreateResearchWork = () => {
//     history.push(`/researchWorks/create`)
//   }

//   return (
//     <>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleCreateResearchWork}
//         className={classes.createButton}
//       >
//         Добавить РИД
//       </Button>
//       <Paper>
//         <Grid rows={researchWorks} columns={reseachWorksColumns}>
//           <SearchState value={searchValue} onValueChange={setSearchState} />
//           <SortingState />
//           <IntegratedSorting />
//           <IntegratedFiltering />
//           <Table
//             messages={tableMessages}
//             rowComponent={TableRow}
//             columnExtensions={tableColumnExtensions}
//           />
//           <TableHeaderRow showSortingControls messages={tableHeaderMessages} />
//           <Toolbar />
//           <SearchPanel />
//         </Grid>
//       </Paper>
//     </>
//   )
// }

const UserInfo = ({ user }) => {
  const classes = useStyles()

  const userStatusesColumns = [
    { name: 'position', title: 'Должность' },
    { name: 'department', title: 'Кафедра' },
    { name: 'employmentType', title: 'Тип занятости' },
    { name: 'salaryRate', title: 'Ставка' },
  ]

  const userStatusesColumnExtensions = [
    { columnName: 'title', wordWrapEnabled: true },
    { columnName: 'description', wordWrapEnabled: true },
    { columnName: 'authors', wordWrapEnabled: true },
  ]

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
      <Avatar src="/avatar.jpg" className={classes.avatar} />
      <Typography className={classes.gutterTop}>{`Логин: ${user.login}`}</Typography>
      <Typography>{`ФИО: ${user.displayName}`}</Typography>
      <Typography>{`Должность: ${user.position || ''}`}</Typography>
      <Typography>{`Ученая степень: ${user.academicRank || ''}`}</Typography>
      <Typography>{`Электронная почта: ${user.email || ''}`}</Typography>
      <Typography>{`Телефон: ${user.phone || ''}`}</Typography>

      <Typography className={classes.gutterTop}>Занимаемые должности:</Typography>
      <Grid rows={user.states} columns={userStatusesColumns}>
        <Table messages={tableMessages} columnExtensions={userStatusesColumnExtensions} />
        <TableHeaderRow messages={tableHeaderMessages} />
      </Grid>

      <Typography className={classes.gutterTop}>Ученые степени:</Typography>
      <Grid rows={user.academicDegrees} columns={userAcademicDegreesColumns}>
        <Table messages={tableMessages} columnExtensions={userAcademicDegreesColumnExtensions} />
        <TableHeaderRow messages={tableHeaderMessages} />
      </Grid>
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
              <Tab label="РИДЫ" />
            </Tabs>
            <Box mt={3}>
              <TabPanel value={tab} index={0}>
                <UserInfo user={user} />
              </TabPanel>
              <TabPanel value={tab} index={1}>
                {/* <ResearchWorks researchWorks={user.researchWorks} /> */}
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
