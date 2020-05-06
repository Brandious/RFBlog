import React, { Component } from 'react'

import Post from '../components/Post';

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {withStyles, fade} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
//import { authMiddleWare } from '../util/auth'
import StyledMenu from '../components/StyledMenu';
import MobileDrawer from '../components/MobileDrawer';


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
        left: '40%',
        top: '25%'
    },
    toolbar: theme.mixins.toolbar,
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        [theme.breakpoints.down('md')]:{
            display: 'none',
        }
	},
    toolBar: {
       display: 'flex',
       justifyContent: 'space-between',
    },
    nav: {
        display: 'flex',
        flexDirection: 'row',
        [theme.breakpoints.down('md')]:{
            display: 'none',
        }
    },
    drawer: {
        [theme.breakpoints.up('md')]: {
            display: 'none !important' 
        }
    },
    drawerButton: {
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    },
    navItem: {
        margin: '10px',
        padding: '10px',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: '12ch',
          '&:focus': {
            width: '20ch',
          },
        },
      },
});

class home extends Component {

    state = {
        render: false,
        drawer: false
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
            uiLoading: true
        }
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
                        <div className={classes.drawer}>
                                <MobileDrawer/>
                        </div>
                        <AppBar position="fixed" className={classes.appBar}>
                            <Toolbar className={classes.toolBar}>
                               
                                <Typography variant="h4" noWrap>
                                    BLOG
                                </Typography>
                            
                                <div className={classes.nav}>
                                    <Typography variant="h6"className={classes.navItem}  noWrap>
                                         <StyledMenu>
                                             Home
                                         </StyledMenu>
                                    </Typography>

                                    <Typography variant="h6"className={classes.navItem}  noWrap>
                                         <StyledMenu>
                                             Explore
                                         </StyledMenu>
                                    </Typography>

                                    <Typography variant="h6" className={classes.navItem}  noWrap>
                                         <StyledMenu>
                                             User
                                         </StyledMenu>
                                    </Typography>

                                    <div className={classes.search}>
                                        <div className={classes.searchIcon}>
                                            <SearchIcon />
                                        </div>
                                        <InputBase
                                        className={classes.navItem}
                                        placeholder="Search…"
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput, 
                                        }}
                                        inputProps={{ 'aria-label': 'search' }}
                                        />
                                    </div>
                                </div>
                            </Toolbar>
                        </AppBar>

                        <div><Post/></div> 
                </div>
            )
        }
    }
}

export default withStyles(styles)(home);