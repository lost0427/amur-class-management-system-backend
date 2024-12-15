import Database from "database";

export default async function test_exam(database: Database) {
    await database.exam_module.createExam({name: "Math", date: "2022-01-01"})
    const exams = await database.exam_module.getAllExams()
    console.log(exams)
}

