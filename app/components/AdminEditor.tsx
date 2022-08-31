import { useEffect, useState } from 'react'
import { Admin, Editor } from 'react-bricks'

const AdminEditor = () => {
  const [hasMount, setHasMount] = useState(false)
  useEffect(() => {
    setHasMount(true)
  }, [])
  if (!hasMount) return <div>mounting....</div>
  return (
    <Admin isLogin>
      <Editor />
    </Admin>
  )
}

export default AdminEditor
