const postRows = document.querySelectorAll('.postrow');


const postIDs = async () => {
    const response = await fetch('/posts/id/all');
    const posts = await response.json();
    return posts;
}

const postRowEventHandler = async () => {
    let totalPosts = await postIDs();
    let rowID = [];
    for (let i = 0; i < totalPosts.length; i++) {
        postRows[i].addEventListener('click', async (event) => {
            event.preventDefault();
            rowID.push(postRows[i].getAttribute('id'));
            document.location.replace(`/posts/${rowID[i]}`);
        });
    }
}

postRowEventHandler();


