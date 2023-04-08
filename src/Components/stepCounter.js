import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { Pedometer } from "expo-sensors";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { CircularProgressBase } from "react-native-circular-progress-indicator";
import * as Location from "expo-location";
import {
  SimpleLineIcons,
  MaterialIcons,
  FontAwesome5,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";

export default function StepCounter({goal}) {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [targetSteps, setTargetSteps] = useState(goal);
  const [distanceTravled, setDistanceTravled] = useState(0);
  const [calories, setCalories] = useState(0);
  const [time, setTime] = useState(15);
  const [subscription, setSubscription] = useState(null);

  const subscribe = async () => {
    //Check the Pedometer availability
    const isAvailable = await Pedometer.isAvailableAsync();
    //convert the message to a string
    setIsPedometerAvailable(String(isAvailable));
    if (isAvailable) {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 1);

      const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
      if (pastStepCountResult) {
        setPastStepCount(pastStepCountResult.steps);
      }

      //counting the steps and storing the result (steps) to currentStepCount
      const sub = Pedometer.watchStepCount((result) => {
        if (currentStepCount !== targetSteps) {
          setCurrentStepCount(() => currentStepCount + result.steps);
        }
      });

      setSubscription(sub);
    }
  };

  useEffect(() => {
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
    if (currentStepCount === targetSteps) {
      if (subscription) {
        subscription.remove();
      }
      //progressRef.current.pause();
      alert("You earned a badge");
    }
    setCalories((distanceTravled * 60).toFixed(0));
    setTime(((distanceTravled / 5) * 100).toFixed(0)); // assuming an average walking speed of 5 km/hour
    setDistanceTravled((currentStepCount / 1300).toFixed(1));
  }, [currentStepCount]);

  return (
    <View style={styles.container}>
      <CircularProgressBase
        ref={progressRef}
        value={currentStepCount}
        radius={150}
        duration={500}
        maxValue={targetSteps}
        backgroundColor="#bdc3c7"
        fontColor="#ecf0f1"
        activeStrokeColor="#00B9FE"
        inActiveStrokeColor="#bdc3c7"
        activeStrokeWidth={10}
        onAnimationComplete={() => {
          //   if (currentStepCount === targetSteps) {
          //     progressRef.current.pause();
          //     alert("You earned a badge");
          //   }
        }}
      >
        {/* <Image
          style={{ width: 60, height: 60 }}
          source={require("../../assets/shoes.png")}
        /> */}
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
          GOAL {targetSteps}
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
