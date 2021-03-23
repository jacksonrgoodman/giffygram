export const Post = (postObject) => {
  return `
    <section class="post">
      <header>
          <h2 class="post__title">${postObject.title}</h2>
          <p>posted by ${postObject.userId}</p>
      </header>
      <img class="post__image" src="${postObject.imageURL}" />
      <p>${postObject.description}</p>
      <div><button id="edit--${postObject.id}">Edit</button></div>
      <button id="delete__${postObject.id}">Delete</button>
    </section>
  `
}