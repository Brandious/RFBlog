import React from 'react'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {withStyles, fade} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import StyledMenu from './StyledMenu';
import MobileDrawer from './MobileDrawer';


const styles = (theme) => ({
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

})

function Navbar(props) {
    const { classes } = props;
    return (
        <>
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
                                         <StyledMenu >
                                             Home
                                         </StyledMenu>
                                    </Typography>

                                    <Typography variant="h6"className={classes.navItem}  noWrap>
                                         <StyledMenu >
                                             Explore
                                         </StyledMenu>
                                    </Typography>

                                    <Typography variant="h6" className={classes.navItem}  noWrap>
                                         <StyledMenu >
                                             Profile
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
        </>
    )
}

export default withStyles(styles)(Navbar);