import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { getStaff } from "../../app/departmentsSlice";
import {
  VirtualTableState,
  SortingState,
  SearchState,
  PagingState,
  IntegratedSorting,
  IntegratedFiltering,
  IntegratedPaging,
} from "@devexpress/dx-react-grid";
import { tableHeaderMessages, tableMessages } from "../../utils/localization";
import {
  Grid,
  VirtualTable,
  TableHeaderRow,
  SearchPanel,
  PagingPanel,
  Toolbar,
} from "@devexpress/dx-react-grid-material-ui";

import Header from "../Header";

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
}));

function DepartmentInfo({ department }) {
  return (
    <>
      <Typography>{`Наименование: ${department.title || ""}`}</Typography>
      <Typography>{`Сокращение: ${department.short || ""}`}</Typography>
      <Typography>{`Заведующий: ${department.dean}`}</Typography>
      <Typography>{`Адресс: ${department.address || ""}`}</Typography>
      <Typography>{`Телефон: ${department.phone || ""}`}</Typography>
      <Typography>{`Электронная почта: ${department.email || ""}`}</Typography>
    </>
  );
}

const DepartmentStaffColumns = [
  { name: "login", title: "Логин" },
  { name: "displayName", title: "ФИО" },
  { name: "position", title: "Должность" },
];

const VIRTUAL_PAGE_SIZE = 100;

function DepartmentStaff({ id }) {
  const [searchValue, setSearchState] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();
  const staff = useSelector((state) => state.departments.staff);
  const loading = useSelector((state) => state.departments.loading);

  const getDepartmentStaff = () => {
    dispatch(getStaff(id, history));
  };

  return (
    <>
      <Paper>
        <Grid rows={staff} columns={DepartmentStaffColumns}>
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
            totalRowCount={staff.lenght}
            pageSize={VIRTUAL_PAGE_SIZE}
            skip={0}
            getRows={getDepartmentStaff}
          />
          <VirtualTable messages={tableMessages} />
          <TableHeaderRow showSortingControls messages={tableHeaderMessages} />
          <Toolbar />
          <SearchPanel />
          <PagingPanel />
        </Grid>
      </Paper>
    </>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

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
  );
}

export default function DepartmentShow() {
  const [tab, setTab] = React.useState(0);
  const departments = useSelector((state) => state.departments.departments);
  const { id } = useParams();
  const history = useHistory();
  const department = departments.find(
    (department) => department.id === parseInt(id)
  );

  const classes = useStyles();

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleBack = () => {
    history.goBack();
  };

  return (
    <>
      <Header />
      <Container className={classes.profileContainer}>
        <IconButton aria-label="назад" onClick={handleBack}>
          <ArrowBackIosIcon />
        </IconButton>
        {department && (
          <>
            <Typography variant="h2" gutterBottom>
              {department.short}
            </Typography>
            <Tabs
              value={tab}
              onChange={handleTabChange}
              aria-label="Разделы факультета"
            >
              <Tab label="Общая информация" />
              <Tab label="Сотрудники" />
            </Tabs>
            <Box mt={3}>
              <TabPanel value={tab} index={0}>
                <DepartmentInfo department={department} />
              </TabPanel>
              <TabPanel value={tab} index={1}>
                <DepartmentStaff id={department.id} />
              </TabPanel>
            </Box>
          </>
        )}
      </Container>
    </>
  );
}
