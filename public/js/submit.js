const post = document.querySelector('#submitPost');
const comment = document.querySelector('#submitComment');

if (post) {
    post.addEventListener('click', async (event) => {
        event.preventDefault();
        console.log('is this event happening?');
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