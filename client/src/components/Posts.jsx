// post: Posts Editing Dashboard!
// Implement: Show all your Posts
//            Edit your Posts
//            Create your Posts
//            Delete your Posts

//Fix up Nav Components


import React, { Component } from "react";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { authMiddleware } from "../util/auth";

import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import CardContent from "@material-ui/core/CardContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";

const styles = (theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  toolbar: theme.mixins.toolbar,
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  submitButton: {
    display: "block",
    color: "white",
    textAlign: "center",
    position: "absolute",
    top: 14,
    right: 10,
  },
  floatingPoint: {
    position: "fixed",
    bottom: 0,
    right: 0,
  },
  form: {
    width: "98%",
    marginLeft: 13,
    marginTop: theme.spacing(10),
  },
  root: {
    minWidth: 470,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  pos: {
    marginBottom: 12,
  },
  uiProgress: {
    position: "fixed",
    zIndex: "1000",
    height: "31px",
    width: "31px",
    left: "50%",
    top: "35%",
  },
  dialogStyle: {
    maxWidth: "50%",
  },
  viewRoot: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  floatingButton: {
    position: 'fixed',
    bottom: 0,
    right: 0
  }
});


class Posts extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      posts: [],
      title: "",
      description: "",
      body: "",
      postId: "",
      errors: [],
      open: false,
      uiLoading: true,
      buttonType: "",
      viewOpen: false,
    };

    this.deletePostHandler = this.deletePostHandler.bind(this);
    this.handleEditClickOpen = this.handleEditClickOpen.bind(this);
    this.handleViewOpen = this.handleViewOpen.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentWillMount = () => {
    
    const authToken = authMiddleware(this.props.history);
    axios.defaults.headers.common = { Authorization: `${authToken}` };

    axios
      .get("/post")
      .then((res) => {
        this.setState({
          posts: res.data,
          uiLoading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deletePostHandler(data) {
    
    const authToken = authMiddleware(this.props.history);
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    let postId = data.post.postId;
    
    axios
      .delete(`post/${postId}`)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleViewOpen(data) {
    this.setState({
      title: data.post.title,
      description: data.post.description,
      body: data.post.body,
      viewOpen: true,
    });
  }

  handleEditClickOpen(data) {
    this.setState({
      title: data.post.title,
      description: data.post.description,
      body: data.post.body,
      postId: data.post.postId,
      buttonType: "Edit",
      open: true,
    });
  }

  render() {

    const DialogTitle = withStyles(styles)((props) => {
        console.log("DialogTitle: ", props);
      const { children, classes, onClose, ...other } = props;
      return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
          <Typography variant="h6">{children}</Typography>
          {onClose ? (
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </MuiDialogTitle>
      );
    });

    const DialogContent = withStyles((theme) => ({
      viewRoot: {
        padding: theme.spacing(6),
      },
    }))(MuiDialogContent);

    dayjs.extend(relativeTime);
    const { classes } = this.props;
    const { open, errors, viewOpen } = this.state;

    const handleClickOpen = () => {
      this.setState({
        postId: "",
        title: "",
        description: "",
        body: "",
        buttonType: "",
        open: true,
      });
    };

    const handleSubmit = (e) => {
      authMiddleware(this.props.history);
      e.preventDefault();
      const userpost = {
        title: this.state.title,
        description: this.state.description,
        body: this.state.body,
      };

      let options = {};
      if (this.state.buttonType === "Edit")
        options = {
          url: `/post/${this.state.postId}`,
          method: "put",
          data: userpost,
        };
      else
        options = {
          url: "/post",
          method: "post",
          data: userpost,
        };

      const authToken = localStorage.getItem("AuthToken");
      axios.defaults.headers.common = { Authorization: `${authToken}` };
      axios(options)
        .then(() => {
          this.setState({ open: false });
          window.location.reload();
        })
        .catch((err) => {
          this.setState({ open: true, errors: err.response.data });
          console.log(err);
        });
    };

    const handleViewClose = () => {
      this.setState({ viewOpen: false });
    };

    const handleClose = (e) => {
      this.setState({ open: false });
    };

    if (this.state.uiLoading === true)
      return (
        <main className="classes.content">
          <div className={classes.toolbar} />
          {this.state.uiLoading && (
            <CircularProgress size={150} className={classes.uiProgress} />
          )}
        </main>
      );
    else
      return (
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <IconButton
            className={classes.floatingButton}
            color="primary"
            aria-label="Add Post"
            onClick={handleClickOpen}
          >
            <AddCircleIcon style={{ fontSize: 60 }} />
          </IconButton>

          <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
          >
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  {this.state.buttonType === "Edit"
                    ? "Edit post"
                    : "Create a new post"}
                </Typography>
                <Button
                  autoFocus
                  color="inherit"
                  onClick={handleSubmit}
                  className={classes.submitButton}
                >
                  {this.state.buttonType === "Edit" ? "Save" : "Submit"}
                </Button>
              </Toolbar>
            </AppBar>

            <form className={classes.form} noValidate>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="postTitle"
                    label="Post Title"
                    name="title"
                    autoComplete="postTitle"
                    helperText={errors.title}
                    value={this.state.title}
                    error={errors.title ? true : false}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="postDescription"
                    label="Post Description"
                    name="description"
                    autoComplete="postDescription"
                    helperText={errors.description}
                    value={this.state.description}
                    error={errors.description ? true : false}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="postDetails"
                    label="Post Details"
                    name="body"
                    autoComplete="postDetails"
                    multiline
                    rows={25}
                    rowsMax={25}
                    helperText={errors.body}
                    error={errors.body ? true : false}
                    onChange={this.handleChange}
                    value={this.state.body}
                  />
                </Grid>
              </Grid>
            </form>
          </Dialog>
          
          <Typography color="primary" variant="h3" className={classes.text} noWrap>Your Posts</Typography>
          <Grid container spacing={2}>
              
            {this.state.posts.map((post) => (
              <Grid item key={post.postId}>
                <Card className={classes.root} variant="outlined">
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
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => this.handleViewOpen({ post })}
                    >
                      {" "}
                      View{" "}
                    </Button>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => this.handleEditClickOpen({ post })}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => this.deletePostHandler({ post })}
                    >
                      Delete
                    </Button>
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
                classes={{ paperFullWidth: classes.dialogStyle }}
          >
              <DialogTitle id="customized-dialog-title" onClose={handleViewClose}>
                  {this.state.title}
           

                  <TextField 
                        fullWidth
                        id="postDescription"
                        name="description"
                        multiline
                        readOnly
                        rows={1}
                        rowsMax={1}
                        value={this.state.description}
                        InputProps={{
                            disableUnderline: true
                        }}
                  />
                     </DialogTitle>

              <DialogContent dividers>
                  <TextField 
                        fullWidth
                        id="postBody"
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
      );
  }
}

export default withStyles(styles)(Posts);
