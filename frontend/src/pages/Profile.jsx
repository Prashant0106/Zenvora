
import { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Token not found. Please log in again.');
      setLoading(false);
      return;
    }

    axios
      .get('http://localhost:5000/api/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log('Status:', err.response?.status);
        console.log('Backend error:', err.response?.data);

        setError(
          err.response?.data?.message ||
          'Unable to load profile. Please log in again.'
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Profile</h2>
      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>
    </div>
  );
}

export default Profile;
