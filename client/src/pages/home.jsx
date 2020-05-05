import React, { Component } from 'react'

import Post from '../components/Post';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import withStyles from '@material-ui/core/styles/withStyles';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import NotesIcon from '@material-ui/icons/Notes';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from '@material-ui/core/Link';

//import { authMiddleWare } from '../util/auth'

const styles = (theme) => 
({
    root: {
        display: "flex"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
    uiProgress: {
        position: 'fixed',
        zIndex: '1000',
        height: '31px',
        width: '31px',
        left: '50%',
        top: '35%'
    },
    toolbar: theme.mixins.toolbar,
    appBar: {
		zIndex: theme.zIndex.drawer + 1
	},
    toolBar: {
       display: 'flex',
       justifyContent: 'space-between',
    },
    nav: {
        display: 'flex',
        flexDirection: 'row',
    },
    navItem: {
        margin: '10px',
        padding: '10px',
    }
});

class home extends Component {

    state = {
        render: false
    }

    loadPostPage = (event) => 
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
            uiLoading: true
        }
    }

    componentWillMount = ()=>
    {
        this.setState({uiLoading: false});
    } 
    
    render() {
        const { classes } = this.props;	
        const preventDefault = (event) => event.preventDefault();
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
                        <AppBar position="fixed" className={classes.appBar}>
                            <Toolbar className={classes.toolBar}>
                               
                                <Typography variant="h6" noWrap>
                                    Blog
                                </Typography>
                                
                                <div className={classes.nav}>
                                    <Typography variant="h6" className={classes.navItem} noWrap>
                                         <Link href="#" onClick={preventDefault} color="inherit">Home</Link>
                                    </Typography>
                                    
                                    <Typography variant="h6"className={classes.navItem}  noWrap>
                                         <Link href="#" onClick={preventDefault} color="inherit" underline="hover">Explore</Link>
                                    </Typography>

                                    <Typography variant="h6"className={classes.navItem}  noWrap>
                                         <Link href="#" onClick={preventDefault} color="inherit" underline="hover">User</Link>
                                    </Typography>
                                </div>
                            </Toolbar>
                        </AppBar>

                        <div><Post /></div> 
                </div>
            )
        }
    }
}

export default withStyles(styles)(home);