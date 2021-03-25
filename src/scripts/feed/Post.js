import { getLikes, getLoggedInUser } from "../data/DataManager.js";

const getNumberOfLikes = (postId) => {
  getLikes(postId)
  .then(response => {
    document.querySelector(`#likes__${postId}`).innerHTML = `👍 ${response.length}`;
  })
}


export const Post = (postObject) => {
  const postDateConversion = postObject.timestamp * 1000;
  const postDateHuman = new Date(postDateConversion);
  // const postDate = postDateHuman.toLocaleTimeString("en-US", {weekday: "long"}).splice;
  const postTime = postDateHuman.toLocaleTimeString("en-US",{month: "short" , day: "2-digit", hour:"2-digit",minute: "2-digit"});
  return `
    <section class="post">
      <header>
        <h2 class="post__title">${postObject.title}</h2>
        <p>Grammed by ${postObject.user.name} on ${postTime}</p>
        <div class= "likeFeature"><p id="likes__${postObject.id}">👍 ${getNumberOfLikes(postObject.id)}</p>
        <button id="like__${postObject.id}">LIKE</button></div>
      </header>
      <img class="post__image" src="${postObject.imageURL}" />
      <p>${postObject.description}</p>
      ${postObject.user.id === getLoggedInUser().id
        ?`<div class="ownerButtons"><button id="edit--${postObject.id}">Edit</button>
        <button id="delete__${postObject.id}">Delete</button></div>`
        :""
      }
    </section>
  `
};
