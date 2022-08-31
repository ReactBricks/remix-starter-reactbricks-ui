import React, { useEffect, useState } from 'react'
import { Admin, Login } from 'react-bricks'

const AdminClient = () => {
  const [hasMount, setHasMount] = useState(false)
  useEffect(() => {
    setHasMount(true)
  }, [])
  if (!hasMount) return <div>mounting....</div>
  return (
    <Admin isLogin>
      <Login />
    </Admin>
  )
}

export default AdminClient
