import BasicDBModule from "./BasicDBModule";
import { Exam } from "models/exam";

export default class ExamModule extends BasicDBModule {
    public async create_exam(exam: Exam): Promise<void> {
        const sql = `INSERT INTO exam (name, date) VALUES (?, ?)`
        const params = [exam.name, exam.date]
        await this.query(sql, params)
    }

    public async get_exam_by_id(id: number): Promise<Exam|null> {
        const sql = `SELECT * FROM exam WHERE id = ?`
        const params = [id]
        return await this.query_one<Exam>(sql, params)
    }

    public async get_all_exams(): Promise<Array<Exam>> {
        const sql = `SELECT * FROM exam`
        return await this.query<Exam>(sql)
    }

    public async update_exam(exam: Exam): Promise<void> {
        const sql = `UPDATE exam SET name = ?, date = ? WHERE id = ?`
        const params = [exam.name, exam.date, exam.id]
        await this.query(sql, params)
    }

    public async delete_exam(id: number): Promise<void> {
        const sql = `DELETE FROM exam WHERE id = ?`
        const params = [id]
        await this.query(sql, params)
    }
}