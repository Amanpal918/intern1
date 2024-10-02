import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [input, setInput] = useState('');

    const handleChange = (event) => {
        setInput(event.target.value);
        onSearch(event.target.value);
    };

    return (
        <div>
            <h2>Search Products</h2>
            <input
                type="text"
                placeholder="Search products..."
                value={input}
                onChange={handleChange}
            />
        </div>
    );
};

export default SearchBar;