import {Admin, Student, PasswordResetRecord} from "models/user";
import BasicDBModule from "./BasicDBModule";

// token 是一种UUID
export default class ResetPassModule extends BasicDBModule {
    // 管理员请求一个学生密码的重置token，将此token形成链接发送给学生。
    // 此功能为管理员创建申请时，将一个token插入到数据库中。数据库应该自动创建created_at值。
    public async create_password_reset_record(record: PasswordResetRecord): Promise<void> {
        const sql = `INSERT INTO student_password_reset (student_id, token)
                     VALUES ($1, $2)`
        const params = [record.student_id, record.token]
        await this.query(sql, params)
    }

    // 学生使用token重置密码
    // 根据token查询此token的使用记录，由后端逻辑判断token是否合法。
    // token 是全局唯一的UUID，一定不会重复。
    public async query_password_reset_record_by_token(token: string): Promise<PasswordResetRecord | null> {
        const sql = `SELECT id, student_id, token, created_at, used_at
                     FROM student_password_reset
                     WHERE token = $1`
        const params = [token]
        return await this.query_one<PasswordResetRecord>(sql, params)
    }

    // 如果成功重置密码，则将此token的used_at字段设置为当前时间，意为此token已经被使用。
    public async mark_password_reset_record_used_by_id(record_id: number): Promise<void> {
        const sql = `UPDATE student_password_reset
                     SET used_at = now()
                     WHERE id = $1`
        const params = [record_id]
        await this.query(sql, params)
    }
}
