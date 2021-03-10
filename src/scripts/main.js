import {getPosts} from "./data/DataManager.js";
import {PostList} from "./feed/PostList.js";
import {NavBar} from "./nav/NavBar.js";
import {Footer} from "./nav/Footer.js";
/**
 * Main logic module for what should happen on initial page load for Giffygram
 */

//Get a reference to the location on the DOM where the app will display
// let postElement = document.querySelector(".postList");
// let navElement = document.querySelector("nav");
// let entryElement = document.querySelector(".entryForm")
const applicationElement = document.querySelector(".giffygram");
applicationElement.addEventListener("click", event => {
	if (event.target.id === "logout"){
		console.log("You clicked on logout")
	}
})

const homeButton = document.querySelector(".giffygram");
homeButton.addEventListener("click", event => {
    if (event.target.id === "homeIcon"){
        console.log("Refresh Page")
    }
})

const directMessage = document.querySelector(".giffygram");
directMessage.addEventListener("click", event => {
	if (event.target.id === "directMessageIcon"){
		console.log("DIRECT MESSAGES")
	}
})


applicationElement.addEventListener("click", (event) => {
	
	if (event.target.id.startsWith("edit")){
		console.log("post clicked", event.target.id.split("--"))
		console.log("the id is", event.target.id.split("--")[1])
	}
})

applicationElement.addEventListener("change", event => {
    if (event.target.id === "yearSelection") {
      const yearAsNumber = parseInt(event.target.value)
  
      console.log(`User wants to see posts since ${yearAsNumber}`)
    }
})

const showPostList = () => {
    const postElement = document.querySelector(".postList");
    getPosts().then((allPosts) => {
        postElement.innerHTML = PostList(allPosts);
    })
}
const showNavBar = () => {
    //Get a reference to the location on the DOM where the nav will display
    const navElement = document.querySelector("nav");
	navElement.innerHTML = NavBar();
}

const showFooter = () => {
    //Get a reference to the location on the DOM where the nav will display
    const navElement = document.querySelector("footer");
	navElement.innerHTML = Footer();
}
/*
    This function performs one, specific task.

    1. Can you explain what that task is?
    2. Are you defining the function here or invoking it?
*/
const startGiffyGram = () => {
	showPostList();
    showNavBar();
    showFooter();
};
// Are you defining the function here or invoking it?
startGiffyGram();