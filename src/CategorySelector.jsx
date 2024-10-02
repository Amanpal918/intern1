import React from 'react';

const CategorySelector = ({ categories, onChange }) => {
    const handleCategorySelect = (event) => {
        onChange(event.target.value);
    };

    return (
        <div>
            <h2>Select Category</h2>
            <select onChange={handleCategorySelect} defaultValue="">
                <option value="" disabled>Select a category</option>
                {categories.map(category => (
                    <option key={category.slug} value={category.slug}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CategorySelector;