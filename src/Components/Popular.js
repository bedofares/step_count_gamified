import React, { useState } from "react";
import { Text, View, Image, Pressable, ScrollView } from "react-native";
import { Avatar, Card } from "react-native-paper";
import { Foundation, AntDesign } from "@expo/vector-icons";

export default function Popular() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      userName: "Jeremy",
      time: "1h",
      message:
        "Good moring everyone happy friday have a great day and weekend.",
      imageSource: require("../../assets/share1.png"),
      likes: 10,
      comments: 5,
      avatarSource: require("../../assets/profile.jpg"),
    },
    {
      id: 2,
      userName: "James",
      time: "2h",
      message: "Have a nice day everyone! I just earned my first badge",
      imageSource: require("../../assets/share.png"),
      likes: 15,
      comments: 2,
      avatarSource: require("../../assets/profile10.jpg"),
    },
    {
      id: 3,
      userName: "Kingchris",
      time: "3h",
      message: "What a sunny day for a run.",
      imageSource: require("../../assets/share2.jpg"),
      likes: 8,
      comments: 0,
      avatarSource: require("../../assets/profile2.jpg"),
    },
    {
      id: 4,
      userName: "Paul",
      time: "4h",
      message:
        "Nothing is better than eraning a new badge . Have a nice day everyone",
      imageSource: require("../../assets/share3.png"),
      likes: 20,
      comments: 7,
      avatarSource: require("../../assets/profile4.jpg"),
    },
  ]);
  const [likedPosts, setLikedPosts] = useState([]);

  const handleLike = (postId) => {
    // Check if postId is already in likedPosts array
    if (likedPosts.includes(postId)) {
      // If postId is already liked, remove it from likedPosts array
      setLikedPosts(likedPosts.filter((id) => id !== postId));

      // Update the likes count of the corresponding post
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, likes: post.likes - 1 } : post
        )
      );
    } else {
      // If postId is not liked, add it to likedPosts array
      setLikedPosts([...likedPosts, postId]);

      // Update the likes count of the corresponding post
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, likes: post.likes + 1 } : post
        )
      );
    }
  };
  const LeftContent = ({ avatarSource }) => (
    <Avatar.Image
      size={50}
      source={avatarSource}
      style={{
        backgroundColor: "white",
        opacity: 1,
      }}
    />
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white", padding: 10 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          alignItems: "center",
          paddingTop: 20,
        }}
      >
        {posts.map((post) => (
          <Card
            key={post.id}
            style={{
              width: "90%",
              backgroundColor: "white",
              borderRadius: 5,
              marginBottom: 20,
            }}
          >
            <Card.Title
              title={post.userName}
              subtitle={post.time}
              left={() => <LeftContent avatarSource={post.avatarSource} />}
            />
            <Card.Content style={{ marginBottom: 10 }}>
              <Text>{post.message}</Text>
            </Card.Content>
            <Card.Cover
              source={post.imageSource}
              resizeMode="contain"
              style={{
                borderRadius: 0,
                backgroundColor: "white",
                borderColor: "#c2c1c7",
                paddingBottom: 10,
                borderBottomWidth: 1,
                width: "90%",
                alignSelf: "center",
              }}
            />
            <Card.Actions style={{ flexDirection: "row", padding: 10 }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row", // Add flexDirection to row
                  alignItems: "center", // Add alignItems to center
                  justifyContent: "center",
                  borderRightWidth: 1,
                  borderColor: "#c2c1c7",
                }}
              >
                <AntDesign
                  name="heart"
                  size={20}
                  color={likedPosts.includes(post.id) ? "red" : "#c2c1c7"}
                  //style={{padding:10,borderWidth:1,color:'red'}}
                  onPress={() => handleLike(post.id)}
                />
                <Text style={{ marginLeft: 5, color: "#c2c1c7", fontSize: 20 }}>
                  {post.likes}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row", // Add flexDirection to row
                  alignItems: "center", // Add alignItems to center
                  justifyContent: "center",
                  borderColor: "#c2c1c7",
                }}
              >
                <Foundation name="comment" size={20} color="#c2c1c7" />
                <Text style={{ marginLeft: 5, color: "#c2c1c7", fontSize: 20 }}>
                  {post.likes}
                </Text>
              </View>
            </Card.Actions>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}
