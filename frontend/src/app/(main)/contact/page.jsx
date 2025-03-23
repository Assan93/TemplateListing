import React from 'react'

const contact = () => {
  return (
    <div className=''>
        <>
  <div className="container px-100 py-20 position:fixed ">
    <div>
    <h2 className='text-center font-bold text-4xl'>Contact Us</h2>
    <p className='pt-4 px-8 text-lg '>Any questions or remarks? Just write us a message!</p>
    </div>
    
    <form action="#" method="POST" className='rounded pt-10 grid md:grid-cols-2 '>
        <div className='px-6'>
            <>Name</>
            
      <input type="text" name="name" className=' grid rounded border' placeholder="Your Name" required="" />
      </div>
      <div className='px-8'>
      <>Email</>
    
      <input type="email" name="email"className=' grid rounded border' placeholder="Your Email" required="" />
      </div>
      <textarea
        name="message"
        placeholder=""
        rows={5}
        required=""
        defaultValue={""}
      />
      <div className='py-10 px-14 flex justify-end'>
      <button className='rounded-4xl px-40 bg-blue-400' type="submit">SUBMIT</button>
      </div>
    </form>
  </div>
</>

    </div>

  )
}

export default contact
