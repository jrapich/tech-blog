const post = document.querySelector('#submitPost');
const editPost = document.querySelector('#editPost');
const comment = document.querySelector('#submitComment');
const editComment = document.querySelector('#editComment');

//const commentID = document.querySelector('.commentID').getAnimations('id');


//logic which checks if we are on a page that can make a new post, edit a current post, or make a new comment

//TODO: needs better logic to check against various error messages from server

//logic for making a new post
if (post) {
    post.addEventListener('click', async (event) => {
        event.preventDefault();
        const postTitle = document.querySelector('#floatingInputTitle').value.trim();
        const postContent = document.querySelector('#floatingInputContent').value.trim();
        const sendPost = await fetch('/api/submit/post', {
            method:'POST',
            body: JSON.stringify({
                post_title:postTitle,
                post_content:postContent
            }),
            headers: { 'Content-Type': 'application/json' },
        });
        const response = await sendPost.json();
        document.location.reload();
    });
};

//for editing a current post
if (editPost) {
    const postID = document.querySelector('.postID').getAttribute('id');
    editPost.addEventListener('click', async (event) => {
        event.preventDefault();
        const postContent = document.querySelector('#floatingInputContent').value.trim();
        const sendPost = await fetch(`/api/modify/post/${postID}`, {
            method:'PUT',
            body: JSON.stringify({
                post_content:postContent
            }),
            headers: { 'Content-Type': 'application/json' },
        });
        const response = await sendPost.json();
        document.location.replace(`/gitposts/${postID}`);
    });
};

//for adding a comment
if (comment) {
    const postID = document.querySelector('.editDiv').getAttribute('id');
    comment.addEventListener('click', async (event) => {
        event.preventDefault();
        const commentContent = document.querySelector('#floatingInputContent').value.trim();
        const sendComment = await fetch('/api/submit/comment', {
            method:'POST',
            body: JSON.stringify({
                comment_content:commentContent,
                post_id:postID,
            }),
            headers: { 'Content-Type': 'application/json' },
        });
        const response = await sendComment.json();
        document.location.reload();
    });
}