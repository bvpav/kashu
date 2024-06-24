import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function TestScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Test screen" }} />
      <View style={styles.container} className="bg-slate-400">
        <Text className="text-black">This screen is the test screen.</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
