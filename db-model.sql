DROP TABLE IF EXISTS admin;

CREATE TABLE admin
(
    id       SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT        NOT NULL
);


DROP TABLE IF EXISTS parent;

DROP TABLE IF EXISTS student;
CREATE TABLE student
(
    id           SERIAL PRIMARY KEY,
    name         TEXT        NOT NULL,
    phone_number TEXT UNIQUE NOT NULL,
    password     TEXT        NOT NULL
);

DROP TABLE IF EXISTS exam;
CREATE TABLE exam
(
    id   SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    date DATE NOT NULL
);

DROP TABLE IF EXISTS exam_subjects;
CREATE TABLE exam_subjects
(
    id       SERIAL PRIMARY KEY,
    exam_id  INTEGER NOT NULL,
    subject  TEXT    NOT NULL,
    full_score NUMERIC NOT NULL,
    FOREIGN KEY (exam_id) REFERENCES exam (id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS score;
CREATE TABLE score
(
    id         SERIAL PRIMARY KEY,
    student_id INTEGER                                            NOT NULL,
    exam_id    INTEGER                                            NOT NULL,
    subject    TEXT                                               NOT NULL,
    score      NUMERIC CHECK (score >= 0) NOT NULL,
    FOREIGN KEY (student_id) REFERENCES student (id) ON DELETE CASCADE,
    FOREIGN KEY (exam_id) REFERENCES exam (id) ON DELETE CASCADE
);