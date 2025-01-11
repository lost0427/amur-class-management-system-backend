import BasicDBModule from "./BasicDBModule";
import {ScoreRecord} from "models/score";
import {bulk_insert_query} from "database/helper/bulk_insert";

export default class ScoreModule extends BasicDBModule {
    public async update_all_scores_in_exam(exam_id: number, scores: Array<ScoreRecord>) {
        return await this.client_transaction(async client => {
            const sql = `INSERT INTO score (exam_id, student_id, subject, score)
                         VALUES ($1, $2, $3, $4)
                         ON CONFLICT (exam_id, student_id, subject) DO UPDATE SET score = EXCLUDED.score`
            await bulk_insert_query(client, sql, scores.map(score => [exam_id, score.student_id, score.subject, score.score]))
        })
    }

    public async get_score_of_student_in_exam(exam_id: number, student_id: number): Promise<Array<ScoreRecord>> {
        const sql = `SELECT *
                     FROM score
                     WHERE exam_id = $1
                       AND student_id = $2`
        return await this.query<ScoreRecord>(sql, [exam_id, student_id])
    }

    public async get_all_student_score_in_exam(exam_id: number): Promise<Array<ScoreRecord>> {
        const sql = `SELECT *
                     FROM score
                     WHERE exam_id = $1`
        return await this.query<ScoreRecord>(sql, [exam_id])
    }

    public async delete_score_of_student_in_exam(exam_id: number, student_id: number): Promise<void> {
        const sql = `DELETE
                     FROM score
                     WHERE exam_id = $1 AND student_id = $2`
        await this.query(sql, [exam_id, student_id])
    }
}