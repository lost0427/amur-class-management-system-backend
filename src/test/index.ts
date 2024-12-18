import {hash, compare} from 'bcrypt'

async function hashPassword(password: string): Promise<string> {
    return await hash(password, 10)
}

hashPassword('123').then(console.log)