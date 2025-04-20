
import React from 'react'

const Aboutus = () => {
  return (
    <div><>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>About Us - Template Listing</title>
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css"
      rel="stylesheet"
      />
      
              {/*<Link
                href="/signup"></Link>*/}


         {/* About Us Section */}
    <section className="container mx-auto px-6 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
        <p className="text-lg text-gray-600">
          Discover the Story Behind TemplateHub
        </p>
      </div>
      <div className="mt-12 grid md:grid-cols-2 gap-8 items-center">
        {/* Image Section */}
        <div>
          <img
            src="https://th.bing.com/th/id/OIP.LskQ7SN-4_O66dXJFJr-yQHaDz?rs=1&pid=ImgDetMain"
            alt="About Us"
            className="rounded-xl shadow-lg"
            />
        </div>


            {/* Content Section */}

            <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Who We Are
          </h2>
          <p className="text-gray-600 mb-4">
            At <span className="font-bold">TemplateHub</span>, we are passionate
            about providing high-quality, well-structured, and easily customizable
            templates to help developers and designers save time and effort. Our
            platform offers a wide range of templates that cover various
            industries and use cases.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 mb-4">
            Our mission is to empower developers by providing a centralized
            platform to explore, preview, and download premium templates. We aim
            to make the web development process faster, easier, and more
            efficient.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Why Choose Us?
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Wide variety of high-quality templates</li>
            <li>Easy-to-use and customizable designs</li>
            <li>Dedicated support and regular updates</li>
            <li>Affordable pricing and flexible options</li>
          </ul>
        </div>
      </div>
    </section>
    {/* Footer */}
    <footer className="bg-gray-800 text-white text-center py-4">
      <p>© 2025 TemplateHub. All Rights Reserved.</p>
    </footer>
  </>
  </div>
  )
}

export default Aboutus