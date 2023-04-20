import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Avatar, Modal, Portal } from "react-native-paper";
import { AntDesign, FontAwesome, Entypo } from "@expo/vector-icons";

import {
  addPost,
} from "../feature/stepCounter/stepCounterSlice";

export default function Badges({ badges }) {
  const [visible, setVisible] = useState(Array(badges.length).fill(false));
  const [text, onChangeText] = useState("");
  const [share, setShare] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const showModal = (index) => {
    const newVisible = [...visible];
    newVisible[index] = true;
    setVisible(newVisible);
  };

  const hideModal = (index) => {
    const newVisible = [...visible];
    newVisible[index] = false;
    setVisible(newVisible);
    setShare(false)
    onChangeText("")
  };
  const containerStyle = {
    backgroundColor: "white",
    //height: "50%",
    width: "95%",
    //shadowColor: "transparent",
    shadowOpacity: 0,
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    justifyContent: "center",
    alignItems: "center",
  };

  badges.sort((a, b) => a.steps - b.steps);
  return (
    <>
      <View
        style={{
          backgroundColor: "white",
          paddingTop: 10,
        }}
      >
        <Text
          style={{
            fontSize: 25,
            color: "#89888F",
            textAlign: "center",
          }}
        >
          LATEST ACHIEVEMENT
        </Text>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50,
            padding: 10,
            marginTop: 5,
            borderColor: "rgb(216,216,216)",
            backgroundColor: "white",
          }}
        >
          {badges.filter((badge) => badge.unlocked).length > 0 ? (
            <>
              <Avatar.Image
                size={80}
                source={
                  badges
                    .filter((badge) => badge.unlocked)
                    .reverse()
                    .find((badge) => badge.unlocked).img
                }
                style={{ backgroundColor: "white", opacity: 1 }}
              />
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "bold",
                }}
              >
                {
                  badges
                    .filter((badge) => badge.unlocked)
                    .reverse()
                    .find((badge) => badge.unlocked).steps
                }{" "}
                steps
              </Text>
            </>
          ) : (
            <Text>No badges unlocked yet</Text>
          )}
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "white",
          paddingTop: 20,
        }}
      >
        <View
          style={{
            backgroundColor: "#89888F",
            height: 2,
            flex: 1,
            alignSelf: "center",
          }}
        />
        <Text
          style={{
            paddingHorizontal: 10,
            fontSize: 18,
            color: "#89888F",
            textAlign: "center",
            flex: 1,
          }}
        >
          DAILY STEPS
        </Text>
        <View
          style={{
            backgroundColor: "#89888F",
            height: 2,
            flex: 1,
            alignSelf: "center",
          }}
        />
      </View>
      <ScrollView style={{ flex: 1, backgroundColor: "white", padding: 10 }}>
        <View
          style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", gap: 5 }}
        >
          {badges.map((item, index) => (
            <View
              key={index} // Add unique key prop
              style={{
                alignItems: "center",
                borderRadius: 50,
                padding: 10,
                marginTop: 5,
                borderWidth: 0,
                width: 100,
                backgroundColor: "white",
                flexGrow: 1,
              }}
            >
              <Portal>
                <Modal
                  theme={{
                    colors: {
                      backdrop: "rgba(0,0,0,0.3)",
                    },
                  }}
                  visible={visible[index]} // Update visibility based on the state
                  onDismiss={() => hideModal(index)}
                  contentContainerStyle={containerStyle}
                  style={{ alignItems: "center" }}
                >
                  <AntDesign
                    name="close"
                    size={24}
                    color="black"
                    style={{ position: "absolute", left: 10, top: 10 }}
                    onPress={() => hideModal(index)}
                  />
                  {share ? (
                    <Pressable
                      onPress={() => {
                        dispatch(
                          addPost({
                            userName: "User",
                            time: "0m",
                            message: text,
                            imageSource: item.rewardImg,
                            likes: 0,
                            comments: 0,
                            avatarSource: require("../../assets/avatar.png"),
                            liked: false,
                          }),
                          hideModal(index),
                          navigation.navigate("Community")
                        );
                      }}
                      style={{ position: "absolute", right: 20, top: 10 }}
                    >
                      <Text
                        style={{
                          padding: 5,
                          paddingHorizontal: 15,
                          backgroundColor: "#00B9FE",
                          color: "white",
                        }}
                      >
                        Post
                      </Text>
                    </Pressable>
                  ) : (
                    ""
                  )}
                  {!share ? (
                    <>
                      <Avatar.Image
                        size={120}
                        source={item.img}
                        style={{
                          backgroundColor: "white",
                          opacity: 1,
                          marginTop: 20,
                        }}
                      />
                      <Text
                        style={{
                          marginTop: 10,
                          textAlign: "center",
                          fontWeight: "bold",
                          fontSize: 20,
                        }}
                      >
                        Congratulations!{"\n"} you just got a new badge.
                      </Text>
                      <Text style={{ marginTop: 10 }}>
                        You just got a new badge "{item.steps} steps" badge{" "}
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          color: "black",
                          marginTop: 5,
                          //textAlign: "center",
                        }}
                      >
                        Points earned : +{item.points}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          backgroundColor: "white",
                          paddingTop: 20,
                        }}
                      >
                        <View
                          style={{
                            backgroundColor: "#89888F",
                            height: 2,
                            flex: 1,
                            alignSelf: "center",
                          }}
                        />
                        <Text
                          style={{
                            paddingHorizontal: 0,
                            fontSize: 15,
                            color: "#89888F",
                            textAlign: "center",
                            flex: 1,
                          }}
                        >
                          SHARE MY ACHIEVEMENT
                        </Text>
                        <View
                          style={{
                            backgroundColor: "#89888F",
                            height: 2,
                            flex: 1,
                            alignSelf: "center",
                          }}
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          marginTop: 15,
                          marginBottom: 15,
                        }}
                      >
                        <FontAwesome
                          name="group"
                          size={30}
                          color="black"
                          style={{ marginRight: 15 }}
                          onPress={() => {
                            setShare(true);
                          }}
                        />
                        <Entypo
                          name="facebook-with-circle"
                          size={30}
                          color="#3b5998"
                          style={{ marginRight: 15 }}
                        />
                        <FontAwesome
                          name="whatsapp"
                          size={30}
                          color="#075E54"
                          style={{ marginRight: 15 }}
                        />
                        <Entypo
                          name="twitter-with-circle"
                          size={30}
                          color="#00acee"
                        />
                      </View>
                    </>
                  ) : (
                    <>
                      <View
                        style={{
                          marginTop: 50,
                          flexDirection: "column",
                          width: "100%",
                        }}
                      >
                        <View style={{}}>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              padding: 10,
                            }}
                          >
                            <Avatar.Image
                              size={40}
                              source={require("../../assets/avatar.png")}
                              style={{ backgroundColor: "white" }}
                            />
                            <Text style={{ fontWeight: "bold" }}>User</Text>
                          </View>
                          <TextInput
                            style={{
                              marginBottom: 10,
                              borderBottomColor: "rgb(216,216,216)",
                              borderBottomWidth: 1,
                              padding: 5,
                              paddingLeft: 15,
                              fontSize: 18,
                            }}
                            onChangeText={onChangeText}
                            value={text}
                            placeholder="What are you up to ?"
                          />
                        </View>
                        <Image
                          style={{
                            width: 250,
                            height: 200,
                            alignSelf: "center",
                            borderBottomWidth: 1,
                            marginBottom: 20,
                          }}
                          source={item.rewardImg}
                        />
                      </View>
                    </>
                  )}
                </Modal>
              </Portal>
              <Pressable
                //style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  if (item.unlocked) {
                    showModal(index);
                  }
                }}
              >
                <Avatar.Image
                  size={80}
                  source={item.img}
                  style={{
                    backgroundColor: "white",
                    opacity: item.unlocked ? 1 : 0.5,
                  }}
                />
              </Pressable>
              <Text
                style={{
                  flex: 1,
                  fontSize: 13,
                  fontWeight: "bold",
                  color: item.unlocked ? "black" : "#89888F",
                }}
              >
                {item.steps} steps
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
}
