import {Tabs} from "expo-router";

export default function TabsLayout() {
  return (
      <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
        <Tabs.Screen name="index" />
        <Tabs.Screen name="test" />
    </Tabs>
  );
}