const apiUrl = 'https://reqres.in/api/users';

export const fetchUsers = async () => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.data.map((user) => ({
      id: user.id,
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      imageUrl: user.avatar,
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};