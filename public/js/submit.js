const post = document.querySelector('#submitPost');
const editPost = document.querySelector('#editPost');
const comment = document.querySelector('#submitComment');
const editComment = document.querySelector('#editComment');

//const commentID = document.querySelector('.commentID').getAnimations('id');

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