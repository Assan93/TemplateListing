import Navbar from '@/components/nabvar';
import React from 'react'


const Layout = ({ children }) => {
    return (
        <>

        <Navbar/>
            
            {children}
        </>
    )
}

export default Layout;