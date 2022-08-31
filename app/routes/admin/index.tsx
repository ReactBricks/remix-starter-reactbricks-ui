import React from 'react'
import type { MetaFunction } from '@remix-run/node'

import { Admin, Login } from 'react-bricks'
import AdminClient from '~/components/AdminClient.client'

export const meta: MetaFunction = () => {
  return {
    title: 'React Bricks Login',
  }
}

const AdminLogin: React.FC = () => {
  return <AdminClient />
}

export default AdminLogin
