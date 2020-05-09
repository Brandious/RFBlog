import React from 'react'

import { withStyles, fade } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import AuthStyledMenu from './AuthStyledMenu';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';



const styles = (theme) => ({
    toolbar: theme.mixins.toolbar,
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        [theme.breakpoints.down('sm')]:{
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
        [theme.breakpoints.down('sm')]:{
            display: 'none',
        },
        
        alignItems: 'center'
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

        avatar: {
            height: 110,
            width: 100,
            flexShrink: 0,
            flexGrow: 0,
            objectFit: "contain"
        }
      },

})

function LoggedInNavigation(props) {

    const { classes } = props;
    console.log(props.avatar);
    return (
        <div className={classes.nav}>

                        
        
        <Typography variant="h6"className={classes.navItem}  noWrap>
             <AuthStyledMenu >
                 Home
             </AuthStyledMenu>
        </Typography>

        <Typography variant="h6"className={classes.navItem}  noWrap>
             <AuthStyledMenu >
                 Explore
             </AuthStyledMenu>
        </Typography>

        <Typography variant="h6" className={classes.navItem}  noWrap>
             <AuthStyledMenu >
                 Profile
             </AuthStyledMenu>
        </Typography> 

        <Typography variant="h6" className={classes.navItem}  noWrap>
             <AuthStyledMenu >
                 Dashboard
             </AuthStyledMenu>
        </Typography> 

                        <Divider/>
                            <center>
                                <Avatar src={props.avatar} className={classes.avatar}/>
                            </center>
                        <Divider/>  
        </div>
    )
}

export default withStyles(styles)(LoggedInNavigation);