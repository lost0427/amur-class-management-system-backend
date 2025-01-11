import Database from "../database";
import pino from 'pino'
import * as process from "node:process";
import {bcrypt_hash} from "../plugins/bcrypt-plugin";

async function create_admin_user(username: string, password: string) {
    if (!process.env.DATABASE) {
        throw new Error('DATABASE environment variable not set')
    } else {
        const db = new Database({connectionString: process.env.DATABASE}, pino())

        const admin = {
            username: username,
            password: await bcrypt_hash(password)
        }

        await db.user_module.create_admin(admin)
    }
}

function main() {
    if (process.argv.length < 4) {
        console.error('Usage: create-admin <username> <password>')
        process.exit(1)
    }

    create_admin_user(process.argv[2], process.argv[3]).then(() => {
        console.log('Admin user created')
    }).catch((err) => {
        console.error('Error creating admin user', err)
    })
}

main()