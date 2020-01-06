import React, { useContext } from 'react'
import { Formik, Form } from 'formik'
import { useHistory } from 'react-router-dom'
import { Container, Button, TextField, FormGroup } from '@material-ui/core'
import { FirebaseContext } from '../Firebase'
import * as ROUTES from '../../constants/routes'

const validate = values => {
  const errors = {}

  if (!values.email) {
    errors.email = 'Введите емэйл'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Некорректный емэйл'
  }

  if (!values.password) {
    errors.password = 'Введите пароль'
  }

  return errors
}

function SignIn() {
  const history = useHistory()
  const firebase = useContext(FirebaseContext)

  return (
    <Container maxWidth="sm">
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={values => {
          const { email, password } = values

          firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
              history.push(ROUTES.HOME)
            })
            .catch(error => {
              console.error(error)
            })
        }}
        validate={validate}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          errors,
        }) => (
          <Form onSubmit={handleSubmit} autoComplete="off">
            <FormGroup>
              <TextField
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="admin@gmail.com"
                label="Емэйл"
                error={errors.email && touched.email}
                helperText={errors.email}
                variant="outlined"
              />
              <TextField
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder="********"
                label="Пароль"
                error={errors.password && touched.password}
                helperText={errors.password}
                variant="outlined"
              />
              <Button type="submit">Войти</Button>
            </FormGroup>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default SignIn
