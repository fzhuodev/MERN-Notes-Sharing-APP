import React, { useState, useEffect } from 'react'
import useStyles from './styles';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
    const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);

    const clear = () => {
        setCurrentId(0);
        setPostData({ title: '', message: '', tags: '', selectedFile: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentId === 0) {
            dispatch(createPost({ ...postData, name: user?.result?.name }));
            clear();
        } else {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
            clear();
        }
    };

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center" color="red">
                    Sign In to Share and Edit Your Notes
                </Typography>
            </Paper>
        );
    }


    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6"> {currentId ? 'Editing' : 'Creating'} Public Notes</Typography>


                <TextField name="title" variant="outlined" label="Content" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="message" variant="outlined" label="Subject " fullWidth multiline rows={1} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField name="tags" variant="outlined" label="Tags (coma or space to separate tags)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />

                <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>

                <Button className={classes.buttonSubmit}
                    variant="contained"
                    color="primary"
                    size="medium"
                    type="submit"
                    fullWidth>
                    Submit
                </Button>
                
                <Button variant="contained" color="secondary" size="medium" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
};

export default Form;
