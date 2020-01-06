import { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import AuthUserContext from './context'
import { FirebaseContext } from '../Firebase'
import * as ROUTES from '../../constants/routes'

const useCheckAuth = condition => {
  const history = useHistory()
  const firebase = useContext(FirebaseContext)
  const authUser = useContext(AuthUserContext)

  useEffect(() => {
    const listener = firebase.onAuthUserListener(
      authUser => {
        if (!condition(authUser)) {
          history.push(ROUTES.SIGN_IN)
        }
      },
      () => history.push(ROUTES.SIGN_IN),
    )

    return function cleanup() {
      listener()
    }
  }, [condition, firebase, history])

  return condition(authUser)
}

export default useCheckAuth
