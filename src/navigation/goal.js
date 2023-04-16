import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  Alert,
} from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch,useSelector } from "react-redux";
import {
  increamentGoal,
  decrementGoal,
} from "../feature/stepCounter/stepCounterSlice";

export default function Goal({ navigation }) {
  //const [goal, setGoal] = useState(10000);
  const goal = useSelector((state) => state.stepCounter.goal)
  const dispatch = useDispatch();
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 40,
            fontWeight: "bold",
            marginTop: 20,
            width: "90%",
          }}
        >
          What's your daily step goal ?
        </Text>
        <Text
          style={{
            fontSize: 18,
            marginTop: 10,
            color: "#89888F",
            width: "90%",
          }}
        >
          Set a daily step goal and try to reach it for a better health and
          fitness
        </Text>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>
              //setGoal((prevGoal) => (prevGoal <= 0 ? 0 : prevGoal - 50))
              dispatch(decrementGoal(50))
            }
            style={{ flex: 1 }}
          >
            <AntDesign
              name="minuscircle"
              size={40}
              color="#00B9FE"
              style={{ fontWeight: "bold", textAlign: "center" }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 35,
              flex: 1,
              textAlign: "center",
            }}
          >
            {goal}
          </Text>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>
              //setGoal((prevGoal) => prevGoal + 50)
              dispatch(increamentGoal(50))
            }
            style={{ flex: 1 }}
          >
            <AntDesign
              name="pluscircle"
              size={40}
              color="#00B9FE"
              style={{ fontWeight: "bold", textAlign: "center" }}
            />
          </TouchableOpacity>
        </View>
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>
          steps per day
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            marginTop: 100,
            color: "#89888F",
            fontSize: 15,
            width: "90%",
          }}
        >
          10,000 steps per day is the "gold-standard" for staying active and
          healthy
        </Text>
        <Button
          mode="contained"
          buttonColor="#00B9FE"
          onPress={() => {
            navigation.navigate("Activity", {
              paramKey: goal,
            });
          }}
          labelStyle={{ fontWeight: "bold", fontSize: 20 }}
          style={{ width: 120, position: "absolute", bottom: 30, right: 20 }}
          disabled={goal === 0}
        >
          Next
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: "white",
    alignItems: "center",
  },
});
