
const API_URL = "https://unit-2-project-api-25c1595833b2.herokuapp.com";
let apiKey;

// Function to register and get API key
async function register() {
  const response = await fetch(`${API_URL}/register`);
  const data = await response.json();

  apiKey = data.api_key;
}

// Function to get comments
async function getComments() {
  const response = await fetch(`${API_URL}/comments?api_key=${apiKey}`);
  const comments = await response.json();
  const commentsList = document.getElementById("comments-list");
  commentsList.innerHTML = "";

  comments.forEach((comment) => {
    const li = document.createElement("li");
    li.textContent = `${comment.name}: ${comment.comment}`;
    commentsList.appendChild(li);
  });
}

// Function to post a new comment
async function postComment(commentData) {
  const response = await fetch(`${API_URL}/comments?api_key=${apiKey}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentData),
  });
  const newComment = await response.json();
  // Optionally, update the UI to display the new comment
  getComments();
}

// Event listener for the comment form
document
  .getElementById("comment-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const comment = document.getElementById("comment").value;

    // Check if name and comment are provided
    if (name && comment) {
      postComment({ name, comment });
    } else {
      alert("Please enter both name and comment.");
    }
  });

// Initialize the application
register().then(() => {
  getComments(); // Load initial comments after registration
});
