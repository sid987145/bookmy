import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Css/Movies.css'; // Ensure this file exists for styling

const Movies = () => {
  const [plays, setPlays] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlays = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/plays');
        console.log('Data received:', response.data.products[0].plays);
        setPlays(response.data.products[1].plays || []); // Safeguard in case plays is undefined
      } catch (error) {
        console.error('Error fetching plays:', error);
        setError('Failed to fetch plays. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlays();
  }, []);

  return (
    <div className="movies-container">
      {loading ? (
        <p>Loading plays...</p>
      ) : error ? (
        <div className="error">
          <p>{error}</p>
        </div>
      ) : (
        <div>
          {/* <h3>Raw JSON Data:</h3> */}
          {/* <pre>{JSON.stringify(plays, null, 2)}</pre> Print raw JSON data */}

          <div className="movies-grid">
            {plays.length > 0 ? (
              plays.map((play) => (
                <div key={play.id} className="movie-card">
                  <img
                    src={'https://media.istockphoto.com/id/170091865/vector/hamlet.jpg?s=612x612&w=0&k=20&c=Z1aW-NaMdtGWsvixZY4ffrVdhspWGi5VlR8P5ruarrE='}
                    alt={play.title || 'Play Poster'}
                  />
                  <h3>{play.title || 'Untitled'}</h3>
                  <p>{play.synopsis || 'No synopsis available'}</p>
                  <p><strong>Director:</strong> {play.director || 'Unknown'}</p>
                  <p><strong>Rating:</strong> {play.rating || 'N/A'}</p>
                  <p><strong>Duration:</strong> {play.duration || 'N/A'}</p>
                  <p><strong>Cast:</strong> {play.cast?.join(', ') || 'No cast available'}</p>
                </div>
              ))
            ) : (
              <p>No plays available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Movies;
