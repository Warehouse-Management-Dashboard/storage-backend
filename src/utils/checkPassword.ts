import * as bcrypt from 'bcrypt'

export const checkPassword = async (passwordInput: string, hashPassword: string) => {
    return bcrypt.compare(passwordInput, hashPassword)
}