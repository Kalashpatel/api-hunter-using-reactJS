import { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './components/Search';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://fakestoreapi.com/products');
        setItems(response.data);
        setError(null);
      } catch(error) {
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter items based on search
  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1> API Hunter</h1>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {loading && <div className="loader">Loading awesome products...</div>}
      
      {error && <div className="error-message">{error}</div>}

      {!loading && !error && (
        <div className="grid">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <div key={item.id} className="card">
                <img src={item.image} alt={item.title} />
                <h3>{item.title.substring(0, 50)}...</h3>
                <p>${item.price}</p>
              </div>
            ))
          ) : (
            <p>No products found matching "{searchTerm}"</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;