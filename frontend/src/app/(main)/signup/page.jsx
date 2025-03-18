import React from 'react'

const Signup = () => {
  return (
    <div className='px-150 p-35 absolute'><>
    
    <div className="container text-center grid grid-cols-1 py-4 px-10 rounded-2xl border-2 bg-white">
      <h2 className='font-bold py-5 text-lg'>Sign Up</h2>
       

       <form action="#" method="POST">
        <div className=' pt-8 '>
          <input type="text" name="fullname"className='rounded border px-4' placeholder="Full Name" required="" /></div>

        <div className='pt-8'>
        
        <input type="email" name="email"className='rounded border px-4' placeholder="Email" required="" /></div>
        <div className='pt-6'>
        <input className='rounded border px-4'
          type="password"
          name="password"
          placeholder="Password"
          required=""
        />
        </div>
        <div className='py-8'>
        <button type="submit"className='py-2 px-6 rounded bg-blue-500'>Sign Up</button>
        </div>
        
      </form>
    </div>
  </>
  </div>
  )
}

export default Signup