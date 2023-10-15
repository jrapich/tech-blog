const editButton = document.querySelector('.edit-button');
const deleteButton = document.querySelector('.delete-button');
const postID = document.querySelector('.editDiv').getAttribute('id');

//event listener for the editpost button. will redirectto the post editing page
editButton.addEventListener('click', async (event) => {
    event.preventDefault();
    document.location.replace(`/posts/edit/${postID}`);
});

//listener for the delete button. will send delete request for specific post to server
deleteButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const sendPost = await fetch(`/api/modify/post/${postID}`, {
        method:'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    //check error messages
    //TODO: display this on the page instead of logging to console
    if (sendPost.status === 401) {
        console.log(`ERROR: you do not have permission to delete this post`);
        return;
    } else {
        const response = await sendPost.json();
        document.location.replace('/dashboard');
    }
});