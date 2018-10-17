import axios from 'axios'

const axiosInstance = axios.create({
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
  create: body => axiosInstance.post('/api/v1/users', body),
  index: () => axiosInstance.get('/users'),
  show: username => axiosInstance.get(`/api/v1/users/${username}`),
  login: ({ username, password }) =>
    axiosInstance.post(`/api/v1/users/login`, { username, password }),
  current: () => axiosInstance.get(`/api/v1/users/current`),
  channels: username => axiosInstance.get(`/api/v1/users/${username}/channels`)
}

export const Channels = {
  update: (id, body) => axiosInstance.put(`/api/v1/channels/${id}`, body),
  create: body => axiosInstance.post('/api/v1/channels', body),
  index: filter => axiosInstance.get(`/api/v1/channels`),
  show: id => axiosInstance.get(`/api/v1/channels/${id}`),
  editPost: (id, body) =>
    axiosInstance.post(`/api/v1/channels/${id}/post/write`, body),
  giveWriteAccess: (id, writers) =>
    axiosInstance.post(`/api/v1/channels/${id}/write-access`, { writers }),
  revokeWriteAccess: (id, writers) =>
    axiosInstance.post(`/api/v1/channels/${id}/revoke-access`, { writers })
}
