import React, { Component } from 'react'

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Grid, Card, CardContent, CardActions, Button} from '@material-ui/core';
import {Dialog, DialogTitle, TextField} from '@material-ui/core';
import MuiDialogContent from '@material-ui/core/DialogContent';

import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const styles = ((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
    title: {
		marginLeft: theme.spacing(2),
		flex: 1
    },
    root: {
		minWidth: 470
    },
    uiProgess: {
		position: 'fixed',
		zIndex: '1000',
		height: '31px',
		width: '31px',
		left: '50%',
		top: '35%'
    },
    viewRoot: {
		margin: 0,
		padding: theme.spacing(2)
    },
    dialogueStyle: {
		maxWidth: '50%'
	},
	cardActions: {
		display: "flex",
		justifyContent: 'space-between'
	}
    })
);


class Post extends Component {

    constructor(props)
    {
        super(props);

        this.state = 
        {
            posts: [],
            uiLoading:true,
            viewOpen: false,
            open: false,
            errors: [],
            title: '',
            body: '',
            description: ''

        }

        this.handleViewOpen = this.handleViewOpen.bind(this);
        
    }

    handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};


    handleViewOpen(data)
    { 
       
        this.setState({
            title: data.post.title,
            description: data.post.description,
			body: data.post.body,
			user: data.post.user,
            viewOpen: true
        })
    }

    componentWillMount = () => {
        axios.get('/posts')
        .then((res) => {
          this.setState({
           posts: res.data,
           uiLoading: false
          })
        })
        .catch(err => {
            console.log(err);
        })

        
    }
    render() {

  
        dayjs.extend(relativeTime);
        const { classes } = this.props;
        
        const DialogContent = withStyles((theme) => ({
            root: {
                padding: theme.spacing(2)
            }
        }))(MuiDialogContent);

        const { open, errors, viewOpen } = this.state;

        const handleClickOpen = () => {
			this.setState({
				postId: '',
                title: '',
                description: '',
				body: '',
				buttonType: '',
				open: true
			});
		};

        const handleViewClose = () => {
			this.setState({ viewOpen: false });
        };
        
        const handleClose = (event) => {
			this.setState({ open: false });
		};

        if (this.state.uiLoading === true) {
			return (
				<main className={classes.content}>
					<div className={classes.toolbar} />
					{this.state.uiLoading && <CircularProgress size={150} className={classes.uiProgess} />}
				</main>
			);
        }
        else 
        {   
            return(
                <main className={classes.content}>
                    <div className={classes.toolbar} />

                    <Grid container spacing={3}>
						{this.state.posts.map((post) => (
							<Grid item key={post.postId}>
								<Card className={classes.root} key={post.postId}variant="outlined">
									<CardContent>
										<Typography variant="h5" component="h2">
											{post.title}
										</Typography>
										<Typography className={classes.pos} color="textSecondary">
											{dayjs(post.createdAt).fromNow()}
										</Typography>
										<Typography variant="body2" component="p">
											{`${post.description.substring(0, 65)}`}
										</Typography>
									</CardContent>
									<CardActions className={classes.cardActions}>
										<div className={classes.buttons}>
										<Button size="small" color="primary" onClick={() => this.handleViewOpen({ post })}>
											{' '}
											View{' '}
										</Button>
										<Button size="small" color="primary" onClick={() => this.handleLike({ post })}>
											Like
										</Button>
										<Button size="small" color="primary" onClick={() => this.shareHandler({ post })}>
											share
										</Button>
										</div>

										<Typography variant="body2" component="p" color="primary" className={classes.author}>
											Written by: {post.user}
										</Typography>
									</CardActions>
								</Card>
							</Grid>
						))}
					</Grid>
                    
                    <Dialog
						onClose={handleViewClose}
						aria-labelledby="customized-dialog-title"
						open={viewOpen}
						fullWidth
						classes={{ paperFullWidth: classes.dialogueStyle }}
					>
						<DialogTitle id="customized-dialog-title" onClose={handleViewClose}>
                                      		{this.state.title}
									  <Typography variant="body2" component="p">
											{this.state.description}
										</Typography>
                                        
						</DialogTitle>
						<DialogContent dividers>
							<TextField
								fullWidth
								id="postDetails"
								name="body"
								multiline
								readOnly
								rows={1}
								rowsMax={25}
								value={this.state.body}
								InputProps={{
									disableUnderline: true
								}}
							/>
						</DialogContent>
					</Dialog>

                </main>
            )
        }
    }
}

export default withStyles(styles)(Post);