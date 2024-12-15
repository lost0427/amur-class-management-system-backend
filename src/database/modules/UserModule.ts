import {Admin, Student} from "models/user";
import BasicDBModule from "./BasicDBModule";

export default class UserModule extends BasicDBModule {
    public async create_student(student: Student): Promise<void> {
        const sql = `INSERT INTO student (name, phone_number, password) VALUES (?, ?, ?)`
        const params = [student.name, student.phone_number, student.password]
        await this.query(sql, params)
    }

    public async get_student_by_phone(phone_number: string): Promise<Student|null> {
        const sql = `SELECT * FROM student WHERE phone_number = ?`
        const params = [phone_number]
        return await this.query_one<Student>(sql, params)
    }

    public async get_all_students(): Promise<Array<Student>> {
        const sql = `SELECT * FROM student`
        return await this.query<Student>(sql)
    }

    public async update_student(student: Student): Promise<void> {
        const sql = `UPDATE student SET name = ?, phone_number = ?, password = ? WHERE id = ?`
        const params = [student.name, student.phone_number, student.password, student.id]
        await this.query(sql, params)
    }

    public async delete_student(id: number): Promise<void> {
        const sql = `DELETE FROM student WHERE id = ?`
        const params = [id]
        await this.query(sql, params)
    }
}