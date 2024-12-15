import Database from "database";
import test_students from "./test_student";
import test_exam from "./test_exam";

export default async function test_database() {
    const database = new Database({db_file: process.env.DATABASE})
    await test_students(database)
    await test_exam(database)
    await database.close()
}