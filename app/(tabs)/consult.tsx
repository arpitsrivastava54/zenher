import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

const tabs = ['Upcoming', 'Past'];
const consultations = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Gynecologist',
    date: 'May 20, 2025',
    time: '3:00 PM',
    avatar: 'SJ',
    type: 'Upcoming',
  },
  {
    id: 2,
    name: 'Dr. Priya Mehra',
    specialty: 'Nutritionist',
    date: 'May 10, 2025',
    time: '11:00 AM',
    avatar: 'PM',
    type: 'Past',
  },
];

export default function ConsultScreen() {
  const [activeTab, setActiveTab] = useState('Upcoming');
  const tabWidth = 120;
  const animatedUnderline = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(tabs.indexOf(activeTab) * tabWidth) }],
  }));

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <Text className="text-3xl font-extrabold text-gray-900 dark:text-white mt-8 mb-4 px-6">Consult with Experts</Text>
      {/* Tabs */}
      <View className="flex-row bg-gray-100 dark:bg-gray-800 rounded-xl mx-4 mb-6 relative overflow-hidden">
        {tabs.map((tab) => (
          <Pressable key={tab} className="flex-1 py-3 items-center" onPress={() => setActiveTab(tab)}>
            <Text className={`font-bold ${activeTab === tab ? 'text-purple-600' : 'text-gray-500'}`}>{tab}</Text>
          </Pressable>
        ))}
        <Animated.View style={[{ position: 'absolute', bottom: 0, left: 0, width: tabWidth, height: 4, backgroundColor: '#a21caf', borderRadius: 2 }, animatedUnderline]} />
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        {consultations.filter(c => c.type === activeTab).map((c) => (
          <View key={c.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md mx-4 p-5 mb-4 flex-row items-center">
            {/* Avatar */}
            <View className="h-12 w-12 rounded-full bg-purple-200 items-center justify-center mr-4">
              <Text className="text-lg font-bold text-purple-800">{c.avatar}</Text>
            </View>
            {/* Info */}
            <View className="flex-1">
              <Text className="font-bold text-gray-900 dark:text-white">{c.name}</Text>
              <Text className="text-xs text-gray-600 dark:text-gray-300 mb-1">{c.specialty}</Text>
              <View className="flex-row items-center mb-1">
                <Ionicons name="calendar-outline" size={14} color="#a21caf" />
                <Text className="text-xs text-gray-700 dark:text-gray-200 ml-1 mr-2">{c.date}</Text>
                <Ionicons name="time-outline" size={14} color="#a21caf" />
                <Text className="text-xs text-gray-700 dark:text-gray-200 ml-1">{c.time}</Text>
              </View>
              {activeTab === 'Upcoming' && (
                <View className="flex-row mt-2 space-x-2">
                  <Pressable className="flex-1 rounded-full bg-teal-400 py-2 items-center justify-center shadow" android_ripple={{ color: '#2dd4bf' }}>
                    <Text className="text-white font-bold">Join Call</Text>
                  </Pressable>
                  <Pressable className="flex-1 rounded-full bg-red-100 dark:bg-red-900 py-2 items-center justify-center border border-red-300 dark:border-red-700">
                    <Text className="text-red-600 dark:text-red-200 font-bold">Reschedule</Text>
                  </Pressable>
                </View>
              )}
            </View>
          </View>
        ))}
        {consultations.filter(c => c.type === activeTab).length === 0 && (
          <Text className="text-center text-gray-400 mt-8">No consultations found.</Text>
        )}
      </ScrollView>
    </View>
  );
} 