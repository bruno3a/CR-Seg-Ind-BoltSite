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
          image_url: data.image_url || '/placeholder-product.png',
          technicalSpecs: data.especificaciones || {},
          características: data.características || '',
          presentación: data.presentación || '',
          documentación: data.documentación || ''
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
    return <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
    </div>;
  }

  if (error) {
    return <div className="text-center text-red-600 p-4">Error: {error}</div>;
  }

  if (!product) {
    return <div className="text-center text-gray-600 p-4">Producto no encontrado</div>;
  }

  return <ProductDetail product={product} onAddToCart={onAddToCart} />;
};

export default ProductDetailWrapper;
