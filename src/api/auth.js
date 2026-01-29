import api from './axios'

export const loginApi = (data) => {
    // Django SimpleJWT expects 'email' field for custom User model
    return api.post('/login/', {
        email: data.email,
        password: data.password
    })
}

export const getMeApi = () => {
    return api.get('/users/me/')
}
