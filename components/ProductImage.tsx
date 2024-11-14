import React, { useState } from 'react';
import { Image, StyleSheet, ImageStyle } from 'react-native';

interface ProductImageProps {
  uri: string;
  style?: ImageStyle;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center';
}

export default function ProductImage({
  uri,
  style,
  resizeMode = 'cover',
}: ProductImageProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <Image
      source={
        hasError
          ? require('../assets/images/icon.png') // Make sure to add a placeholder image
          : { uri }
      }
      style={[styles.image, style]}
      resizeMode={resizeMode}
      onError={() => setHasError(true)}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    backgroundColor: '#f0f0f0',
  },
});
