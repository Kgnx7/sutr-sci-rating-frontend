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
import { getRiaTypes } from './riaTypesListSlice'

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
  { name: 'title', title: 'Наименование' },
  { name: 'unit', title: 'Ед. измерения' },
  { name: 'perUnit', title: 'Баллы за единицу' },
  { name: 'generalType', title: 'Тип работы' },
  { name: 'description', title: 'Описание' },
]

const columnExtensions = [
  { columnName: 'title', wordWrapEnabled: true },
  { columnName: 'generalTypes', wordWrapEnabled: true },
  { columnName: 'description', wordWrapEnabled: true },
]

const PAGE_SIZE = 10

const TableRow = ({ row, ...restProps }) => {
  const history = useHistory()

  const handleRowClick = () => {
    history.push(`/riaTypes/get/${row.id}`)
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

export default function RiaTypesList() {
  const [searchValue, setSearchState] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const riaTypes = useSelector((state) => state.riaTypesList.riaTypes)
  const totalCount = useSelector((state) => state.riaTypesList.count)

  useEffect(() => {
    dispatch(getRiaTypes(searchValue, PAGE_SIZE * currentPage, PAGE_SIZE, history))
  }, [])

  const handleCurrentPageChange = (page) => {
    setCurrentPage(page)
    dispatch(getRiaTypes(searchValue, PAGE_SIZE * page, PAGE_SIZE, history))
  }

  const handleSearchChangeDebounced = useRef(
    debounce((search) => {
      dispatch(getRiaTypes(search, PAGE_SIZE * currentPage, PAGE_SIZE, history))
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
          Виды РИД
        </Typography>
        <Can I="create" a="RiaType">
          <Link component={RouterLink} to={`/riaTypes/create`}>
            <Button
              variant="contained"
              color="primary"
              className={`${classes.gutterTop} ${classes.gutterBottom}`}
            >
              Добавить
            </Button>
          </Link>
        </Can>
        <Paper>
          <Grid rows={riaTypes} columns={columns}>
            <SearchState value={searchValue} onValueChange={handleSearchChange} />
            <SortingState />
            <PagingState
              currentPage={currentPage}
              onCurrentPageChange={handleCurrentPageChange}
              pageSize={PAGE_SIZE}
            />

            <IntegratedSorting />
            <Table
              messages={tableMessages}
              rowComponent={TableRow}
              columnExtensions={columnExtensions}
            />
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
