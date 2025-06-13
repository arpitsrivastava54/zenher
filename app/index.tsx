import { isFirstTimeUser } from '@/utils/preferences';
import { Redirect } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { OnboardingScreen } from '../components/OnboardingScreen';

export default function Onboarding() {
const [isNewUser, setIsNewUser] = useState<boolean>();

  useEffect(() => {
    const checkFirstTimeUser = async () => {
      const isFirstTime = await isFirstTimeUser();
      setIsNewUser(isFirstTime);
    };
    checkFirstTimeUser();
  }, []);

  if(isNewUser === undefined){
    return <View className='flex-1 items-center justify-center'>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  }

  if(!isNewUser){
    return <Redirect href="/home" />
  }

  const imageUrls = [
    'https://play-lh.googleusercontent.com/dtB5nipYx7vqnGB2vWXshdw-sJ_3SK8npxLDaj8p5R_HRs3t7KtKorTcdp70FSh8Vg=w5120-h2880-rw',
    'https://play-lh.googleusercontent.com/4b8WLqwUaGKpIOA4tGBfBiQeCDJgcsFuo_R_RCP5U-l81ddWP0PQ04J69aJattnoAg=w5120-h2880-rw',
    'https://play-lh.googleusercontent.com/ebbEIQunlPkua4udbPjUz1_J-4lnflPdq1AufRokok--U2MoA6RXLEBSvs8XNIkJ-vY=w5120-h2880-rw',
  ];

  return <OnboardingScreen imageUrls={imageUrls} />;
} 