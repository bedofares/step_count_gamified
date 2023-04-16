import React from "react";
import { store } from "./src/app/store";
import { Provider } from "react-redux";
import { StyleSheet, Text, View, Image } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider, Appbar, Avatar } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Goal from "./src/navigation/goal";
import Activity from "./src/navigation/fitnessActivity";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
    <PaperProvider>
      <SafeAreaProvider>
        <SafeAreaView edges={["left", "right"]} style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Goal"
                options={{
                  headerShown: false,
                }}
                component={Goal}
              />
              <Stack.Screen
                name="Activity"
                options={{
                  headerShown: false,
                }}
                component={Activity}
              />
            </Stack.Navigator>
          </NavigationContainer>
          <StatusBar />
        </SafeAreaView>
      </SafeAreaProvider>
    </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
