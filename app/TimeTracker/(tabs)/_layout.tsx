import { Tabs } from 'expo-router';
import React from 'react';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="TimeTracker"
        options={{
          title: 'Time Tracker',
          tabBarIcon: ({ color, size }) => (
              <FontAwesome name="clock-o" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="TaskHistory"
        options={{
          title: 'History',
          tabBarIcon: ({ color, size }) => (
              <FontAwesome name="history" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="TaskList"
        options={{
          title: 'Task List',
          tabBarIcon: ({ color, size }) => (
              <FontAwesome name="list-ul" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="TimeChart"
        options={{
          title: 'Time Chart',
          tabBarIcon: ({ color, size }) => (
              <FontAwesome name="pie-chart" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
