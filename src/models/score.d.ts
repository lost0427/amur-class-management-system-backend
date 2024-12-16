export interface ScoreRecord {
    id?: number
    exam_id: number
    student_id: number
    subject: string
    score: number
}

// 前端发送给后端的是 [{学生id：{数学：100，语文：90}}, {学生id: {xx}} ]这样的数据。
// 后端需要在初步解析之后，将其转换为 [{exam_id: 1, student_id: 1, subject: '数学', score: 100},
// {exam_id: 1, student_id: 1, subject: '语文', score: 90}]，存入数据库中。
// 查询时也是一样，需要从数据库中搜出所有此次考试的成绩，然后在后端拼接。
// 记住：尽可能减少与数据库的交互次数，因为数据库的交互是非常耗时的。