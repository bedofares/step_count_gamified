import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  BackHandler,
  Alert,
} from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider, Appbar, Avatar } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StepCounter from "../Components/stepCounter";
import { NavigationContainer } from "@react-navigation/native";
import { StackActions } from "@react-navigation/native";

import {
  SimpleLineIcons,
  MaterialIcons,
  FontAwesome5,
  MaterialCommunityIcons,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function Activity({ route, navigation }) {
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
              }}
            >
              <Avatar.Image
                size={35}
                source={require("../../assets/avatar.png")}
                style={{ borderWidth: 1 }}
              />
              <Appbar.Content title="Bfit" />
            </Appbar.Header>
            {/* <Text>{route.params.paramKey}</Text> */}
            <Tab.Navigator
              screenOptions={{
                tabBarStyle: { color: "#1abc9c" },
                tabBarActiveTintColor: "#1abc9c",
                tabBarInactiveTintColor: "#7db3a8",
                headerTitleAlign: "center",
                headerStyle: {
                  shadowColor: "none",
                  elevation: 0,
                  shadowOffset: "none",
                },
                // headerShown:false
              }}
              initialRouteName="Walk"
              // sceneContainerStyle={{ backgroundColor: "#1abc9c" }}
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
                      History
                    </Text>
                  ),
                  tabBarIcon: ({ focused }) => (
                    <FontAwesome
                      name="history"
                      size={focused ? 34 : 24}
                      color={focused ? "#00B9FE" : "#89888F"}
                    />
                  ),
                }}
                name="History"
                component={StepCounter}
                listeners={{
                  tabPress: (e) => {
                    // Prevent default action
                    e.preventDefault();
                  },
                }}
              />
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
                {() => <StepCounter goal={route.params.paramKey} />}
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
                      Setting
                    </Text>
                  ),
                  tabBarIcon: ({ focused }) => (
                    <Ionicons
                      name="settings"
                      size={focused ? 34 : 24}
                      color={focused ? "#00B9FE" : "#89888F"}
                    />
                  ),
                }}
                name="Setting"
                component={StepCounter}
                listeners={{
                  tabPress: (e) => {
                    // Prevent default action
                    e.preventDefault();
                  },
                }}
              />
              {/* <Tab.Screen
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
                name="Comunity"
                // component={()=> <StepCounter goal={route.params.paramKey} />}
              >
                  {() => <StepCounter goal={route.params.paramKey} />}

              </Tab.Screen> */}
            </Tab.Navigator>
            <StatusBar />
          </PaperProvider>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
