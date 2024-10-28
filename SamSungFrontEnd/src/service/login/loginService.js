import request from "../../request"

const login = (value)=>{
    try {
        return request.post('/login', { ...value })
    } catch (error) {
        return error
    }
    
}
const register = (value)=>{
    try {
        return request.post('/register', { ...value })
    } catch (error) {
        return error
    }
    
}

const loginService = {
    login,
    register
}
export default loginService