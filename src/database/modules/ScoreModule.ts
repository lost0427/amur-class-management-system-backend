import BasicDBModule from "./BasicDBModule";

export default class ScoreModule extends BasicDBModule {
    public async get_subjects_of_exam(exam_id: number): Promise<Array<string>> {
        const sql = `SELECT DISTINCT subject FROM score WHERE exam_id = ?`
        const params = [exam_id]
        return await this.query(sql, params)
    }

    
}
