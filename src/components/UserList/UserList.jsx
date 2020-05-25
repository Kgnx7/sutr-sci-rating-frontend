import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  VirtualTableState,
  SortingState,
  SearchState,
  PagingState,
  IntegratedSorting,
  IntegratedFiltering,
  IntegratedPaging,
} from "@devexpress/dx-react-grid";

import {
  Grid,
  VirtualTable,
  TableHeaderRow,
  SearchPanel,
  PagingPanel,
  Toolbar,
} from "@devexpress/dx-react-grid-material-ui";
import Paper from "@material-ui/core/Paper";
import Header from "../Header";
import Container from "@material-ui/core/Container";
import { tableHeaderMessages, tableMessages } from "../../utils/localization";
import { getAllUsers } from "../../app/usersSlice";

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 100,
  },
}));

const columns = [
  { name: "login", title: "Логин" },
  { name: "name", title: "Имя" },
];

const VIRTUAL_PAGE_SIZE = 100;

export default function UserList() {
  const [searchValue, setSearchState] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const users = useSelector((state) => state.users.users);
  const loading = useSelector((state) => state.users.loading);

  const getUsers = () => {
    dispatch(getAllUsers(history));
  };

  return (
    <>
      <Header />
      <Container className={classes.container}>
        <Paper>
          <Grid rows={users} columns={columns}>
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
              totalRowCount={users.lenght}
              pageSize={VIRTUAL_PAGE_SIZE}
              skip={0}
              getRows={getUsers}
            />
            <VirtualTable messages={tableMessages} />
            <TableHeaderRow
              showSortingControls
              messages={tableHeaderMessages}
            />
            <Toolbar />
            <SearchPanel />
            <PagingPanel />
          </Grid>
        </Paper>
      </Container>
    </>
  );
}
