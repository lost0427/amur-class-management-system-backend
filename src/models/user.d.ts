export interface Student {
    id?: number
    name: string
    phone_number: string
    password: string
}

export interface Admin {
    id?: number
    username: string
    password: string
}

export interface LoginUser {
    credential: string // phone or username
    password: string
}

export type User = Student | Admin