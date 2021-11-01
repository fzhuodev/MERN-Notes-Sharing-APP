//controller file is not necssary, but recommended.
//all the functions were created in routes/posts.js will be created here
//so the code won't be messy

import express from 'express';
import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        //we use async func because find() method takes time

        console.log(postMessages);
        res.status(200).json(postMessages);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const createPost = async (req, res) => {
    const post = req.body;

    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with such id');
//make sure id is valid

    const updatePost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
    res.json(updatePost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);
    res.json({ message: "Post deleted successfully." });
}
