export const urlApi = 'https://quangnh.xyz'

export const sucessCode = [200, 201]
export const failedCode = 400
export const loginApi = `${urlApi}/v1/authentication/login`
export const registerApi = `${urlApi}/v1/authentication/register`
export const forgotApi = `${urlApi}/v1/authentication/forgot-password`
export const questionsPlayAPI = `${urlApi}/v1/questions/play?total=`
export const questionsSubmitAPI= `${urlApi}/v1/questions/submit`
export const refreshTokenApi = `${urlApi}/v1/authentication/refresh-token`
export const userWithTokenApi = `${urlApi}/v1/user/my-profile`
export const getQuestionById = `${urlApi}/v1/questions/`
export const uploadThumbnailAPI = `${urlApi}/v1/questions/upload-thumbnail`
export const createQuestion = `${urlApi}/v1/questions`
export const createAnswerApi = `${urlApi}/v1/answers`
export const updateAnswerApi = `${urlApi}/v1/answers/`
export const deleteAnswerApi = `${urlApi}/v1/answers/`
export const checkCode = (code) => {
    const rs = sucessCode.find(el => el === code)
    return rs ? true : false
}

