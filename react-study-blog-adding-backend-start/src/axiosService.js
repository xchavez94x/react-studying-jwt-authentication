import axios from "axios"

const dataHandler = axios.create({
    baseURL: "http://localhost:8080/blog/",
    headers: {
        Authorization: "Bearer " + localStorage.token
    }
})
//  const login = axios.create({
//     method: "POST",
//     baseURL: "http://localhost:8080/blog/login",
//     headers: 
// })

export default dataHandler