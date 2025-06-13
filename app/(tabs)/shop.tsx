import { useState } from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const categories = ['All', 'Pads', 'Wellness', 'Supplements'];
const products = [
  {
    id: 1,
    title: 'Organic Cotton Pads',
    image: 'https://images.pexels.com/photos/8532612/pexels-photo-8532612.jpeg?auto=compress&w=120',
    price: '₹84.00',
    rating: 4.5,
    reviews: 128,
    tag: 'Eco-Friendly',
  },
  {
    id: 2,
    title: 'Period Pain Relief Patch',
    image: 'https://images.pexels.com/photos/8532613/pexels-photo-8532613.jpeg?auto=compress&w=120',
    price: '₹105.00',
    rating: 4.7,
    reviews: 89,
    tag: 'Top Rated',
  },
  {
    id: 3,
    title: 'Monthly Subscription',
    image: 'https://images.pexels.com/photos/8532614/pexels-photo-8532614.jpeg?auto=compress&w=120',
    price: '₹79.00',
    rating: 4.8,
    reviews: 245,
    tag: 'Best Seller',
  },
  {
    id: 4,
    title: 'Wellness Tea',
    image: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&w=120',
    price: '₹120.00',
    rating: 4.6,
    reviews: 67,
    tag: 'New',
  },
];

export default function ShopScreen() {
  const [activeTab, setActiveTab] = useState('All');
  const tabWidth = 100;
  const animatedUnderline = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(categories.indexOf(activeTab) * tabWidth) }],
  }));

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <Text className="text-3xl font-extrabold text-gray-900 dark:text-white mt-8 mb-4 px-6">Shop</Text>
      {/* Tabs */}
      <View className="flex-row bg-gray-100 dark:bg-gray-800 rounded-xl mx-4 mb-6 relative overflow-hidden">
        {categories.map((cat, idx) => (
          <Pressable key={cat} className="flex-1 py-3 items-center" onPress={() => setActiveTab(cat)}>
            <Text className={`font-bold ${activeTab === cat ? 'text-purple-600' : 'text-gray-500'}`}>{cat}</Text>
          </Pressable>
        ))}
        <Animated.View style={[{ position: 'absolute', bottom: 0, left: 0, width: tabWidth, height: 4, backgroundColor: '#a21caf', borderRadius: 2 }, animatedUnderline]} />
      </View>
      {/* Product Grid */}
      <FlatList
        data={products.filter(p => activeTab === 'All' || p.tag === activeTab || p.title.includes(activeTab))}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 32 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => <ProductCard product={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

function ProductCard({ product }: { product: any }) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  return (
    <Animated.View style={[{ width: '48%', marginBottom: 16 }, animatedStyle]}>
      <Pressable
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4"
        onPressIn={() => (scale.value = withSpring(0.96))}
        onPressOut={() => (scale.value = withSpring(1))}
        style={{ elevation: 2 }}
      >
        <Image
          source={{ uri: product.image }}
          className="h-24 w-full rounded-lg mb-2"
          // contentFit="cover"
        />
        <Text className="font-bold text-gray-900 dark:text-white mb-1" numberOfLines={2}>{product.title}</Text>
        <View className="flex-row items-center mb-1">
          <Text className="text-xs text-yellow-500 mr-1">★</Text>
          <Text className="text-xs text-gray-700 dark:text-gray-200 mr-1">{product.rating}</Text>
          <Text className="text-xs text-gray-400">({product.reviews})</Text>
          {product.tag && (
            <Text className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{product.tag}</Text>
          )}
        </View>
        <Text className="font-bold text-base text-gray-900 dark:text-white mb-2">{product.price}</Text>
        <Pressable className="bg-blue-600 rounded-full py-2 items-center">
          <Text className="text-white font-bold">Add to Cart</Text>
        </Pressable>
      </Pressable>
    </Animated.View>
  );
} 