// backend/controllers/productController.js
const db = require('../config/database');

// Obtener todos los productos
const getProducts = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 12 } = req.query;
    
    let query = `
      SELECT p.*, c.name as category_name, 
             (SELECT url FROM product_images WHERE product_id = p.id AND is_primary = TRUE LIMIT 1) as image_url
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.is_active = TRUE
    `;
    
    const params = [];
    
    if (category) {
      query += ' AND c.slug = ?';
      params.push(category);
    }
    
    if (search) {
      query += ' AND (p.name LIKE ? OR p.description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }
    
    // Paginación
    const offset = (page - 1) * limit;
    query += ' LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);
    
    const [products] = await db.execute(query, params);
    
    // Contar total para paginación
    let countQuery = 'SELECT COUNT(*) as total FROM products p WHERE p.is_active = TRUE';
    const countParams = [];
    
    if (category) {
      countQuery += ' AND p.category_id IN (SELECT id FROM categories WHERE slug = ?)';
      countParams.push(category);
    }
    
    if (search) {
      countQuery += ' AND (p.name LIKE ? OR p.description LIKE ?)';
      countParams.push(`%${search}%`, `%${search}%`);
    }
    
    const [countResult] = await db.execute(countQuery, countParams);
    const total = countResult[0].total;
    
    res.json({
      success: true,
      products,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error('Error obteniendo productos:', error);
    res.status(500).json({ success: false, error: 'Error del servidor' });
  }
};

// Obtener producto por ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [products] = await db.execute(`
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.id = ? AND p.is_active = TRUE
    `, [id]);
    
    if (products.length === 0) {
      return res.status(404).json({ success: false, error: 'Producto no encontrado' });
    }
    
    const product = products[0];
    
    // Obtener imágenes
    const [images] = await db.execute(
      'SELECT * FROM product_images WHERE product_id = ? ORDER BY is_primary DESC, sort_order ASC',
      [id]
    );
    
    product.images = images;
    
    res.json({ success: true, product });
    
  } catch (error) {
    console.error('Error obteniendo producto:', error);
    res.status(500).json({ success: false, error: 'Error del servidor' });
  }
};

// Obtener productos destacados
const getFeaturedProducts = async (req, res) => {
  try {
    const [products] = await db.execute(`
      SELECT p.*, 
             (SELECT url FROM product_images WHERE product_id = p.id AND is_primary = TRUE LIMIT 1) as image_url
      FROM products p
      WHERE p.featured = TRUE AND p.is_active = TRUE
      LIMIT 8
    `);
    
    res.json({ success: true, products });
    
  } catch (error) {
    console.error('Error obteniendo productos destacados:', error);
    res.status(500).json({ success: false, error: 'Error del servidor' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getFeaturedProducts
};
