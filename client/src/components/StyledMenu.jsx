import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LoginIcon from '@material-ui/icons/MeetingRoom';
import SearchIcon from '@material-ui/icons/Search';
import FindUsersIcon from '@material-ui/icons/GroupAdd';
import { Link } from '@material-ui/core';
import SignUpIcon from '@material-ui/icons/PersonAdd';


const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenus(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="text"
        color="inherit"
        onClick={handleClick}
      >
        {(props.children !== 'Home') ? props.children: <Link href="/" color="inherit" underline="none">{props.children}</Link> }
      </Button>
      
      { 
        (props.children === 'Profile') ?
                 <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem button component="a" href="/login">
          <ListItemIcon>
            <LoginIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Login" />
        </StyledMenuItem>
      <StyledMenuItem button component="a" href="/signup">
      <ListItemIcon>
        <SignUpIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary="Signup" />
    </StyledMenuItem>
  </StyledMenu>
      :
        (props.children === 'Explore') ? 
            
            <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <StyledMenuItem>
            <ListItemIcon>
                <SearchIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Search" />
            </StyledMenuItem>
            <StyledMenuItem>
            <ListItemIcon>
                <FindUsersIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Find Users" />
            </StyledMenuItem>
        </StyledMenu>

        : null
      }
   
   
    </div>
  );
}