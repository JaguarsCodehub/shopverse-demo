import { StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import LinkInput from '@/components/LinkInput';
import { useState, useEffect } from 'react';
import { Product } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import ProductImage from '@/components/ProductImage';

const RECENT_PRODUCTS_KEY = 'recent_products';

export default function HomeScreen() {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const router = useRouter();

  // Load saved products on mount
  useEffect(() => {
    loadSavedProducts();
  }, []);

  const loadSavedProducts = async () => {
    try {
      const saved = await AsyncStorage.getItem(RECENT_PRODUCTS_KEY);
      if (saved) {
        setRecentProducts(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading saved products:', error);
    }
  };

  const handleProductParsed = async (product: Product) => {
    const updatedProducts = [product, ...recentProducts].slice(0, 10);
    setRecentProducts(updatedProducts);
    
    try {
      await AsyncStorage.setItem(RECENT_PRODUCTS_KEY, JSON.stringify(updatedProducts));
    } catch (error) {
      console.error('Error saving products:', error);
    }
  };

  const handleProductPress = (product: Product) => {
    // Navigate to product detail screen (to be implemented)
    // router.push(`/product/${product.id}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Activities</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <LinkInput onProductParsed={handleProductParsed} />
      
      <ScrollView style={styles.recentList}>
        {recentProducts.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={styles.productItem}
            onPress={() => handleProductPress(product)}
          >
            <ProductImage
              uri={product.images[0]}
              style={styles.productImage}
              resizeMode="cover"
            />
            <View style={styles.productInfo}>
              <Text style={styles.productTitle}>{product.title}</Text>
              <Text style={styles.productBrand}>{product.brand}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>₹{product.price}</Text>
                {product.mrp && product.mrp > product.price && (
                  <Text style={styles.mrp}>₹{product.mrp}</Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '100%',
  },
  recentList: {
    marginTop: 20,
  },
  productItem: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#1A1A1A',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  productBrand: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00BFA5',
  },
  mrp: {
    fontSize: 14,
    color: '#666',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
});
