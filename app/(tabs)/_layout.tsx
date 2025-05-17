import LayoutHeader from '@/components/LayoutHeader';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { View } from 'react-native';
import "../../global.css";

export default function TabLayout() {
  return (
    <View className="flex-1">
      <LayoutHeader />
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#7C3AED',
          tabBarInactiveTintColor: '#A1A1AA',
          tabBarStyle: { backgroundColor: '#fff', borderTopWidth: 0, height: 60 },
          tabBarLabelStyle: { fontSize: 12, marginBottom: 6 },
          tabBarIcon: ({ color, size }) => {
            switch (route.name) {
              case 'index':
                return <Ionicons name="home" size={size} color={color} />;
              case 'track':
                return <Ionicons name="calendar" size={size} color={color} />;
              case 'shop':
                return <Ionicons name="cart" size={size} color={color} />;
              case 'consult':
                return <Ionicons name="call" size={size} color={color} />;
              case 'connect':
                return <Ionicons name="chatbubbles" size={size} color={color} />;
              default:
                return null;
            }
          },
        })}
      >
        <Tabs.Screen name="index" options={{ title: 'Home' }} />
        <Tabs.Screen name="track" options={{ title: 'Track' }} />
        <Tabs.Screen name="shop" options={{ title: 'Shop' }} />
        <Tabs.Screen name="consult" options={{ title: 'Consult' }} />
        <Tabs.Screen name="connect" options={{ title: 'Connect' }} />
      </Tabs>
    </View>
  );
} 