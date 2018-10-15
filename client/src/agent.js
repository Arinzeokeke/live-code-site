import axios from 'axios'

const API_ROOT = 'http://localhost:8001/api/v1'

const axiosInstance = axios.create({
  baseURL: API_ROOT,
  timeout: 30000
})

axiosInstance.interceptors.request.use(
  config => {
    if (window.localStorage.getItem('csc_333_jwt')) {
      config.headers.authorization = `Bearer ${window.localStorage.getItem(
        'csc_333_jwt'
      )}`
    }

    return config
  },
  error => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error.response['data'])
)

export const Users = {
  create: body => axiosInstance.post('/users', body),
  index: () => axiosInstance.get('/users'),
  show: username => axiosInstance.get(`/users/${username}`),
  login: ({ username, password }) =>
    axiosInstance.post(`/users/login`, { username, password }),
  current: () => axiosInstance.get(`/users/current`),
  channels: username => axiosInstance.get(`/users/${username}/channels`)
}

export const Channels = {
  update: (id, body) => axiosInstance.put(`/channels/${id}`, body),
  create: body => axiosInstance.post('/channels', body),
  index: filter => axiosInstance.get(`/channels`),
  show: id => axiosInstance.get(`/channels/${id}`),
  editPost: (id, body) =>
    axiosInstance.post(`/channels/${id}/post/write`, body),
  giveWriteAccess: (id, writers) =>
    axiosInstance.post(`/channels/${id}/post/write-access`, { writers }),
  revokeWriteAccess: (id, writers) =>
    axiosInstance.get(`/channels/${id}/post/write-access`, { writers })
}
