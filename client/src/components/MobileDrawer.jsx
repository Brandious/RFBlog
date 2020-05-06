import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import StyledMenu from './StyledMenu';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
    margin: '0',
    padding: '0'
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  search: {
      display: 'flex',
  },
 
  header: {
      display: 'flex',
      justifyContent: 'center',
     
  },
  inputRoot: {
    color: 'inherit',

  },
  inputInput: {
    color: '#3f51b5',
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
  nav: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start'
  },
  navItem: {
    color: 'inherit'
  }
    
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
        {/* <div className={classes.toolbar} /> */}
                  <div className={classes.header}> 
                    <Typography variant="h4"  color="primary">
                                    BLOG
                                </Typography>
                  </div>
    
      <Divider />
      <List className={classes.nav}>
          <ListItem>
          <div className={classes.search}>
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
          </ListItem>
       <ListItem>
       <Typography variant="h6"className={classes.navItem} color="primary"  noWrap>
                                         <StyledMenu>
                                             Home
                                         </StyledMenu>
                                    </Typography>
       </ListItem>

       <ListItem>
       <Typography variant="h6"className={classes.navItem} color="primary"  noWrap>
                                         <StyledMenu>
                                             Explore
                                         </StyledMenu>
                                    </Typography>

       </ListItem>

       <ListItem>
       <Typography variant="h6" className={classes.navItem} color="primary" noWrap>
                                         <StyledMenu>
                                             User
                                         </StyledMenu>
                                    </Typography>
       </ListItem>
       </List>
      <Divider />
    </div>
  
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" noWrap>
                                    BLOG
           </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}



export default ResponsiveDrawer;