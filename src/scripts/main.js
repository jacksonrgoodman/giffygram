import {getPosts, postLike, getLoggedInUserPosts, logoutUser, registerUser, loginUser, setLoggedInUser, usePostCollection, createPost, getSinglePost, updatePost, getLoggedInUser, deletePost} from "./data/DataManager.js";
import {PostList} from "./feed/PostList.js";
import {NavBar} from "./nav/NavBar.js";
import {Footer} from "./nav/Footer.js";
import {PostEntry} from "./feed/PostEntry.js";
import {PostEdit} from "./feed/PostEdit.js";
import {LoginForm} from "./auth/LoginForm.js";
import {RegisterForm} from "./auth/RegisterForm.js";

/**
*?Main logic module for what should happen on initial page load for Giffygram
*/

//? Get a reference to the location on the DOM where the app will display
const applicationElement = document.querySelector(".giffygram");

applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id === "login__submit") {
      //collect all the details into an object
      const userObject = {
        name: document.querySelector("input[name='name']").value,
        email: document.querySelector("input[name='email']").value
      }
      loginUser(userObject)
      .then(dbUserObj => {
        if(dbUserObj){
          sessionStorage.setItem("user", JSON.stringify(dbUserObj));
          startGiffyGram();
        }else {
          //got a false value - no user
          const entryElement = document.querySelector(".entryForm");
          entryElement.innerHTML = `<p class="center">That user does not exist. Please try again or register for your free account.</p> ${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
        }
      })
    }
})

applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id === "register__submit") {
      //collect all the details into an object
      const userObject = {
        name: document.querySelector("input[name='registerName']").value,
        email: document.querySelector("input[name='registerEmail']").value
      }
      registerUser(userObject)
      .then(dbUserObj => {
        sessionStorage.setItem("user", JSON.stringify(dbUserObj));
        startGiffyGram();
      })
    }
})

//! LOGOUT EVENT LISTENER
applicationElement.addEventListener("click", event => {
    if (event.target.id === "logout") {
      logoutUser();
    //   console.log(getLoggedInUser());
      sessionStorage.clear();
      checkForUser();
    }
})

//! MY POSTS BUTTON
applicationElement.addEventListener("click", event => {
    if (event.target.id === "myPosts"){
        //? this is where isht needs to go
        // showPostList().name === getLoggedInUser().name
        const postElement = document.querySelector(".postList")
        getLoggedInUserPosts()
        .then(usersPosts =>
            postElement.innerHTML = PostList(usersPosts))
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
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id.startsWith("like")) {
        console.log("eventLike",event.target.id)
	  const likeObject = {
		 postId: event.target.id.split("__")[1],
		 userId: getLoggedInUser().id
	  }
	  postLike(likeObject)
		.then(response => {
		  showPostList();
		})
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
        
        // console.log(`User wants to see posts since ${yearAsNumber}`)
    }
})
//! YEAR FILTER EVENT LISTENER
applicationElement.addEventListener("change", event => {
    if (event.target.id === "yearSelection") {
        const yearAsNumber = parseInt(event.target.value)
        // console.log(`User wants to see posts since ${yearAsNumber}`)
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
            userId: getLoggedInUser().id,
            timestamp: Date.now()
        }
  
        //? be sure to import from the DataManager
        createPost(postObject)
        .then(response => {
            // console.log("what is the new post response", response)
            showPostList(response);
            showPostEntry();
        })
    }
})

const checkForUser = () => {
    if (sessionStorage.getItem("user")){
        setLoggedInUser(JSON.parse(sessionStorage.getItem("user")));
      startGiffyGram();
    }else {
         showLoginRegister();
    }
}

const showLoginRegister = () => {
    showNavBar();
    const entryElement = document.querySelector(".entryForm");
    //template strings can be used here too
    entryElement.innerHTML = `${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
    //make sure the post list is cleared out too
  const postElement = document.querySelector(".postList");
  postElement.innerHTML = "";
}

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
checkForUser();