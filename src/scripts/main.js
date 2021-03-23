import {getPosts, usePostCollection, createPost, getSinglePost, updatePost, getLoggedInUser, deletePost} from "./data/DataManager.js";
import {PostList} from "./feed/PostList.js";
import {NavBar} from "./nav/NavBar.js";
import {Footer} from "./nav/Footer.js";
import {PostEntry} from "./feed/PostEntry.js";
import {PostEdit} from "./feed/PostEdit.js";
/**
*?Main logic module for what should happen on initial page load for Giffygram
*/

//? Get a reference to the location on the DOM where the app will display
//! LOGOUT EVENT LISTENER
const applicationElement = document.querySelector(".giffygram");
applicationElement.addEventListener("click", event => {
	if (event.target.id === "logout"){
		console.log("You clicked on logout")
	}
})
//!HOME ICON EVENT LISTENER
const homeButton = document.querySelector(".giffygram");
homeButton.addEventListener("click", event => {
    if (event.target.id === "homeIcon"){
        console.log("Refresh Page")
    }
})
//! DIRECT MESSAGES LISTENER
const directMessage = document.querySelector(".giffygram");
directMessage.addEventListener("click", event => {
	if (event.target.id === "directMessageIcon"){
		console.log("DIRECT MESSAGES")
	}
})
//! EDIT EVENT LISTENER
applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id.startsWith("edit")) {
        const postId = event.target.id.split("--")[1];
        getSinglePost(postId)
            .then(response => {
            showEdit(response);
        })
    }
})
//! UPDATE POST EVENT LISTENER
applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id.startsWith("updatePost")) {
        const postId = event.target.id.split("__")[1];
        //? collect all the details into an object
        const title = document.querySelector("input[name='postTitle']").value
        const url = document.querySelector("input[name='postURL']").value
      const description = document.querySelector("textarea[name='postDescription']").value
      const timestamp = document.querySelector("input[name='postTime']").value
      
      const postObject = {
        title: title,
        imageURL: url,
        description: description,
        userId: getLoggedInUser().id,
        timestamp: parseInt(timestamp),
        id: parseInt(postId)
      }
      showPostEntry();
      updatePost(postObject)
      .then(response => {
          showPostList();
        });
    }
})
//! DELETE EVENT LISTENER
applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id.startsWith("delete")) {
        const postId = event.target.id.split("__")[1];
        deletePost(postId)
        .then(response => {
            showPostList();
        })
    }
})
//! YEAR SELECTION EVENT LISTENER
applicationElement.addEventListener("change", event => {
    if (event.target.id === "yearSelection") {
        const yearAsNumber = parseInt(event.target.value)
        
        console.log(`User wants to see posts since ${yearAsNumber}`)
    }
})
//! YEAR FILTER EVENT LISTENER
applicationElement.addEventListener("change", event => {
    if (event.target.id === "yearSelection") {
        const yearAsNumber = parseInt(event.target.value)
        console.log(`User wants to see posts since ${yearAsNumber}`)
      //? invoke a filter function passing the year as an argument
      showFilteredPosts(yearAsNumber);
    }
})

const showFilteredPosts = (year) => {
    //? get a copy of the post collection
    const epoch = Date.parse(`01/01/${year}`);
    //? filter the data
    const filteredData = usePostCollection().filter(singlePost => {
        if (singlePost.timestamp >= epoch) {
            return singlePost
        }
    })
    const postElement = document.querySelector(".postList");
    postElement.innerHTML = PostList(filteredData);
}
//! NEW POST CANCEL EVENT LISTENER
applicationElement.addEventListener("click", event => {
    if (event.target.id === "newPost__cancel") {
        //? clear the input fields
        showPostEntry();
    }
})
applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id === "newPost__submit") {
        //? collect the input values into an object to post to the DB
        const title = document.querySelector("input[name='postTitle']")
        const url = document.querySelector("input[name='postURL']")
        const description = document.querySelector("textarea[name='postDescription']").value
        //? we have not created a user yet - for now, we will hard code `1`.
        //* we can add the current time as well
        const postObject = {
            title: title.value,
            imageURL: url.value,
            description: description,
            userId: getLoggedInUser,
            timestamp: Date.now()
        }
  
        //? be sure to import from the DataManager
        createPost(postObject)
        .then(response => {
            console.log("what is the new post response", response)
            showPostList(response);
            showPostEntry();
        })
    }
})

const showPostEntry = () => { 
    //? Get a reference to the location on the DOM where the nav will display
    const entryElement = document.querySelector(".entryForm");
    entryElement.innerHTML = PostEntry();
}

const showPostList = () => {
    //? Get a reference to the location on the DOM where all the posts will display
    const postElement = document.querySelector(".postList");
    getPosts().then((allPosts) => {
        postElement.innerHTML = PostList(allPosts.reverse());
    })
}

const showEdit = (postObj) => {
    //? Get a reference to the location on the DOM where the Edit will display
    const entryElement = document.querySelector(".entryForm");
    entryElement.innerHTML = PostEdit(postObj);
  }

const showNavBar = () => {
    //? Get a reference to the location on the DOM where the nav will display
    const navElement = document.querySelector("nav");
	navElement.innerHTML = NavBar();
}

const showFooter = () => {
    //? Get a reference to the location on the DOM where the nav will display
    const navElement = document.querySelector("footer");
	navElement.innerHTML = Footer();
}
/*
?    This function performs one, specific task.

?    1. Can you explain what that task is?
?    2. Are you defining the function here or invoking it?
*/
const startGiffyGram = () => {
	showPostList();
    showNavBar();
    showFooter();
    showPostEntry();
};
//? Are you defining the function here or invoking it?
startGiffyGram();