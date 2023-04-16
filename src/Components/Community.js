import React from "react";
import { Text, View, Image, Pressable, ScrollView } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Popular from "./Popular";

const Tab = createMaterialTopTabNavigator();

const Following = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white"}}>
    <View style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
      <Image
        style={{ width: 300, height: 300 }}
        source={require("../../assets/friends.jpg")}
      />
      <Text style={{ marginTop: 30, width: "90%", textAlign: "center" }}>
        You and your friends can share daily steps . Gps tracked actvities ,
        daily habits and milestones like first workouts
      </Text>

      <Pressable
        style={{
          backgroundColor: "#00B9FE",
          padding: 10,
          borderRadius: 5,
          marginTop: 20,
          width: "90%",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontWeight: "bold",
            fontSize: 14,
          }}
        >
          Find Friends
        </Text>
      </Pressable>
    </View>
    </ScrollView>
  );
};
export default function Community() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: "#00B9FE",
        },
      }}
    >
      <Tab.Screen name="Following" component={Following} />
      <Tab.Screen name="Popular" component={Popular} />
    </Tab.Navigator>
  );
}
