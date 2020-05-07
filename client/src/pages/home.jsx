import React, { Component } from 'react'

import PublicPost from '../components/PublicPost';
import Navbar from '../components/Navbar';


import CssBaseline from '@material-ui/core/CssBaseline';
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from '@material-ui/core/Link';

import { authMiddleware } from '../util/auth'
import axios from 'axios';
import Posts from '../components/Posts';
import { Typography } from '@material-ui/core';

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

class home extends Component {

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
        const { classes } = this.props;	

		if (this.state.uiLoading === true) {
			return (
				<div className={classes.root}>
					{this.state.uiLoading && <CircularProgress size={150} className={classes.uiProgess} />}
				</div>
			);
        } 
        else
        {
            return(
                <div className={classes.root}>
                        <CssBaseline />
                        <Navbar/>
                     <div classes={classes.content}>
                      
                                <PublicPost/>
                        
                       
                        {this.state.auth? 
                                    <Posts/>: <div className={classes.text}>	<Link href="signup" variant="body2">
									{"Don't have an account? Sign Up"}
								</Link><br/>
                                <Link href="login" variant="body2">
									{" Or Login?"}
								</Link>        
                        </div>}
                    </div> 
                </div>
            )
        }
    }
}

export default withStyles(styles)(home);