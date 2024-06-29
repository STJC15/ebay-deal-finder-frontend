import axios from 'axios';

const fetchUserData = async (authUser) => {
    try {
      const idToken = await authUser.getIdToken();
      const response = await axios.get('https://o8vh9j1y5k.execute-api.us-east-1.amazonaws.com/prod/get_user_data', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      throw error;
    }
  };

export default fetchUserData;