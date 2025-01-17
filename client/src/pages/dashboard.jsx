import React, { Component } from 'react'

import Posts from '../components/Posts';
import Profile from '../components/Profile';

import Navbar from '../components/Navbar';
import { CssBaseline, withStyles } from '@material-ui/core';

import { authMiddleware } from '../util/auth'
import axios from 'axios';
import Tabs from '../components/Tabs';
const styles = (theme) => 
({
    root: {
        display: "flex",
        //justifyContent: 'space-between',
        //alignItems: 'space-between',
        flexDirection: 'column',
    },
    content: {
        display: 'flex',
        flexGrow: 0,
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


    state = {
        render: false,
        drawer: false,
        auth: false,
    }

    loadPostPage = () => 
    {
        this.setState({render: false});
    }

    //TODO: LogOutHandler

    constructor(props)
    {
        super(props);
        
        //TODO: Add to state user information
        this.state =
        {
            uiLoading: true,
            auth: false
        }

        const authToken = authMiddleware(this.props.history);
        axios.defaults.headers.common = {
            Authorization: `${authToken}`
        };

        axios.get('/user')
             .then(res => {
                    this.setState({
                        ...res.data.userCredentials,
                        auth: true
                    })

                  
             })
             .catch(err => {
                //  if(err.response.status === 403)
                    this.setState({
                        auth: false
                    })
                   
             })
    }

    componentDidMount = ()=>
    {
        
        
        this.setState({uiLoading: false});
       
    } 
    

    render() {

        const classes = this.props;
        
        return (
            <div classes={classes.root}>
                <CssBaseline/>
                <Navbar auth={this.state.auth} avatar={this.state.imgUrl} />

                <div className={classes.content}>
                   <Tabs variant="fullWidth" orientation="vertical"/>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(dashboard);