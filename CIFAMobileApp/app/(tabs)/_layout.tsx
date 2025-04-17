// CIFAMobileApp/app/(tabs)/_layout.tsx

import { Tabs } from "expo-router";
import React from "react";
import { useColorScheme } from "react-native";
import { Feather } from '@expo/vector-icons';

import Colors from "../../src/constants/Colors";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Latest",
          tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="local"
        options={{
          title: "Local",
          tabBarIcon: ({ color }) => <Feather name="shield" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="national"
        options={{
          title: "National",
          tabBarIcon: ({ color }) => <Feather name="award" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: "Stats",
          tabBarIcon: ({ color }) => <Feather name="bar-chart-2" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          tabBarIcon: ({ color }) => <Feather name="menu" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}