import { getLoggedInUser } from "../data/DataManager.js";

export const Post = (postObject) => {
    
  return `
    <section class="post">
      <header>
        <h2 class="post__title">${postObject.title}</h2>
        <p>Grammed by ${postObject.user.name} on ${Date(postObject.timestamp)}</p>
      </header>
      <img class="post__image" src="${postObject.imageURL}" />
      <p>${postObject.description}</p>
      ${postObject.user.id === getLoggedInUser().id
        ?`<div><button id="edit--${postObject.id}">Edit</button></div>
        <button id="delete__${postObject.id}">Delete</button>`
        :""
      }
    </section>
  `
};
