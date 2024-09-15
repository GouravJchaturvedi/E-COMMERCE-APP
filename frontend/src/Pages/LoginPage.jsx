import React from 'react'
import { useState } from 'react'
import {motion} from "framer-motion"
import { Link } from 'react-router-dom'

function LoginPage() {
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const loading = true;

  const handleSumbit = (e) =>{
    e.preventDefault();
    console.log(email , password)
  }
  return (
    <div>

    </div>
  )
}

export default LoginPage
