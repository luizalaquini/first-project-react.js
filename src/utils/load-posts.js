export const loadPosts = async () => {
    const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');
    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');

    const [posts, photos] = await Promise.all([postsResponse, photosResponse]);

    const postsJson = await posts.json();
    const photosJson = await photos.json();

    // temos mais fotos (5000) do que posts (100), por isso vamos limitar pelo
    // menor array, que é o de posts. Ou seja, precisamos jogar fora 4900 fotos!
    const postsAndPhotos = postsJson.map((post, index) => {
        return {...post, cover: photosJson[index].url }
    });

    return postsAndPhotos;
}