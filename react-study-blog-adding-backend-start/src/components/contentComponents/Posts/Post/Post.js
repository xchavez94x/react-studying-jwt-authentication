import React, { PureComponent } from "react";

import styles from "./Post.css"

class Post extends PureComponent {

    render() {
        let post = this.props.fetchedPost.map( post => {
        return (
                <div key={post._id} className={styles.Post}>
                    <div className={styles.Header} >
                        <h1>{post.title}</h1>
                    </div>
                    <div className={styles.Paragraph}>
                        <p>{post.content}</p>
                    </div>
                    <div className={styles.Image}>
                        <img src={post.imagePath} alt="fetchedImage" />
                    </div>
                    
                    
                </div>
            )
        })
        return post
    }
}

export default Post;