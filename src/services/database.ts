import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Product, Review } from '../types';
import { getProductById, getProductReviews } from '../services/database';
import Button from '../components/ui/Button';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const productData = await getProductById(parseInt(id));
        const reviewsData = await getProductReviews(parseInt(id));
        
        setProduct(productData || null);
        setReviews(reviewsData);
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Cargando producto...</div>;
  }

  if (!product) {
    return <div className="container mx-auto px-4 py-8">Producto no encontrado</div>;
  }

  const handleAddToCart = () => {
    // Implementar add to cart
    console.log(`Added ${quantity} of ${product.name} to cart`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // Navegar al checkout
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Galería de imágenes */}
        <div>
          <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          <div className="flex space-x-2 overflow-x-auto">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 border-2 rounded-lg overflow-hidden ${
                  selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Información del producto */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          
          {/* Rating y reviews */}
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400">
                  {i < Math.floor(product.rating) ? '★' : '☆'}
                </span>
              ))}
              <span className="ml-2 text-gray-600">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
          </div>

          {/* Precio */}
          <div className="mb-6">
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through mr-2">
                ${product.originalPrice}
              </span>
            )}
            <span className="text-3xl font-bold text-gray-900">
              ${product.price}
            </span>
            {product.isOnSale && (
              <span className="ml-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
                Oferta
              </span>
            )}
          </div>

          {/* Stock */}
          <div className="mb-6">
            <span className={`text-sm ${
              product.stock > 10 ? 'text-green-600' : 
              product.stock > 0 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {product.stock > 10 ? 'En stock' : 
               product.stock > 0 ? `Últimas ${product.stock} unidades` : 'Agotado'}
            </span>
          </div>

          {/* Cantidad y acciones */}
          <div className="mb-6">
            <div className="flex items-center space-x-4 mb-4">
              <label className="text-sm font-medium text-gray-700">Cantidad:</label>
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button
                variant="primary"
                size="lg"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1"
              >
                🛒 Agregar al carrito
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="flex-1"
              >
                Comprar ahora
              </Button>
            </div>
          </div>

          {/* Características rápidas */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold mb-2">Características principales:</h3>
            <ul className="list-disc list-inside space-y-1">
              {product.features.slice(0, 4).map((feature, index) => (
                <li key={index} className="text-sm text-gray-600">{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Tabs de información */}
      <div className="mt-12">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {['description', 'specifications', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab === 'description' && 'Descripción'}
                {tab === 'specifications' && 'Especificaciones'}
                {tab === 'reviews' && `Reseñas (${reviews.length})`}
              </button>
            ))}
          </nav>
        </div>

        <div className="py-6">
          {activeTab === 'description' && (
            <div>
              <p className="text-gray-700 mb-4">{product.detailedDescription}</p>
              <ul className="list-disc list-inside space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-gray-600">{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="border-b border-gray-200 py-2">
                  <span className="font-medium text-gray-900">{key}:</span>
                  <span className="ml-2 text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              {reviews.length === 0 ? (
                <p className="text-gray-500">Aún no hay reseñas para este producto.</p>
              ) : (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6">
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-yellow-400">
                              {i < review.rating ? '★' : '☆'}
                            </span>
                          ))}
                        </div>
                        <span className="ml-2 font-medium text-gray-900">{review.title}</span>
                      </div>
                      <p className="text-gray-700 mb-2">{review.comment}</p>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Por {review.userName}</span>
                        <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
