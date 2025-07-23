import React from 'react'
import { Link } from 'react-router-dom'

function LoginBtn() {
  return (
    <div>
      <Link to="/register" className="text-white">Register</Link>
    </div>

  )
}

export default LoginBtn