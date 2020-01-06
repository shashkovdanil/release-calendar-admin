import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomePage from '../Home'
import { AuthUserContext, useAuthUser } from '../Session'
import SignInPage from '../SignIn'
import * as ROUTES from '../../constants/routes'

const App = () => {
  const authUser = useAuthUser()

  return (
    <AuthUserContext.Provider value={authUser}>
      <Router>
        <div>
          <Route exact path={ROUTES.HOME} component={HomePage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        </div>
      </Router>
    </AuthUserContext.Provider>
  )
}

export default App
