DROP TABLE IF EXISTS admin CASCADE;

CREATE TABLE admin
(
    id       SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT        NOT NULL
);


DROP TABLE IF EXISTS parent CASCADE;

DROP TABLE IF EXISTS student CASCADE ;
CREATE TABLE student
(
    id           SERIAL PRIMARY KEY,
    name         TEXT        NOT NULL,
    phone_number TEXT UNIQUE NOT NULL,
    password     TEXT        NOT NULL
);

DROP TABLE IF EXISTS exam CASCADE ;
CREATE TABLE exam
(
    id   SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    date DATE NOT NULL
);

DROP TABLE IF EXISTS exam_subject CASCADE;
CREATE TABLE exam_subject
(
    id       SERIAL PRIMARY KEY,
    exam_id  INTEGER NOT NULL,
    subject  TEXT    NOT NULL,
    full_score NUMERIC NOT NULL,
    FOREIGN KEY (exam_id) REFERENCES exam (id) ON DELETE CASCADE,
    CONSTRAINT unique_exam_subject UNIQUE (exam_id, subject)
);

DROP TABLE IF EXISTS score CASCADE ;
CREATE TABLE score
(
    id         SERIAL PRIMARY KEY,
    student_id INTEGER                                            NOT NULL,
    exam_id    INTEGER                                            NOT NULL,
    subject    TEXT                                               NOT NULL,
    score      NUMERIC CHECK (score >= 0) NOT NULL,
    FOREIGN KEY (student_id) REFERENCES student (id) ON DELETE CASCADE,
    FOREIGN KEY (exam_id, subject) REFERENCES exam_subject (exam_id, subject) ON DELETE CASCADE,
    CONSTRAINT unique_score UNIQUE (student_id, exam_id, subject)
);