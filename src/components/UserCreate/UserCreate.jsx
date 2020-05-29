import React from "react";
import { Form } from "react-final-form";
import { TextField } from "mui-rff";
import Header from "../Header";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 100,
  },
  formContainer: {
    maxWidth: 250,
    marginBottom: 30
  },
}));

export default function UserCreate(props) {
  // const { initialValues } = props;
  const classes = useStyles();

  async function onSubmit(values) {
    console.log(values);
  }

  async function validate(values) {
    if (!values.hello) {
      return { hello: "Saying hello is nice." };
    }
    return;
  }

  return (
    <>
      <Header />
      <Container className={classes.container}>
        <Typography variant="h2" gutterBottom>
          Создание пользователя
        </Typography>
        <div className={classes.formContainer}>
          <Form
            onSubmit={onSubmit}
            // initialValues={initialValues}
            validate={validate}
            render={({ handleSubmit, values }) => (
              <form onSubmit={handleSubmit} noValidate>
                <TextField label="Логин" name="login" required={true} />

                <TextField label="Имя" name="name" required={true} />
                <TextField label="Фамилия" name="surname" required={true} />
                <TextField
                  label="Отчество"
                  name="patronymic"
                  required={false}
                />
                <TextField
                  label="Год рождения"
                  name="yearOfBirth"
                  required={false}
                />

                <TextField label="Кафедра" name="department" required={false} />
                <TextField label="Должность" name="position" required={true} />
                <TextField
                  label="Ученая степень"
                  name="academicDegree"
                  required={false}
                />
                <TextField
                  label="Ученое звание"
                  name="academicRank"
                  required={false}
                />
                <TextField
                  label="Тип занятости"
                  name="staff"
                  required={false}
                />
                <TextField label="Ставка" name="salaryRate" required={false} />
                <TextField
                  label="Номер телефона"
                  name="phone"
                  required={false}
                />
                <TextField
                  label="Электронная почта"
                  name="email"
                  required={false}
                />
                {/* <TextField label="Hello world" name="SNILS4" required={true} /> */}
              </form>
            )}
          />
        </div>
      </Container>
    </>
  );
}
