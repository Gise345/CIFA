import { Tabs } from "expo-router";
import { Feather } from '@expo/vector-icons'; 

export default function TabLayout() {
  return (
    <Tabs>
      {/* Your existing tabs */}
      
      {/* Add the Firebase test tab */}
      <Tabs.Screen
        name="firebase-test"
        options={{
          title: "Firebase Test",
          tabBarIcon: ({ color }) => <Feather name="database" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}