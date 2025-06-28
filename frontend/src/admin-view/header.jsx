// eslint-disable-next-line no-unused-vars
import React from 'react'
import Logo from "../assets/Logo4.png";
import { Link } from "react-router-dom";

const header = () => {
  return (
    <header className="my-header flex items-center justify-between px-4 py-3 bg-background border-b">
      <div className='lg:hidden sm:block  '>
          <Link to="/">

      <img src={Logo} className="img" /></Link></div>
</header>

  )
}

export default header
