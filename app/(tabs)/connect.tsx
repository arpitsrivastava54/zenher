import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Linking, Pressable, ScrollView, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const cards = [
  {
    icon: <Ionicons name="chatbubbles-outline" size={28} color="#a21caf" />,
    title: 'Community Chat',
    desc: 'Join our supportive community to share and learn together.',
    action: () => Linking.openURL('https://t.me/zenhercommunity'),
    button: 'Join Chat',
  },
  {
    icon: <Ionicons name="mail-outline" size={28} color="#a21caf" />,
    title: 'Contact Support',
    desc: 'Need help? Reach out to our support team anytime.',
    action: () => Linking.openURL('mailto:support@zenher.com'),
    button: 'Email Us',
  },
  {
    icon: <MaterialCommunityIcons name="help-circle-outline" size={28} color="#a21caf" />,
    title: 'FAQs & Help',
    desc: 'Browse frequently asked questions and helpful articles.',
    action: () => Linking.openURL('https://zenherapp.vercel.app/help'),
    button: 'View FAQs',
  },
];

export default function ConnectScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900" contentContainerStyle={{ paddingBottom: 32 }}>
      <Text className="text-3xl font-extrabold text-gray-900 dark:text-white mt-8 mb-4 px-6">Connect & Support</Text>
      {cards.map((card, i) => (
        <AnimatedCard key={card.title} card={card} delay={i * 80} />
      ))}
    </ScrollView>
  );
}

function AnimatedCard({ card, delay }: { card: any; delay: number }) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  return (
    <Animated.View style={[{ marginHorizontal: 16, marginBottom: 20 }, animatedStyle]}>
      <Pressable
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex-row items-center"
        onPressIn={() => (scale.value = withSpring(0.97))}
        onPressOut={() => (scale.value = withSpring(1))}
        onPress={card.action}
        style={{ elevation: 2 }}
      >
        <View className="mr-4">{card.icon}</View>
        <View className="flex-1">
          <Text className="font-bold text-lg text-gray-900 dark:text-white mb-1">{card.title}</Text>
          <Text className="text-gray-500 dark:text-gray-300 mb-2">{card.desc}</Text>
          <View className="flex-row">
            <Text className="text-purple-600 font-bold text-base">{card.button}</Text>
            <Ionicons name="arrow-forward" size={18} color="#a21caf" style={{ marginLeft: 4 }} />
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
} 