import BasicDBModule from "./BasicDBModule";
import {Exam, ExamSubject} from "models/exam";
import {bulk_insert_query} from "../helper/bulk_insert";

export default class ExamModule extends BasicDBModule {
    public async create_exam(exam: Exam, subjects: Array<ExamSubject>): Promise<void> {
        await this.client_transaction(async client => {
            const exam_sql = `INSERT INTO exam (name, date)
                              VALUES (?, ?)
                              RETURNING id`
            const exam_params = [exam.name, exam.date]
            const exam_id = (await client.query(exam_sql, exam_params)).rows[0].id
            await bulk_insert_query(client, `INSERT INTO exam_subject (exam_id, subject, full_score)
                                             VALUES (?, ?, ?)`,
                subjects.map(subject => [exam_id, subject.subject, subject.full_score]))
        })
    }

    public async get_exam_by_id(id: number): Promise<Exam | null> {
        const sql = `SELECT *
                     FROM exam
                     WHERE id = ?`
        const params = [id]
        return await this.query_one<Exam>(sql, params)
    }

    public async get_all_exams(): Promise<Array<Exam>> {
        const sql = `SELECT *
                     FROM exam`
        return await this.query<Exam>(sql)
    }

    public async update_exam(exam: Exam): Promise<void> {
        const sql = `UPDATE exam
                     SET name = ?,
                         date = ?
                     WHERE id = ?`
        const params = [exam.name, exam.date, exam.id]
        await this.query(sql, params)
    }

    public async delete_exam(id: number): Promise<void> {
        const sql = `DELETE
                     FROM exam
                     WHERE id = ?`
        const params = [id]
        await this.query(sql, params)
    }

    public async get_subjects_of_exam(exam_id: number): Promise<Array<ExamSubject>> {
        const sql = `SELECT *
                     FROM exam_subject
                     WHERE exam_id = ?`
        const params = [exam_id]
        return await this.query<ExamSubject>(sql, params)
    }

    public async delete_subjects_of_exam(exam_id: number, subject_name: string): Promise<void> {
        const sql = `DELETE
                     FROM exam_subject
                     WHERE exam_id = ?
                       AND subject = ?`
        const params = [exam_id, subject_name]
        await this.query(sql, params)
    }

    public async add_subject_to_exam(exam_id: number, subject: ExamSubject): Promise<void> {
        const sql = `INSERT INTO exam_subject (exam_id, subject, full_score)
                     VALUES (?, ?, ?)`
        const params = [exam_id, subject.subject, subject.full_score]
        await this.query(sql, params)
    }
}