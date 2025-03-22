import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import ProductDetail from './ProductDetail';
import { Product } from '../types';

interface ProductDetailWrapperProps {
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductDetailWrapper: React.FC<ProductDetailWrapperProps> = ({ onAddToCart }) => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;

        const fetchedProduct = {
          ...data,
          imageUrl: data.image_url || 'https://via.placeholder.com/400',
          technicalSpecs: data.especificaciones || {
            'Specification 1': 'Value 1',
            'Specification 2': 'Value 2'
          }
        };
        setProduct(fetchedProduct);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return <div>Loading product...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return <ProductDetail product={product} onAddToCart={onAddToCart} />;
};

export default ProductDetailWrapper;