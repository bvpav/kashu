import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function IndexScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Home screen" }} />
      <View style={styles.container} className="bg-slate-100">
        <Text className="text-black">This screen is the index screen.</Text>
        <Link href="/test" className="bg-gray-400" style={styles.link}>
          <Text>Go to test screen!</Text>
        </Link>
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
