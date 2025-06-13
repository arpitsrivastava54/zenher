import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import { setFirstTimeUser } from '../utils/preferences';

interface OnboardingScreenProps {
  imageUrls: string[];
}

const { width } = Dimensions.get('window');

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ imageUrls }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const handleNext = async () => {
    if (currentIndex < 2) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Save that user has completed onboarding
      await setFirstTimeUser(false);
      // Navigate to main app
      router.replace('/home');
    }
  };

  const renderDot = (index: number) => (
    <View
      key={index}
      className={`w-2 h-2 rounded-full mx-1 ${
        currentIndex === index ? 'bg-blue-500' : 'bg-gray-300'
      }`}
    />
  );

  return (
    <View className="flex-1 bg-white">
      <Image
        source={{ uri: imageUrls[currentIndex] }}
        className="w-full h-4/5"
        resizeMode="cover"
      />
      
      <View className="absolute bottom-12 left-0 right-0 items-center">
        <View className="flex-row mb-5">
          {[0, 1, 2].map(renderDot)}
        </View>
        
        <TouchableOpacity 
          className="bg-blue-500 px-8 py-3 rounded-full"
          onPress={handleNext}
        >
          <Text className="text-white text-base font-semibold">
            {currentIndex === 2 ? 'Continue' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}; 