export const PostEdit = (postObj) => {
    return `
	<div class="newPost">
	<h3>Edit This Post</h3>
		<div>
			<input value="${postObj.title}"
				   name="postTitle"
				   class="newPost__input"
				   type="text"
				   placeholder="Title" />
		</div>
		<div>
			<input value="${postObj.imageURL}"
				   name="postURL"
				   class="newPost__input"
				   type="text"
				   placeholder="URL of gif" />
		</div>

    	<textarea name="postDescription"
    	class="newPost__input newPost__description"
    	placeholder="Story behind your gif...">${postObj.description}</textarea>
		
		<input type="hidden" value="${postObj.id}" name="postId">
		<input type="hidden" value="${postObj.timestamp}" name="postTime">	
		<button id="updatePost__${postObj.id}">Update</button>
		<button id="newPost__cancel">Cancel</button>
	</div>
	`
}