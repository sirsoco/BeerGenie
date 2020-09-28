import React from 'react'
import Auth from '../components/Auth/Auth'
import SignupBackground from '../components/SignUpBackground/SignUpBackground'
import '../App.js' 

export default function SignUp() {
  return(
    <div>
    <SignupBackground className='SignupBackground'></SignupBackground>
    <Auth></Auth> 
    </div>
  )
}