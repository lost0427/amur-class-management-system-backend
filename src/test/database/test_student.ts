import Database from "database";

async function main() {
    const database = new Database({db_file: process.env.DATABASE})
    await database.user_module.createStudent({name: "John Doe", phone_number: "1234567890", password: "password"})
    const student = await database.user_module.getStudentByPhone("1234567890")
    console.log(student)
    const students = await database.user_module.getAllStudents()
    console.log(students)
    await database.user_module.updateStudent({name: "Jane Doe", phone_number: "0987654321", password: "password"})
    await database.user_module.deleteStudent(1)
    await database.close()
}

main().catch(console.error)