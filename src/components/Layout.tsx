import React from 'react'
import { Outlet } from "react-router";
import Header from './Header';

export default function Layout() {
    return ( <>
        <Header/>
       
        <Outlet/>
    
        <footer>
            Footer
        </footer>
        </> );
}
