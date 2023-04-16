import { View, Text, ScrollView, Pressable, Button } from "react-native";
import React, { useState } from "react";
import { Avatar, Modal, Portal } from "react-native-paper";
import { AntDesign, FontAwesome, Entypo } from "@expo/vector-icons";

export default function Badges({ badges }) {
  const [visible, setVisible] = useState(Array(badges.length).fill(false));

  const showModal = (index) => {
    const newVisible = [...visible];
    newVisible[index] = true;
    setVisible(newVisible);
  };

  const hideModal = (index) => {
    const newVisible = [...visible];
    newVisible[index] = false;
    setVisible(newVisible);
  };
  const containerStyle = {
    backgroundColor: "white",
    height: "100%",
    //shadowColor: "transparent",
    shadowOpacity: 0,
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    justifyContent: "flex-start",
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
                      backdrop: "white",
                    },
                  }}
                  visible={visible[index]} // Update visibility based on the state
                  onDismiss={() => hideModal(index)}
                  contentContainerStyle={containerStyle}
                  //style={{borderWidth:1}}
                >
                  <AntDesign
                    name="close"
                    size={24}
                    color="black"
                    style={{ position: "absolute", left: 10, top: 10 }}
                    onPress={() => hideModal(index)}
                  />
                  <Avatar.Image
                    size={120}
                    source={item.img}
                    style={{
                      backgroundColor: "white",
                      opacity: 1,
                      marginTop: 250,
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
                  <View style={{ flexDirection: "row", marginTop: 15 }}>
                    <FontAwesome
                      name="group"
                      size={30}
                      color="black"
                      style={{ marginRight: 15 }}
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
