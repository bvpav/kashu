import { Link, Tabs } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function IndexScreen() {
  return (
    <>
      <Tabs.Screen
        options={{ title: "Home screen", tabBarStyle: { display: "none" } }}
      />
      <View style={styles.container} className="bg-slate-100">
        <Text className="text-black">This screen is the index screen.</Text>
        <Link href="/(tabs)/test" className="bg-gray-400" style={styles.link}>
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
