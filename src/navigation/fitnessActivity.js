import React, { useEffect, useState } from "react";
import { Text, BackHandler, Alert } from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider, Appbar, Avatar } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StepCounter from "../Components/stepCounter";
import Points from "../Components/Points";
import LeaderBoard from "../Components/LeaderBoard";
import Badges from "../Components/Badges";
import Community from "../Components/Community";
import { NavigationContainer } from "@react-navigation/native";

import {
  MaterialIcons,
  FontAwesome5,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function Activity({ navigation }) {
  const [stepData, setStepData] = useState(0);
  const badges = [
    {
      name: "100 steps",
      steps: 100,
      rewardImg:require("../../assets/Bagde1reward.png"),
      img: require("../../assets/fitbit.jpg"),
      unlocked: stepData >= 100 ? true : false,
      points: 300,
    },
    {
      name: "200 steps",
      steps: 200,
      img: require("../../assets/badges-daily-100000.png"),
      rewardImg:require("../../assets/Badge2reward.png"),
      unlocked: stepData >= 200 ? true : false,
      points: 600,
    },
    {
      name: "5000 steps",
      steps: 5000,
      img: require("../../assets/Badges_Daily_35000.png"),
      rewardImg:require("../../assets/Badge3reward.png"),
      unlocked: stepData >= 5000 ? true : false,
      points: 900,
    },
    {
      name: "10000 steps",
      steps: 10000,
      img: require("../../assets/Badges_Daily_5000.png"),
      rewardImg:require("../../assets/Badge4reward.png"),
      unlocked: stepData >= 10000 ? true : false,
      points: 1200,
    },
    {
      name: "15000 steps",
      steps: 15000,
      img: require("../../assets/Badges_Daily.png"),
      unlocked: stepData >= 15000 ? true : false,
      points: 1500,
    },
    {
      name: "20000 steps",
      steps: 20000,
      img: require("../../assets/Badges_Daily_10_Floors-300x300.png"),
      unlocked: stepData >= 20000 ? true : false,
      points: 1800,
    },
    {
      name: "40000 steps",
      steps: 40000,
      img: require("../../assets/Badges_Daily_65000_Steps-300x300.png"),
      unlocked: stepData >= 40000 ? true : false,
      points: 2100,
    },
    {
      name: "60000 steps",
      steps: 60000,
      img: require("../../assets/Badges_Lifetime_8000_Miles-300x300.png"),
      unlocked: stepData >= 60000 ? true : false,
      points: 2400,
    },
    {
      name: "85000 steps",
      steps: 85000,
      img: require("../../assets/Badges_Daily_55000_Steps-300x300.png"),
      unlocked: stepData >= 85000 ? true : false,
      points: 2700,
    },
    {
      name: "90000 steps",
      steps: 90000,
      img: require("../../assets/Badges_Daily_90000_Steps-300x300.png"),
      unlocked: stepData >= 90000 ? true : false,
      points: 3000,
    },
    {
      name: "70000 steps",
      steps: 70000,
      img: require("../../assets/Badges_Daily_70000_Steps-300x300.png"),
      unlocked: stepData >= 70000 ? true : false,
      points: 3300,
    },
    {
      name: "100000 steps",
      steps: 100000,
      img: require("../../assets/Badges_Daily_40000_Steps-300x300.png"),
      unlocked: stepData >= 100000 ? true : false,
      points: 3600,
    },
  ];

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("Goal");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const insets = useSafeAreaInsets();
  return (
    <SafeAreaProvider>
      <SafeAreaView edges={["left", "right"]} style={{ flex: 1 }}>
        <NavigationContainer independent={true}>
          <PaperProvider>
            <Appbar.Header
              mode="center-aligned"
              style={{
                backgroundColor: "white",
                borderBottomWidth: 1,
                borderBottomColor: "rgb(216,216,216)",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar.Image
                size={40}
                source={require("../../assets/avatar.png")}
                style={{ flex: 1, backgroundColor: "white" }}
              />
              <Appbar.Content
                title="FitTrack"
                style={{ flex: 1 }}
                titleStyle={{ color: "#89888F" }}
              />
              <Points />
            </Appbar.Header>
            <Tab.Navigator
              screenOptions={{
                tabBarStyle: { color: "#1abc9c" },
                tabBarActiveTintColor: "#1abc9c",
                tabBarInactiveTintColor: "#7db3a8",
                headerTitleAlign: "center",
                headerStyle: {
                  shadowColor: "transparent",
                  elevation: 0,
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                },
                headerShown:false
              }}
              initialRouteName="Walk"
            >
              <Tab.Screen
                options={{
                  tabBarLabel: ({ focused }) => (
                    <Text
                      style={{
                        color: focused ? "#00B9FE" : "#89888F",
                        fontSize: 13,
                      }}
                    >
                      LeaderBoard
                    </Text>
                  ),
                  tabBarIcon: ({ focused }) => (
                    <MaterialIcons
                      name="leaderboard"
                      size={focused ? 34 : 24}
                      color={focused ? "#00B9FE" : "#89888F"}
                    />
                  ),
                }}
                name="Leaderboard"
                //component={LeaderBoard}
              >
                {() => <LeaderBoard />}
              </Tab.Screen>
              <Tab.Screen
                options={{
                  tabBarLabel: ({ focused }) => (
                    <Text
                      style={{
                        color: focused ? "#00B9FE" : "#89888F",
                        fontSize: 13,
                      }}
                    >
                      Steps
                    </Text>
                  ),
                  // tabBarLabelStyle:{display:'none'},
                  tabBarIcon: ({ focused }) => (
                    <FontAwesome5
                      name="walking"
                      size={focused ? 36 : 24}
                      color={focused ? "#00B9FE" : "#89888F"}
                    />
                  ),
                }}
                name="Walk"
                // component={StepCounter}
              >
                {() => (
                  <StepCounter
                    setStepData={setStepData}
                    stepdData={0}
                    badges={badges}
                    //navigation={navigation}
                  />
                )}
              </Tab.Screen>

              <Tab.Screen
                options={{
                  tabBarLabel: ({ focused }) => (
                    <Text
                      style={{
                        color: focused ? "#00B9FE" : "#89888F",
                        fontSize: 13,
                      }}
                    >
                      Badges
                    </Text>
                  ),
                  tabBarIcon: ({ focused }) => (
                    <MaterialCommunityIcons
                      name="police-badge"
                      size={focused ? 34 : 24}
                      color={focused ? "#00B9FE" : "#89888F"}
                    />
                  ),
                }}
                name="Badges"
              >
                {() => <Badges stepData={stepData} badges={badges} />}
              </Tab.Screen>
              <Tab.Screen
                options={{
                  tabBarLabel: ({ focused }) => (
                    <Text
                      style={{
                        color: focused ? "#00B9FE" : "#89888F",
                        fontSize: 13,
                      }}
                    >
                      Comunity
                    </Text>
                  ),
                  tabBarIcon: ({ focused }) => (
                    <FontAwesome
                      name="group"
                      size={focused ? 34 : 24}
                      color={focused ? "#00B9FE" : "#89888F"}
                    />
                  ),
                }}
                name="Community"
              >
                {() => <Community />}
              </Tab.Screen>
            </Tab.Navigator>
            <StatusBar />
          </PaperProvider>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
