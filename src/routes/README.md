# routes

所有的后端功能都在 /api 下。

- NO POST /login
- U POST /password
  - change password of a user himself, need a current password.
- A POST /student/:student_id/password
  - change password of a student.

- AU GET /self
  - A: get admin info
  - U: get his children's name
- U GET /exam
  - list all exams id/name/date
- U GET /exam?student_id=
  - list all exams one student token.
- U GET /exam/:exam_id
  - get one exam's id/name/date
- AU GET /exam/:exam_id/score
  - A: get all student's score in the exam.
  - U: get his score in the exam.
- A GET /student
  - A: get all students info in the class
- AU GET /student/:student_id
  - A: get one student info
  - U: only can get his children's info
- AU GET /student/:student_id/score
  - A: get one student's score in all exams.
  - U: only can get his children's score in all exams.

- A POST /exam
  - create a new exam
- A POST /student
  - create a new student
- A PATCH /exam/:exam_id
  - update exam info
- A PATCH /student/:student_id
  - update student info
- A DELETE /exam/:exam_id
  - delete exam
- A DELETE /student/:student_id
  - delete student
- A POST /exam/:exam_id/score
  - record all students' scores in the exam