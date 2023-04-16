import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Text, View, Image } from "react-native";
import { SimpleLineIcons, FontAwesome5 } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";

export default function Points() {
  const points = useSelector((state) => state.stepCounter.points);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        justifyContent: "flex-end",
      }}
    >
      <Avatar.Image
        size={40}
        source={require("../../assets/Medallions.png")}
        style={{ backgroundColor: "white", paddingTop: 3 }}
      />
      <Text style={{ fontWeight: "bold", fontSize: 15 }}>{points}</Text>
    </View>
  );
}
