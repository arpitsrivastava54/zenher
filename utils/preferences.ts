import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFERENCES = {
  IS_FIRST_TIME: 'is_first_time',
};

export const setFirstTimeUser = async (value: boolean) => {
  try {
    await AsyncStorage.setItem(PREFERENCES.IS_FIRST_TIME, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving first time user status:', error);
  }
};

export const isFirstTimeUser = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(PREFERENCES.IS_FIRST_TIME);
    return value === null ? true : JSON.parse(value);
  } catch (error) {
    console.error('Error reading first time user status:', error);
    return true;
  }
}; 