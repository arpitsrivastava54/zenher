import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

const logo = require('../assets/images/project/logo.png');

export default function LayoutHeader() {
  return (
    <View className="fixed top-0 left-0 right-0 z-10 bg-white dark:bg-gray-900 flex-row items-center justify-between px-6 h-16 shadow-md" style={{ elevation: 4 }}>
      <View className="flex-row justify-end space-x-4">
        <View className='flex-row items-center'>
          <Text className='text-2xl font-bold text-gray-900 dark:text-white'>Zenher</Text>
        </View>
      </View>

      <View className="flex-row justify-end space-x-4">
        <View>
          <Pressable className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">
            <Ionicons name="notifications-outline" size={22} color="#6B7280" />
          </Pressable>
        </View>
      </View>


    </View>
  );
} 