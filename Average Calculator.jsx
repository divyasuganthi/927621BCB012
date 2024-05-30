import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [numberId, setNumberId] = useState('');
  const [response, setResponse] = useState(null);

  const fetchNumbers = async () => {
    try {
      const res = await axios.get(`http://localhost:5173/numbers/${numberId}`);
      setResponse(res.data);
    } catch (error) {
      console.error('Error fetching numbers:', error.message);
    }
  };

  return (
    <div>
      <h1>Average Calculator</h1>
      <div>
        <input
          type="text"
          value={numberId}
          onChange={(e) => setNumberId(e.target.value)}
          placeholder="Enter number ID (p, f, e, r)"
        />
        <button onClick={fetchNumbers}>Fetch Numbers</button>
      </div>
      {response && (
        <div>
          <h2>Response</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
