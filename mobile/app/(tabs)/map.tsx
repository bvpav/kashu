import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function TestScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Products" }} />
      <View style={styles.container} className="bg-slate-400">
        <Text className="text-black">Insert Map Here...</Text>
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
