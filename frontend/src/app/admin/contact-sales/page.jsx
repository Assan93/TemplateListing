import React from 'react'

const contactSales = () => {
  return (
    <div className='bg-emerald-100 bg-h-fit h-full min-h-screen'>
        {/* heads */}
        <div className='text-5xl text-center font-bold py-8'>
            <h1>Contact Sales</h1>
            </div>
            <div className='text-center text-lg'>
            <p className=''>Please fill out the form below to contact our saler team</p>
        </div>
        <section>
            
            {/* Form */}

              <div className="grid gap-y-4 lg:px-150 md:px-70 sm:px-2 py-10">
                <div>
                  <label
                    htmlFor="name"
                    className=" text-sm mb-2"
                  >
                    Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none white dark:bg-zinc-100 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      aria-describedby="email-error"
                    />
                    <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                      <svg
                        className="size-5 text-red-500"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                    </div>
                  </div>
                  </div>
                </div>
                {/* End Form Group */}

                
            {/* Form */}

              <div className="grid gap-y-4 lg:px-150 md:px-70">
                <div>
                  <label
                    htmlFor="email"
                    className=" text-sm mb-2"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="email"
                      className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none white dark:bg-zinc-100 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      aria-describedby="email-error"
                    />
                    <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                      <svg
                        className="size-5 text-red-500"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                    </div>
                  </div>
                  </div>
                </div>
                {/* End Form Group */}

                
            {/* Form */}

              <div className="grid gap-y-4 lg:px-150 md:px-70 py-10">
                <div>
                  <label
                    htmlFor="message"
                    className=" text-sm mb-2"
                  >
                    Message
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="message"
                      className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none white dark:bg-zinc-100 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      aria-describedby="email-error"
                    />
                    <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                      <svg
                        className="size-5 text-red-500"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                    </div>
                  </div>
                  </div>
                </div>
                {/* End Form Group */}
        </section>
         <div className='text-center'>
            <button className='rounded-md bg-blue-500 px-36 py-2 border-2'>Send</button>
            </div> 
           </div>
             )
            }

    export default contactSales