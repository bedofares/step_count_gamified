import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import { Pedometer } from "expo-sensors";
import { StatusBar } from "expo-status-bar";
import { CircularProgressBase } from "react-native-circular-progress-indicator";
import * as Progress from "react-native-progress";
import { Avatar, Modal, Portal } from "react-native-paper";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  AntDesign,
  Entypo,
  FontAwesome,
} from "@expo/vector-icons";

import {
  setPoints,
  addPost,
  setSteps,
} from "../feature/stepCounter/stepCounterSlice";
import History from "./History";

export default function StepCounter({ setStepData, badges }) {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const goal = useSelector((state) => state.stepCounter.goal);
  const [distanceTravled, setDistanceTravled] = useState(0);
  const [calories, setCalories] = useState((distanceTravled * 60).toFixed(0));
  const [time, setTime] = useState(((distanceTravled / 5) * 100).toFixed(0));
  const [subscription, setSubscription] = useState(null);

  const [name, setName] = useState();
  const [img, setImg] = useState();
  const [steps, setSteps] = useState();
  const [point, setPoint] = useState();
  const [rewardImg, setRewardImg] = useState();

  const [visible, setVisible] = useState(false);
  const [goalvisible, setgoalvisibleVisible] = useState(false);
  const [text, onChangeText] = useState("");
  const [share, setShare] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };
  const hideModalGoal = () => {
    setgoalvisibleVisible(false);
  };
  const navigation = useNavigation();

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

  const recentLockedBadge = badges.filter((badge) => !badge.unlocked)[0];
  const dispatch = useDispatch();
  const subscribe = async () => {
    //Check the Pedometer availability
    const isAvailable = await Pedometer.isAvailableAsync();
    //convert the message to a string
    setIsPedometerAvailable(String(isAvailable));

    if (isAvailable) {
      const end = new Date();
      const start = new Date();
      const now = new Date();
      const startOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0
      );
      start.setDate(end.getDate() - 1);

      const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
      if (pastStepCountResult) {
        setPastStepCount(pastStepCountResult.steps);
        //console.log(pastStepCountResult.result)
      }

      // counting the steps of the current day until the start
      const stepCountResult = await Pedometer.getStepCountAsync(
        startOfDay,
        now
      );
      //setCurrentStepCount(stepCountResult.steps);
      if (stepCountResult) {
        setDistanceTravled((currentStepCount / 1300).toFixed(1));
        setCalories(((currentStepCount / 1300) * 60).toFixed(0));
        setTime(((currentStepCount / 1300 / 8) * 100).toFixed(0));
      }

      //counting the steps and storing the result (steps) to currentStepCount
      const sub = Pedometer.watchStepCount((result) => {
        if (currentStepCount !== goal) {
          setCurrentStepCount(() => currentStepCount + result.steps);
        }
      });

      setSubscription(sub);
    }
  };

  useEffect(() => {
    setStepData(currentStepCount);
    const setupSubscription = async () => {
      await subscribe();
    };

    setupSubscription();
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  const progressRef = useRef(null);

  useEffect(() => {
    if (currentStepCount >= goal) {
      if (subscription) {
        subscription.remove();
      }
      setgoalvisibleVisible(true);
      dispatch(setPoints(2500));
      setCurrentStepCount(goal);
    }
    let unlockedBadge = null; // Variable to store the unlocked badge

    // loop through the badges array and check if a badge is unlocked
    for (let i = 0; i < badges.length; i++) {
      if (currentStepCount >= badges[i].steps && !badges[i].unlocked) {
        badges[i].unlocked = true; // mark the badge as unlocked
        dispatch(setPoints(badges[i].points));
        setName(badges[i].name);
        setImg(badges[i].img);
        setSteps(badges[i].steps);
        setPoint(badges[i].points);
        setRewardImg(badges[i].rewardImg);
        unlockedBadge = badges[i]; // store the unlocked badge in the variable
      }
    }
    setStepData(currentStepCount);
    setDistanceTravled((currentStepCount / 1300).toFixed(1));
    setCalories((distanceTravled * 60).toFixed(0));
    setTime(((distanceTravled / 8) * 100).toFixed(0));

    if (unlockedBadge) {
      showModal(); // if a badge is unlocked, call the showModal function
    }
  }, [currentStepCount]);

  return (
    <View
      style={[styles.container, { paddingTop: !pastStepCount ? "10%" : "10%" }]}
    >
      <CircularProgressBase
        ref={progressRef}
        value={currentStepCount}
        radius={!pastStepCount ? 180 : 180}
        initialAnimation={true}
        duration={1000}
        maxValue={goal}
        backgroundColor="#bdc3c7"
        fontColor="#ecf0f1"
        activeStrokeColor="#00B9FE"
        inActiveStrokeColor="#bdc3c7"
        activeStrokeWidth={10}
      >
        <FontAwesome5 name="walking" size={36} />
        <Text style={{ fontSize: 60, fontWeight: "bold" }}>
          {currentStepCount}
        </Text>
        <Text
          style={{
            fontSize: 20,
            marginTop: "5%",
            color: "#89888F",
            fontWeight: "bold",
          }}
        >
          Today
        </Text>
        <Text
          style={{
            fontSize: 14,
            marginTop: 8,
            color: "#89888F",
            fontWeight: "bold",
          }}
        >
          GOAL {goal}
        </Text>
      </CircularProgressBase>
      <View
        style={{
          flexDirection: "row",
          marginTop: !pastStepCount ? "7%" : "7%",
        }}
      >
        <View
          style={{
            fontSize: 16,
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FontAwesome5 name="fire" size={24} color="black" />
          <Text style={{ marginTop: 10, fontWeight: "600", fontSize: 16 }}>
            {calories} cal
          </Text>
        </View>
        <View
          style={{
            fontSize: 16,
            flexDirection: "column",
            alignItems: "center",
            marginHorizontal: 80,
          }}
        >
          <MaterialCommunityIcons
            name="map-marker-distance"
            size={24}
            color="black"
          />
          <Text style={{ marginTop: 10, fontWeight: "600", fontSize: 16 }}>
            {distanceTravled} km
          </Text>
        </View>
        <View
          style={{
            fontSize: 16,
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FontAwesome5 name="stopwatch" size={24} color="black" />
          <Text style={{ marginTop: 10, fontWeight: "600", fontSize: 16 }}>
            {time} min
          </Text>
        </View>
      </View>

      {/* <View style={{ marginTop: "5%" }}>
        <History />
      </View> */}
      <View
        style={{
          flexDirection: "row",
          //borderWidth: 1,
          width: "90%",
          padding: 10,
          borderRadius: 8,
          backgroundColor: "white",
          marginTop: "8%",
          elevation: 0, // Add elevation for box shadow effect
          shadowColor: "black", // Set the shadow color
          shadowOpacity: 0.1, // Set the opacity of the shadow
          shadowOffset: { width: 0, height: 1 }, // Set the shadow offset
          shadowRadius: 4, // Set the shadow radius
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold", marginBottom: 5 }}>
            Next achievement:
          </Text>
          <Text style={{ fontSize: 20, marginBottom: 5 }}>
            {recentLockedBadge.steps - currentStepCount} steps to go
          </Text>
          <Progress.Bar
            progress={Math.min(currentStepCount / recentLockedBadge.steps, 1)}
            width={220}
            color="#00B9FE"
          />
        </View>
        <Avatar.Image
          size={70}
          source={recentLockedBadge.img}
          style={{ backgroundColor: "white", opacity: 1 }}
        />
      </View>
      <Portal>
        <Modal
          theme={{
            colors: {
              backdrop: "rgba(0,0,0,0.3)",
            },
          }}
          style={{ alignItems: "center" }}
          visible={visible} // Update visibility based on the state
          onDismiss={() => hideModal()}
          contentContainerStyle={containerStyle}
          //style={{borderWidth:1}}
        >
          <AntDesign
            name="close"
            size={24}
            color="black"
            style={{ position: "absolute", left: 10, top: 10 }}
            onPress={() => hideModal()}
          />
          {share ? (
            <Pressable
              onPress={() => {
                dispatch(
                  addPost({
                    userName: "User",
                    time: "0m",
                    message: text,
                    imageSource: rewardImg,
                    likes: 0,
                    comments: 0,
                    avatarSource: require("../../assets/avatar.png"),
                    liked: false,
                  }),
                  hideModal(),
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
                source={img}
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
                You just got a new badge "{steps} steps" badge{" "}
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
                Points earned : +{point}
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
                <Entypo name="twitter-with-circle" size={30} color="#00acee" />
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
                  source={rewardImg}
                />
              </View>
            </>
          )}
        </Modal>
        <Modal
          theme={{
            colors: {
              backdrop: "rgba(0,0,0,0.3)",
            },
          }}
          style={{ alignItems: "center" }}
          visible={goalvisible} // Update visibility based on the state
          onDismiss={() => hideModalGoal()}
          contentContainerStyle={{
            backgroundColor: "white",
            //height: "50%",
            width: "95%",
            shadowOpacity: 0,
            shadowOpacity: 0,
            shadowRadius: 0,
            elevation: 0,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            padding: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
          //style={{borderWidth:1}}
        >
          <AntDesign
            name="close"
            size={24}
            color="black"
            style={{ position: "absolute", left: 10, top: 10 }}
            onPress={() => hideModalGoal()}
          />
          <>
            <Image
              source={require("../../assets/goaal.png")}
              style={{
                backgroundColor: "white",
                opacity: 1,
                marginTop: 20,
                width: 150,
                height: 150,
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
              Congratulations!{"\n"} you just reached your goal.
            </Text>
            {/* <Text style={{ marginTop: 10 }}>
              You just got a new badge "{steps} steps" badge{" "}
            </Text> */}
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "black",
                marginTop: 5,
                //textAlign: "center",
              }}
            >
              Points earned : +2500
            </Text>
          </>
        </Modal>
      </Portal>
      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "white",
    //paddingTop: pastStepCount?40:0,
  },
});
