//function to fetch all post id/s currently stored on the server
const postIDs = async () => {
    const response = await fetch('/posts/id/all');
    const posts = await response.json();
    return posts;
}

//event handler to create each post as a row
const postRowEventHandler = async () => {
    let totalPosts = await postIDs();
    const postRows = document.querySelectorAll('.postrow');
    let rowID = [];

    //get each row ID weve generated and add to an array
    for (let j = 0; j < postRows.length; j++) {
        rowID.push(postRows[j].getAttribute('id'));
    }

    //add event listener to each post row generated via the rowID array
    for (let i = 0; i < postRows.length; i++) {
        postRows[i].addEventListener('click', async (event) => {
            event.preventDefault();
            document.location.replace(`/posts/${rowID[i]}`);
        });
    }
}

postRowEventHandler();