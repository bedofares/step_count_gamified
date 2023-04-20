import React, { useEffect } from "react";
import { Text, View, Image, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Avatar } from "react-native-paper";

export default function LeaderBoard() {
  const points = useSelector((state) => state.stepCounter.points);
  const rank = [
    {
      name: "kingchris",
      points: 6000,
      img: require("../../assets/profile2.jpg"),
    },
    {
      name: "Scott",
      points: 7200,
      img: require("../../assets/profile3.jpg"),
    },
    {
      name: "Helen",
      points: 44000,
      img: require("../../assets/profile5.jpg"),
    },
    {
      name: "Paul",
      points: 2050,
      img: require("../../assets/profile4.jpg"),
    },
    { name: "James", points: 5500, img: require("../../assets/profile10.jpg") },
    { name: "Remya", points: 1350, img: require("../../assets/profile11.jpg") },
    { name: "Vikas", points: 500, img: require("../../assets/profile9.jpg") },
    { name: "Matt", points: 75000, img: require("../../assets/profile7.jpg") },
    {
      name: "Jeremy",
      points: 655000,
      img: require("../../assets/profile.jpg"),
    },
    {
      name: "Mellina",
      points: 5000,
      img: require("../../assets/profile8.jpg"),
    },
    { name: "Sara", points: 4100, img: require("../../assets/profile6.jpg") },
    {
      name: "User",
      points: points,
      img: require("../../assets/avatar.png"),
    },
  ];
  // sort the array in descending order based on points
  rank.sort((a, b) => b.points - a.points);

  // loop through the sorted array to add rank numbers
  rank.forEach((item, index) => {
    item.rank = index + 1;
  });
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          backgroundColor: "white",
          paddingTop: 10,
        }}
      >
        <Text
          style={{
            flex: 1,
            fontSize: 15,
            color: "#89888F",
          }}
        >
          Name
        </Text>
        <Text
          style={{
            flex: 1,
            textAlign: "right",
            fontSize: 15,
            color: "#89888F",
          }}
        >
          Points
        </Text>
      </View>
      <ScrollView style={{ flex: 1, backgroundColor: "white", padding: 10 }}>
        {rank.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              //borderWidth: 1,
              borderBottomWidth: index === rank.length - 1 ? 0 : 1, // Set borderBottomWidth to 0 for last item
              borderRadius: 10,
              padding: 10,
              marginTop: 5,
              marginBottom: index === rank.length - 1 ? 10 : 5, // Set marginBottom to 10 for last item
              borderColor: "rgb(216,216,216)",
              elevation: 1,
              backgroundColor: "white",
            }}
          >
            <Text>{item.rank}</Text>
            <Avatar.Image
              size={40}
              source={item.img}
              style={{ backgroundColor: "white", marginHorizontal: 5 }}
            />
            <Text style={{ flex: 1, fontSize: 20 }}>{item.name}</Text>
            <Text
              style={{
                flex: 1,
                textAlign: "right",
                fontSize: 20,
                color: "#00B9FE",
                fontWeight: "bold",
              }}
            >
              {item.points}
            </Text>
          </View>
        ))}
      </ScrollView>
    </>
  );
}
