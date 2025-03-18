import React from 'react'

const login = () => {
  return (
    <div className='pt-25 px-25 text-blue-800 absolute'>
    <div className="login-container text-certer px-130 w-full border-4 ">
    
      <div className='py-2 pt-2 '>
    <h2 className='text-center font-bold text-3xl pt-'>Welcome Back!</h2>
    <p className=' py-2'>Continue with Google or enter your details.</p>
    <div className='px-8 p-4 pt-4 '>
    <input type='Login with Google'className='px-1 rounded border-2' placeholder='Login with Google'required=""/>
    </div>
    </div>
    
      <div className='pt-10'>
      <input type="text " className=' px-1 rounded border-2 '
       placeholder=" Username" required="" />
      </div>
      <div className='py-4'>
      <input type="password" className='px-1 rounded border-2' placeholder="Password" required="" />
      </div>
      <button type="submit " className='px-5 rounded bg-blue-500 text-right'>Login</button>
      <p className='text-right px-10 pt-10'>Forget Password?</p>
      <div className='pt-10'>
        <h1>Doesn't have an account? Sign Up for free</h1>
      </div>
    
  </div>
  </div>
  
  )
}

export default login