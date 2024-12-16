import BasicDBModule from "./BasicDBModule";
import {ScoreRecord} from "models/score";
import {bulk_insert_query} from "database/helper/bulk_insert";

export default class ScoreModule extends BasicDBModule {
    public async update_all_scores_in_exam(exam_id: number, scores: Array<ScoreRecord>) {
        return await this.client_transaction(async client => {
            const sql = `INSERT INTO score (exam_id, student_id, subject, score)
                         VALUES (?, ?, ?, ?)
                         ON CONFLICT (exam_id, student_id, subject) DO UPDATE SET score = EXCLUDED.score`
            await bulk_insert_query(client, sql, scores.map(score => [exam_id, score.student_id, score.subject, score.score]))
        })
    }
}
