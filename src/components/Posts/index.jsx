import React from 'react';
import P from 'prop-types';

import { PostCard } from '../PostCard';

import './style.css'

export const Posts = ({posts} = []) => (
    <div className="posts">
        {posts && posts.map(post => (
            <PostCard 
                title={post.title} 
                body={post.body} 
                cover={post.cover} 
                id={post.id}
                key={post.id}
                //post = {post}
            />
        ))}
    </div>
);

Posts.propTypes = {
    posts: P.array,
};

Posts.defaultProps = {
    posts: [],
}