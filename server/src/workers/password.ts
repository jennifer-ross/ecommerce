import * as bcrypt from 'bcrypt'

export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    return await bcrypt.hash(password, salt)
}

export const comparePassword = async (params: {
    password: string
    encrypted: string
}): Promise<boolean> => {
    return await bcrypt.compare(params.password, params.encrypted)
}
