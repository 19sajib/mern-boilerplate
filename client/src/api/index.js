import axios from 'axios'


export const signIn = (formData) => axios.post("http://localhost:8080/users/signin/", formData)
export const signUp = (formData) => axios.post("http://localhost:8080/users/signup/", formData)