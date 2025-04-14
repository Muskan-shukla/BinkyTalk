// routes
import React, { useEffect } from "react";
import Router from "./routes";
import { useDispatch, useSelector } from "react-redux";
// theme
import ThemeProvider from './theme';
// components
import ThemeSettings from './components/settings';



function App() {
  
  return (
    
    <>
    <ThemeProvider>
      <ThemeSettings>
        {" "}
        <Router />{" "}
      </ThemeSettings>
    </ThemeProvider>

     
  </>
    );
}

export default App;
