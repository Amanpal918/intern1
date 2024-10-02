import React from 'react';

const ProductList = ({ products, searchTerm }) => {
    const filteredProducts = products.filter(product =>
    product?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h2>Product List</h2>
            <ul>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <li key={product.id}>
                            {product.name} - ${product.price}
                        </li>
                    ))
                ) : (
                    <li>No products found</li>
                )}
            </ul>
        </div>
    );
};

export default ProductList;