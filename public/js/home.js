const postRows = document.querySelectorAll('.postrow');


const postIDs = async () => {
    const response = await fetch('/posts/id/all');
    const posts = await response.json();
    return posts;
}

const postRowEventHandler = async () => {
    let totalPosts = await postIDs();
    let rowID = [];

    for (let j = 0; j < totalPosts.length; j++) {
        rowID.push(postRows[j].getAttribute('id'));
    }

    for (let i = 0; i < totalPosts.length; i++) {
        postRows[i].addEventListener('click', async (event) => {
            event.preventDefault();
            document.location.replace(`/posts/${rowID[i]}`);
        });
    }
}

postRowEventHandler();


