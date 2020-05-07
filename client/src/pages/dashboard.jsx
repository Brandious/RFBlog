import React, { Component } from 'react'

import Posts from '../components/Posts';
import Profile from '../components/Profile';

import Navbar from '../components/Navbar';
import { CssBaseline, withStyles } from '@material-ui/core';


const styles = (theme) => 
({
    root: {
        display: "flex",
        justifyContent: 'space-between',
        alignItems: 'space-between',
        flexDirection: 'column',
    },
    content: {
        display: 'flex',
        flexGrow: 1,
        padding: theme.spacing(3)
    },
    uiProgress: {
        position: 'fixed',
        zIndex: '1000',
        height: '31px',
        width: '31px',
        left: '40%',
        top: '25%'
    },
    text: {
        padding: '100px 0 0 50px',
    }
  
});

class dashboard extends Component {

    render() {

        const classes = this.props;
        
        return (
            <div classes={classes.root}>
                <CssBaseline/>
                <Navbar/>

                <div className={classes.content}>
                    <Posts />
                    <Profile />
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(dashboard);