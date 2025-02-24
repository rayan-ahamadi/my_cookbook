import api from '../../configs/axiosConfig';

const login = async (formData) => {
  const response = await api.post('/user/login', formData);
  return response.data;
};

const register = async (formData) => {
  const response = await api.post('/user/register', formData);
  return response.data;
}

const getUser = async (id) => {
  const response = await api.get('/user/' + id);
  return response.data;
}

export { login, register, getUser };