import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const days = [
  [27, 28, 29, 30, 1, 2, 3],
  [4, 5, 6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15, 16, 17],
  [18, 19, 20, 21, 22, 23, 24],
  [25, 26, 27, 28, 29, 30, 31],
];
const periodDays = [15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
const today = 18;

const logItems = [
  { label: 'Flow', icon: 'water', color: 'border-pink-400', text: 'text-pink-500' },
  { label: 'Symptoms', icon: 'medical-bag', color: 'border-gray-300', text: 'text-gray-700' },
  { label: 'Mood', icon: 'heart-outline', color: 'border-gray-300', text: 'text-gray-700' },
  { label: 'Notes', icon: 'note-text-outline', color: 'border-gray-300', text: 'text-gray-700' },
  { label: 'Sleep', icon: 'sleep', color: 'border-gray-300', text: 'text-gray-700' },
  { label: 'Activity', icon: 'chart-line', color: 'border-gray-300', text: 'text-gray-700' },
];

export default function TrackScreen() {
  const [activeTab, setActiveTab] = useState('Calendar');
  const underline = useSharedValue(0);
  const tabWidth = 120;
  const animatedUnderline = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(activeTab === 'Calendar' ? 0 : tabWidth) }],
  }));

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900" contentContainerStyle={{ paddingBottom: 32 }}>
      {/* Header */}
      <Text className="text-3xl font-extrabold text-gray-900 dark:text-white mt-8 mb-4 px-6">Your Cycle Tracker</Text>
      {/* Tabs */}
      <View className="flex-row bg-gray-100 dark:bg-gray-800 rounded-xl mx-4 mb-6 relative overflow-hidden">
        <Pressable className="flex-1 py-3 items-center" onPress={() => setActiveTab('Calendar')}>
          <Text className={`font-bold ${activeTab === 'Calendar' ? 'text-purple-600' : 'text-gray-500'}`}>Calendar</Text>
        </Pressable>
        <Pressable className="flex-1 py-3 items-center" onPress={() => setActiveTab('Predictions')}>
          <Text className={`font-bold ${activeTab === 'Predictions' ? 'text-purple-600' : 'text-gray-500'}`}>Predictions</Text>
        </Pressable>
        <Animated.View style={[{ position: 'absolute', bottom: 0, left: 0, width: tabWidth, height: 4, backgroundColor: '#a21caf', borderRadius: 2 }, animatedUnderline]} />
      </View>
      {/* Calendar Card */}
      <View className="bg-white dark:bg-gray-800 rounded-2xl shadow-md mx-4 p-4 mb-6">
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-lg font-bold text-gray-900 dark:text-white">Your Cycle Calendar</Text>
          <View className="bg-gradient-to-r from-pink-500 to-purple-500 px-3 py-1 rounded-full">
            <Text className="text-xs font-bold text-white">28 Days</Text>
          </View>
        </View>
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-base font-bold text-gray-700 dark:text-gray-200">May 2025</Text>
          <View className="flex-row space-x-2">
            <Pressable className="p-1 bg-gray-100 dark:bg-gray-700 rounded-full">
              <Ionicons name="chevron-back" size={18} color="#a1a1aa" />
            </Pressable>
            <Pressable className="p-1 bg-gray-100 dark:bg-gray-700 rounded-full">
              <Ionicons name="chevron-forward" size={18} color="#a1a1aa" />
            </Pressable>
          </View>
        </View>
        {/* Calendar Grid */}
        <View className="mb-2">
          <View className="flex-row justify-between mb-1">
            {['Su','Mo','Tu','We','Th','Fr','Sa'].map((d) => (
              <Text key={d} className="text-xs font-bold text-gray-400 w-7 text-center">{d}</Text>
            ))}
          </View>
          {days.map((week, i) => (
            <View key={i} className="flex-row justify-between mb-1">
              {week.map((day, j) => {
                const isPeriod = periodDays.includes(day);
                const isToday = day === today;
                return (
                  <View key={j} className="w-7 h-7 items-center justify-center">
                    <View className={`w-7 h-7 rounded-full items-center justify-center ${isToday ? 'bg-purple-200' : isPeriod ? 'bg-pink-200' : ''}`}>
                      <Text className={`text-sm font-bold ${isToday ? 'text-purple-700' : isPeriod ? 'text-pink-700' : 'text-gray-700 dark:text-gray-200'}`}>{day}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          ))}
        </View>
      </View>
      {/* Phase Card */}
      <View className="bg-pink-50 dark:bg-pink-900/30 rounded-2xl shadow-md mx-4 p-4 mb-3">
        <View className="flex-row items-center mb-1">
          <Ionicons name="flame" size={18} color="#e11d48" className="mr-2" />
          <Text className="text-pink-700 dark:text-pink-200 font-bold">Menstrual Phase</Text>
        </View>
        <Text className="text-xs text-pink-700 dark:text-pink-200 mb-1">Your period is active. Prioritize rest and hydration.</Text>
      </View>
      {/* Daily Tip */}
      <View className="bg-blue-50 dark:bg-blue-900/30 rounded-2xl shadow-md mx-4 p-4 mb-3">
        <View className="flex-row items-center mb-1">
          <Ionicons name="sparkles-outline" size={16} color="#6366f1" className="mr-2" />
          <Text className="text-blue-700 dark:text-blue-200 font-bold">Daily Tip</Text>
        </View>
        <Text className="text-xs text-blue-700 dark:text-blue-200">Try gentle stretching or a warm bath to ease discomfort.</Text>
      </View>
      {/* Log Section */}
      <View className="bg-white dark:bg-gray-800 rounded-2xl shadow-md mx-4 p-4 mt-4">
        <Text className="text-base font-bold text-gray-900 dark:text-white mb-2">Log for May 18, 2025</Text>
        <View className="flex-row flex-wrap -mx-1">
          {logItems.map((item, i) => (
            <AnimatedPressable key={item.label} label={item.label} icon={item.icon} color={item.color} text={item.text} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

function AnimatedPressable({ label, icon, color, text }: { label: string; icon: string; color: string; text: string }) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  return (
    <Animated.View style={[{ flex: 1, margin: 4, minWidth: 120 }, animatedStyle]}>
      <Pressable
        className={`flex-row items-center justify-center border ${color} rounded-full py-2 px-2 mb-2 bg-white dark:bg-gray-900`}
        onPressIn={() => (scale.value = withSpring(0.95))}
        onPressOut={() => (scale.value = withSpring(1))}
        style={{ elevation: 2 }}
      >
        <MaterialCommunityIcons name={icon as any} size={18} className={`mr-2 ${text}`} color="#a21caf" />
        <Text className={`font-bold ${text}`}>{label}</Text>
      </Pressable>
    </Animated.View>
  );
} 