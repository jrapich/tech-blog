const editButton = document.querySelector('.edit-button');
const deleteButton = document.querySelector('.delete-button');
const postID = document.querySelector('.editDiv').getAttribute('id');

editButton.addEventListener('click', async (event) => {
    event.preventDefault();
    document.location.replace(`/posts/edit/${postID}`);
});

deleteButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const sendPost = await fetch(`/api/modify/post/${postID}`, {
        method:'DELETE',
        // body: JSON.stringify({
        //     post_title:postTitle,
        //     post_content:postContent
        // }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (sendPost.status === 401) {
        console.log(`ERROR: you do not have permission to delete this post`);
        return;
    } else {
        const response = await sendPost.json();
        document.location.replace('/dashboard');
    }
});