export interface Exam {
    id?: number
    name: string
    date: string // Date in the format "YYYY-MM-DD"
}

export interface ExamSubject {
    id?: number
    exam_id: number
    subject: string
    full_score: number
}