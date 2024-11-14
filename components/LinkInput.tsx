import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text, View } from './Themed';
import { useProductLink } from '@/hooks/useProductLink';
import { Product } from '@/types';

export default function LinkInput({
  onProductParsed,
}: {
  onProductParsed: (product: Product) => void;
}) {
  const [link, setLink] = useState('');
  const { processLink, loading, error } = useProductLink();

  const handleSubmit = async () => {
    const product = await processLink(link);
    if (product) {
      onProductParsed(product);
      setLink('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={link}
        onChangeText={setLink}
        placeholder='Paste product link here...'
        placeholderTextColor='#FFF'
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={loading || !link}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Processing...' : 'Add Product'}
        </Text>
      </TouchableOpacity>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    color: '#FFF',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginTop: 8,
  },
});
