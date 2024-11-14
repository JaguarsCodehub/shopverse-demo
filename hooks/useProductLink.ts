import { useState } from 'react';
import { createProduct } from '@/utils/linkParser';
import { Product } from '@/types';

export function useProductLink() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processLink = async (url: string): Promise<Product | null> => {
    setLoading(true);
    setError(null);

    try {
      if (!url.includes('myntra.com')) {
        throw new Error('Only Myntra links are supported at the moment');
      }

      const product = createProduct(url);
      if (!product) {
        throw new Error('Unable to parse product details');
      }

      return product;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    processLink,
    loading,
    error,
  };
}
