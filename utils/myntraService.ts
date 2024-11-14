import axios from 'axios';

interface MyntraProductDetails {
  images: string[];
  price: number;
  mrp: number;
  name: string;
  brand: string;
}

export async function fetchMyntraProductDetails(
  productId: string
): Promise<MyntraProductDetails | null> {
  try {
    // Myntra mobile API endpoint
    const response = await axios.get(
      `https://www.myntra.com/gateway/v2/product/${productId}`,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1',
          Accept: 'application/json',
        },
      }
    );

    const data = response.data;

    return {
      images: data.style.media.albums[0].images.map((img: any) => img.src),
      price: data.style.price.discounted,
      mrp: data.style.price.mrp,
      name: data.style.name,
      brand: data.style.brand.name,
    };
  } catch (error) {
    console.error('Error fetching Myntra product details:', error);
    return null;
  }
}
