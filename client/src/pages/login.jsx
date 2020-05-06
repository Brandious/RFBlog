import React, { Component } from 'react'

import {Avatar, Button, CssBaseline, TextField, Link, Grid, Typography, Container, CircularProgress} from '@material-ui/core';

import withStyles from '@material-ui/core/styles/withStyles';

import  LockOutlinedIcon  from '@material-ui/icons/LockOutlined';

import axios from 'axios';


const styles = (theme) => 
({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    customError: {
        color: 'red',
        fontSize: '1rem',
        marginTop:10,
    },
    progress: {
        position: 'absolute'
    }

});


class login extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
            email: '',
            password: '',
            errors: [],
            loading: false
        }
    }

    componentWillReceiveProps(nextProps) 
    {
        if(nextProps.UI.errors)
            this.setState({
                errors: nextProps.UI.errors
            })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({loading: true});
       
        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        axios.post('/login', userData)
             .then( res => {
                 localStorage.setItem('AuthToken', `Bearer ${res.data.token}`);
                 this.setState({
                     loading: false
                 });
                 this.props.history.push('/');
             })
             .catch((err) => {
                 this.setState({
                     errors: err.response.data,
                     loading: false
                 })
             })
    }


    render() {
		const { classes } = this.props;
		const { errors, loading } = this.state;
		return (
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Login
					</Typography>
					<form className={classes.form} noValidate>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							helperText={errors.email}
							error={errors.email ? true : false}
							onChange={this.handleChange}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							helperText={errors.password}
							error={errors.password ? true : false}
							onChange={this.handleChange}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={this.handleSubmit}
							disabled={loading || !this.state.email || !this.state.password}
						>
							Sign In
							{loading && <CircularProgress size={30} className={classes.progess} />}
						</Button>
						<Grid container>
							<Grid item>
								<Link href="signup" variant="body2">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
						{errors.general && (
							<Typography variant="body2" className={classes.customError}>
								{errors.general}
							</Typography>
						)}
					</form>
				</div>
			</Container>
		);
	}
}



export default withStyles(styles)(login);