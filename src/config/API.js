export const urlApi = 'https://quangnh.xyz'

export const sucessCode = [200, 201]
export const failedCode = 400
export const loginApi = `${urlApi}/v1/authentication/login`
export const registerApi = `${urlApi}/v1/authentication/register`
export const forgotApi = `${urlApi}/v1/authentication/forgot-password`

export const checkCode = (code) => {
    const rs = sucessCode.find(el => el === code)
    return rs ? true : false
}
export const config = {
    Headers: {
        'Content-Type': 'application/json'
    }
}