import { useEffect, useState, useContext } from 'react'
import { FirebaseContext } from '../Firebase'

const useAuthUser = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')))

  const firebase = useContext(FirebaseContext)

  useEffect(() => {
    const listener = firebase.onAuthUserListener(
      authUser => {
        localStorage.setItem('authUser', JSON.stringify(authUser))
        setUser(authUser)
      },
      () => {
        localStorage.removeItem('authUser')
        setUser(null)
      },
    )

    return function cleanup() {
      listener()
    }
  }, [firebase])

  return user
}

export default useAuthUser
