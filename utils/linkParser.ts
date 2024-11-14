import { Product } from '@/types';

interface ParsedMyntraLink {
  productId: string;
  name: string;
  brand: string;
  category: string;
}

export function parseMyntraLink(url: string): ParsedMyntraLink | null {
  try {
    // Remove UTM parameters and get the clean URL
    const cleanUrl = url.split('?')[0];
    const urlParts = cleanUrl.split('/');
    
    // Get the product ID
    const productId = urlParts[urlParts.length - 2];
    
    // Get the brand and name from URL segments
    const brandIndex = urlParts.findIndex(part => part.includes('rare-rabbit'));
    const brand = formatText(urlParts[brandIndex]);
    
    // Get the product name
    const nameStart = brandIndex + 1;
    const nameEnd = urlParts.indexOf(productId);
    const name = urlParts
      .slice(nameStart, nameEnd)
      .join(' ')
      .split('-')
      .map(formatText)
      .join(' ');
    
    // Get category
    const category = formatText(urlParts[urlParts.indexOf('mailers') + 1]);

    return {
      productId,
      name,
      brand,
      category,
    };
  } catch (error) {
    console.error('Error parsing Myntra link:', error);
    return null;
  }
}

function formatText(text: string): string {
  return text
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function createProduct(url: string): Product | null {
  const parsedData = parseMyntraLink(url);
  
  if (!parsedData) return null;

  // Updated Myntra image URL format
  const imageUrl = `https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/${parsedData.productId}/1.jpg`;

  return {
    id: parsedData.productId,
    title: `${parsedData.brand} - ${parsedData.name}`,
    images: [imageUrl],
    price: 2999,
    mrp: 3999,
    source: 'myntra',
    sourceUrl: url,
    addedBy: 'current-user',
    addedAt: new Date(),
    brand: parsedData.brand,
    category: parsedData.category
  };
}
