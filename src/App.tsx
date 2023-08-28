import React from 'react';
import './App.css';
import {VehicleForm,VehicleList,ViewVehicle} from './pages'
import { makeStyles, CssBaseline, createTheme, ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#333996",
      light: '#3c44b126'
    },
    secondary: {
      main: "#f83245",
      light: '#f8324526'
    },
    background: {
      default: "#f4f5fd"
    },
  },
  overrides:{
    MuiAppBar:{
      root:{
        transform:'translateZ(0)'
      }
    }
  },
  props:{
    MuiIconButton:{
      disableRipple:true
    }
  }
})

const useStyles = makeStyles({
  appMain: {
    paddingLeft: '20px',
    width: '100%'
  }
})

/**
 * 
 * @App Routes to the respective pages 
 */
function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
    <div className={classes.appMain}>
      <Router>
        <div>
            <Routes>
              <Route  path="/" element={<VehicleList/>} />
              <Route  path="/add-vehicle" element={<VehicleForm/>} />
              <Route  path="/update-vehicle/:id" element={<VehicleForm/>} />
              <Route  path="/view-vehicle/:id" element={<ViewVehicle/>} />
            </Routes>
          </div>
      </Router>
    </div>
    <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
