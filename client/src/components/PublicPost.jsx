import React, { Component } from 'react'

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Grid, Card, CardContent, CardActions, Button} from '@material-ui/core';
import {Dialog, DialogTitle, TextField} from '@material-ui/core';
import MuiDialogContent from '@material-ui/core/DialogContent';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ShareIcon from '@material-ui/icons/Share';

import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const styles = ((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
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
		maxWidth: '100%',
		maxHeight: '80%'

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

    componentDidMount = () => {
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

        const {  viewOpen } = this.state;


        const handleViewClose = () => {
			this.setState({ viewOpen: false });
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
					<Typography color="primary" variant="h3" className={classes.text}>Public Posts</Typography>
                    <Grid container spacing={2}>
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
											<ThumbUpIcon/>
										</Button>
										<Button size="small" color="primary" onClick={() => this.shareHandler({ post })}>
											<ShareIcon/>
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
							<Typography variant="body2" component="p" color="primary" className={classes.author}>
											Written by: {this.state.user}
										</Typography>
						</DialogContent>
					</Dialog>

                </main>
            )
        }
    }
}

export default withStyles(styles)(Post);