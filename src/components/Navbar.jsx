import React from 'react'

const Navbar = () => {
  return (
    <>
      <div>
        <nav className='flex justify-between bg-blue-500 text-white py-9'>
          <div>
            <span className='text-xl mx-8'>TaskManager</span>
          </div>
          <ul className='flex gap-8 mx-9'>
            <li className='cursor-pointer hover:font-medium transition-all duration-75'>Home</li>
            <li className='cursor-pointer hover:font-medium transition-all duration-75'>Your Tasks</li>
          
        </ul>
        </nav>
      </div>
    </>
  )
}

export default Navbar