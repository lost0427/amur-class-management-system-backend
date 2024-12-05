DROP TABLE IF EXISTS admin;
CREATE TABLE admin
(
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT        NOT NULL
);

DROP TABLE IF EXISTS parent;
CREATE TABLE parent
(
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    phone_number TEXT UNIQUE NOT NULL,
    password     TEXT        NOT NULL
);

DROP TABLE IF EXISTS student;
CREATE TABLE student
(
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    name      TEXT    NOT NULL,
    parent_id INTEGER NOT NULL,
    FOREIGN KEY (parent_id) REFERENCES parent (id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS exam;
CREATE TABLE exam
(
    id   INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    date DATE NOT NULL
);

DROP TABLE IF EXISTS score;
CREATE TABLE score
(
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER                                            NOT NULL,
    exam_id    INTEGER                                            NOT NULL,
    subject    TEXT                                               NOT NULL,
    full_score INTEGER                                            NOT NULL,
    score      INTEGER CHECK (score >= 0 AND score <= full_score) NOT NULL,
    FOREIGN KEY (student_id) REFERENCES student (id) ON DELETE CASCADE,
    FOREIGN KEY (exam_id) REFERENCES exam (id) ON DELETE CASCADE
);