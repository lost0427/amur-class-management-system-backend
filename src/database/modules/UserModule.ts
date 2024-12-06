import {Admin, Student} from "models/user";
import BasicDBModule from "./BasicDBModule";

export default class UserModule extends BasicDBModule {
    public async createStudent(student: Student): Promise<void> {
        const sql = `INSERT INTO student (name, phone_number, password) VALUES (?, ?, ?)`
        const params = [student.name, student.phone_number, student.password]
        await this.DBRun(sql, params)
    }

    public async getStudentByPhone(phone_number: string): Promise<Student|null> {
        const sql = `SELECT * FROM student WHERE phone_number = ?`
        const params = [phone_number]
        return await this.DBGet<Student>(sql, params)
    }

    public async updateStudent(student: Student): Promise<void> {
        const sql = `UPDATE student SET name = ?, phone_number = ?, password = ? WHERE id = ?`
        const params = [student.name, student.phone_number, student.password, student.id]
        await this.DBRun(sql, params)
    }

    public async deleteStudent(id: number): Promise<void> {
        const sql = `DELETE FROM student WHERE id = ?`
        const params = [id]
        await this.DBRun(sql, params)
    }
}