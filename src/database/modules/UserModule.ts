import {Admin, Student, PasswordResetRecord} from "models/user";
import BasicDBModule from "./BasicDBModule";

export default class UserModule extends BasicDBModule {
    public async create_student(student: Student): Promise<void> {
        const sql = `INSERT INTO student (name, phone_number, password)
                     VALUES (?, ?, ?)`
        const params = [student.name, student.phone_number, student.password]
        await this.query(sql, params)
    }

    public async get_student_by_phone(phone_number: string): Promise<Student | null> {
        const sql = `SELECT *
                     FROM student
                     WHERE phone_number = ?`
        const params = [phone_number]
        return await this.query_one<Student>(sql, params)
    }

    public async get_student_by_id(id: number): Promise<Student | null> {
        const sql = `SELECT *
                     FROM student
                     WHERE id = ?`
        const params = [id]
        return await this.query_one<Student>(sql, params)
    }

    public async get_admin_by_name(username: string): Promise<Admin | null> {
        const sql = `SELECT *
                     FROM admin
                     WHERE username = ?`
        const params = [username]
        return await this.query_one<Admin>(sql, params)
    }

    public async get_all_students(): Promise<Array<Student>> {
        const sql = `SELECT *
                     FROM student`
        return await this.query<Student>(sql)
    }

    public async update_student(student: Student): Promise<void> {
        const sql = `UPDATE student
                     SET name         = ?,
                         phone_number = ?,
                         password     = ?
                     WHERE id = ?`
        const params = [student.name, student.phone_number, student.password, student.id]
        await this.query(sql, params)
    }

    public async update_admin(admin: Admin): Promise<void> {
        const sql = `UPDATE admin
                     SET username = ?,
                         password = ?
                     WHERE id = ?`
        const params = [admin.username, admin.password, admin.id]
        await this.query(sql, params)
    }

    public async delete_student(id: number): Promise<void> {
        const sql = `DELETE
                     FROM student
                     WHERE id = ?`
        const params = [id]
        await this.query(sql, params)
    }
}