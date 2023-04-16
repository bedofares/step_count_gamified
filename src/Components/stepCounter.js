import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View, Image, Button, Pressable } from "react-native";
import { Pedometer } from "expo-sensors";
import { StatusBar } from "expo-status-bar";
import { CircularProgressBase } from "react-native-circular-progress-indicator";
import { Avatar, Modal, Portal } from "react-native-paper";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  AntDesign,
  Entypo,
  FontAwesome,
} from "@expo/vector-icons";

import { setPoints } from "../feature/stepCounter/stepCounterSlice";

export default function StepCounter({ setStepData, badges }) {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(1000);
  const goal = useSelector((state) => state.stepCounter.goal);
  const [distanceTravled, setDistanceTravled] = useState(0);
  const [calories, setCalories] = useState((distanceTravled * 60).toFixed(0));
  const [time, setTime] = useState(((distanceTravled / 5) * 100).toFixed(0));
  const [subscription, setSubscription] = useState(null);

  const [name, setName] = useState();
  const [img, setImg] = useState();
  const [steps, setSteps] = useState();
  const [point, setPoint] = useState();

  const [visible, setVisible] = useState(false);
  const [badgeUnlocked, setBadgeUnlocked] = useState(false);


  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };
  const containerStyle = {
    backgroundColor: "white",
    height: "50%",
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
    justifyContent: "flex-start",
    alignItems: "center",
  };

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
      }
      //console.log(currentStepCount)

      // counting the steps of the current day until the start
      const stepCountResult = await Pedometer.getStepCountAsync(
        startOfDay,
        now
      );
      //console.log(stepCountResult);
      if (stepCountResult) {
        //setCurrentStepCount(currentStepCount + stepCountResult.steps);
        //setCurrentStepCount(() => currentStepCount + stepCountResult.steps); // Use functional update to avoid unnecessary increment on re-render
        setDistanceTravled((currentStepCount / 1300).toFixed(1));
        setCalories(((currentStepCount / 1300) * 60).toFixed(0));
        setTime(((currentStepCount / 1300 / 8) * 100).toFixed(0));
      }

      //counting the steps and storing the result (steps) to currentStepCount
      const sub = Pedometer.watchStepCount((result) => {
        if (currentStepCount !== goal) {
          setCurrentStepCount(prevCurrentStepCount => prevCurrentStepCount + result.steps);
        }
      });

      setSubscription(sub);
    }
  };

  useEffect(() => {
    setStepData(currentStepCount);
    //setLeaderboardData(points);
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
      setCurrentStepCount(goal);
    }
    // loop through the badges array and check if a badge is unlocked
    for (let i = 0; i < badges.length; i++) {
      if (currentStepCount >= badges[i].steps && !badges[i].unlocked) {
        badges[i].unlocked = true; // mark the badge as unlocked
        dispatch(setPoints(badges[i].points));
        setName(badges[i].name);
        setImg(badges[i].img);
        setSteps(badges[i].steps);
        setPoint(badges[i].points);
        showModal();
      }
    }
    setStepData(currentStepCount);
    setDistanceTravled((currentStepCount / 1300).toFixed(1));
    setCalories((distanceTravled * 60).toFixed(0));
    setTime(((distanceTravled / 8) * 100).toFixed(0));
  }, [currentStepCount]);

  return (
    <View style={styles.container}>
      <CircularProgressBase
        ref={progressRef}
        value={currentStepCount}
        radius={150}
        duration={500}
        maxValue={goal}
        backgroundColor="#bdc3c7"
        fontColor="#ecf0f1"
        activeStrokeColor="#00B9FE"
        inActiveStrokeColor="#bdc3c7"
        activeStrokeWidth={10}
        onAnimationComplete={() => {}}
      >
        <FontAwesome5
          name="walking"
          size={36}
          //   color={"#1abc9c"}
        />
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
      <View style={{ flexDirection: "row", marginTop: "10%" }}>
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
                flex:1,
                alignSelf: "center",
              }}
            />
          </View>
          <View style={{ flexDirection: "row", marginTop:15}}>
            <FontAwesome name="group" size={30} color="black" style={{marginRight:15}} />
            <Entypo name="facebook-with-circle" size={30} color="#3b5998" style={{marginRight:15}} />
            <FontAwesome name="whatsapp" size={30} color="#075E54" style={{marginRight:15}} />
            <Entypo name="twitter-with-circle" size={30} color="#00acee" />
          </View>
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
    paddingTop: 40,
  },
});
