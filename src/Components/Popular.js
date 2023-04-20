import React, { useState } from "react";
import { Text, View, Image, Pressable, ScrollView } from "react-native";
import { Avatar, Card } from "react-native-paper";
import { Foundation, AntDesign } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { incrementLikes } from "../feature/stepCounter/stepCounterSlice";

export default function Popular() {
  const posts = useSelector((state) => state.stepCounter.posts);
  const dispatch = useDispatch();

  const handleLike = (postId) => {
    dispatch(incrementLikes(postId));
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
                  color={post.liked?"red":"#c2c1c7"}
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
                  {post.comment}
                </Text>
              </View>
            </Card.Actions>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}
