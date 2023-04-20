import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  points: 0,
  goal: 10000,
  posts: [
    {
      id: 1,
      userName: "Jeremy",
      time: "1h",
      message:
        "Good moring everyone happy friday have a great day and weekend.",
      imageSource: require("../../../assets/share1.png"),
      likes: 10,
      comments: 5,
      avatarSource: require("../../../assets/profile.jpg"),
      liked: false, // Add liked property
    },
    {
      id: 2,
      userName: "James",
      time: "2h",
      message: "Have a nice day everyone! I just earned my first badge",
      imageSource: require("../../../assets/share.png"),
      likes: 15,
      comments: 2,
      avatarSource: require("../../../assets/profile10.jpg"),
      liked: false, // Add liked property
    },
    {
      id: 3,
      userName: "Kingchris",
      time: "3h",
      message: "What a sunny day for a run.",
      imageSource: require("../../../assets/share2.jpg"),
      likes: 8,
      comments: 0,
      avatarSource: require("../../../assets/profile2.jpg"),
      liked: false, // Add liked property
    },
    {
      id: 4,
      userName: "Paul",
      time: "4h",
      message:
        "Nothing is better than eraning a new badge . Have a nice day everyone",
      imageSource: require("../../../assets/share3.png"),
      likes: 20,
      comments: 7,
      avatarSource: require("../../../assets/profile4.jpg"),
      liked: false, // Add liked property
    },
  ],
};

export const stepCounterSlice = createSlice({
  name: "stepCounter",
  initialState,
  reducers: {
    setPoints: (state, action) => {
      state.points += action.payload;
    },
    increamentGoal: (state, action) => {
      state.goal += action.payload;
    },
    decrementGoal: (state, action) => {
      state.goal <= 0 ? (state.goal = 0) : (state.goal -= action.payload);
    },
    incrementLikes: (state, action) => {
      const postId = action.payload;
      const postToUpdate = state.posts.find((post) => post.id === postId);
      if (postToUpdate) {
        // Check if the post has already been liked
        if (!postToUpdate.liked) {
          postToUpdate.likes += 1;
          postToUpdate.liked = true;
        } else {
          postToUpdate.likes -= 1;
          postToUpdate.liked = false;
        }
      }
    },
    addPost: (state, action) => {
      const newPost = { ...action.payload, id: Date.now(), liked: false }; // Generate a unique id for the new post
      state.posts.unshift(newPost); // Add the new post to the beginning of the posts array
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setPoints,
  increamentGoal,
  decrementGoal,
  incrementLikes,
  addPost,
} = stepCounterSlice.actions;

export default stepCounterSlice.reducer;
