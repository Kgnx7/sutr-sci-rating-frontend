import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

export default function Dashboard() {
  const user = useSelector((state) => state.auth.user)

  return <Redirect to={`/users/${user.id}`} />
}
