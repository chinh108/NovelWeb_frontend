import AuthGuard from '@/components/HOC/authGuard'
import React from 'react'
import Series from './sang-tac/index.page'

function Admin() {
  return (
    <Series />
  )
}

export default AuthGuard(Admin)