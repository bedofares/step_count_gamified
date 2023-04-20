import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Pedometer } from "expo-sensors";
import { LineChart } from "react-native-chart-kit";

export default function History() {
  const [stepCounts, setStepCounts] = useState([]);
  const [selectedStepCount, setSelectedStepCount] = useState(null);

  useEffect(() => {
    // Fetch step count data for the last 7 days
    const fetchStepCounts = async () => {
      const today = new Date();
      const end = new Date();
      const start = new Date();
      start.setDate(today.getDate() - 6); // Last 7 days

      const stepCounts = [];
      for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
        const stepCountResult = await Pedometer.getStepCountAsync(
          new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            0,
            0,
            0
          ),
          new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            23,
            59,
            59
          )
        );
        stepCounts.push({
          date: date.toLocaleString("en-US", {
            day: "numeric",
            month: "short",
          }),
          steps: stepCountResult.steps,
        });
      }
      setStepCounts(stepCounts);
    };

    fetchStepCounts();
  }, []);

  const stepCountLabels = stepCounts.map((stepCount) => stepCount.date);
  const stepCountData = stepCounts.map((stepCount) => stepCount.steps);

  const handleDataPointClick = (dataset, index) => {
    const selectedStepCount = stepCounts[index];
    setSelectedStepCount(selectedStepCount);
    console.log("Selected Step Count:", selectedStepCount);
  };
  return (
    <View>
      {stepCounts.length > 0 ? (
        <View>
          <LineChart
            data={{
              labels: stepCountLabels,
              datasets: [
                {
                  data: stepCountData,
                },
              ],
            }}
            width={Dimensions.get("window").width - 32}
            height={200}
            chartConfig={{
              backgroundGradientFrom: "#FFFFFF",
              backgroundGradientTo: "#FFFFFF",
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              strokeWidth: 2,
              showYAxis: false, // Add this line to hide the y-axis
            }}
            style={{
              marginVertical: 8,
              borderRadius: 8,
            }}
            fromZero
            yAxisLabel=""
            yAxisSuffix=""
            yAxisInterval={1}
            //withHorizontalLabels={false}
            decimalScale={0}
            onDataPointClick={(dataset, index) =>
              handleDataPointClick(dataset, index)
            } // Add onDataPointClick event handler
          />
          {selectedStepCount && (
            <TouchableOpacity
              style={styles.stepCountContainer}
              onPress={() => {
                setSelectedStepCount(null);
              }}
            >
              <Text style={styles.stepCountText}>
                {`${selectedStepCount.date}: ${selectedStepCount.steps} steps`}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <Text>No step count data available</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  stepCountContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    margin: 16,
    padding: 8,
  },
  stepCountText: {
    color: "#000000",
    fontSize: 16,
  },
});
