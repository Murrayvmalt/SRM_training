CREATE TABLE course (
    courseId INT AUTO_INCREMENT PRIMARY KEY,
    courseName VARCHAR(100),
    prerequisite JSON DEFAULT NULL,
    imageUrl VARCHAR(50),
    descriptionText text,
    active BOOLEAN,
);

CREATE TABLE users (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    name VARCHAR(60),
    surname VARCHAR(60)
);

CREATE TABLE admin_users (
    adminId INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(40) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    name VARCHAR(40),
    surname VARCHAR(40),
    accessLevel VARCHAR(15) NOT NULL 
);

CREATE TABLE section (
    sectionId INT AUTO_INCREMENT PRIMARY KEY,
    courseId INT,
    numberOfSubsections INT,
    FOREIGN KEY (courseId) REFERENCES course(courseId)
);

CREATE TABLE subsection (
    subsectionId INT AUTO_INCREMENT PRIMARY KEY,
    sectionId INT,
    position INT, 
    --text, question-mcq, question-mcq, 
    type VARCHAR(50),
    FOREIGN KEY (sectionId) REFERENCES section(sectionId)
);

CREATE TABLE text (
    textId INT AUTO_INCREMENT PRIMARY KEY,
    subsectionId INT,
    heading VARCHAR(50),
    text TEXT,
    fileName VARCHAR(50),
    FOREIGN KEY (subsectionId) REFERENCES subsection(subsectionId)
);

CREATE TABLE questions (
    questionId INT AUTO_INCREMENT PRIMARY KEY,
    subsectionId INT,
    questionNumber INT,
    questionType VARCHAR(20),
    questionText TEXT,
    options JSON DEFAULT NULL,
    solution TEXT,
    marks INT,
    fileName VARCHAR(50),
    FOREIGN KEY (subsectionId) REFERENCES subsection(subsectionId)
);

--remove submission time? move to sub_section score
CREATE TABLE user_answers (
    userAnswerId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    subsectionId INT,
    questionId INT,
    questionText TEXT,
    answerText TEXT,
    attempt INT,
    submissionTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    score FLOAT DEFAULT NULL,
    marked BOOLEAN DEFAULT NULL,
    feedback TEXT DEFAULT NULL,
    FOREIGN KEY (subsectionId) REFERENCES subsection(subsectionId),
    FOREIGN KEY (userId) REFERENCES users(userId),
    --dropped in case questions change and want to preserve answers
    -- FOREIGN KEY (questionId) REFERENCES questions(questionId)
);

CREATE TABLE course_registration (
    registrationId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    courseId INT NOT NULL,
    currentStatus VARCHAR(15),
    --awaiting payment, registered, complete, archived
    currentSection INT,
    FOREIGN KEY (userId) REFERENCES users(userId),
    FOREIGN KEY (courseId) REFERENCES course(courseId)
);

--probably don't need 
-- CREATE TABLE course_completion (
--     completionId INT AUTO_INCREMENT PRIMARY KEY,
--     userId INT,
--     courseId INT,
--     completionDate DATE,
--     FOREIGN KEY (userId) REFERENCES users(userId),
--     FOREIGN KEY (courseId) REFERENCES course(courseId)
-- );

-- --probably don't need
-- CREATE TABLE section_completion (
--     completionId INT AUTO_INCREMENT PRIMARY KEY,
--     userId INT,
--     sectionId INT,
--     completionDate DATE,
--     FOREIGN KEY (userId) REFERENCES users(userId),
--     FOREIGN KEY (sectionId) REFERENCES section(sectionId)
-- );

-- --probably don't need
-- CREATE TABLE subsection_completion (
--     completionId INT AUTO_INCREMENT PRIMARY KEY,
--     userId INT,
--     subsectionId INT,
--     completionDate DATE,
--     FOREIGN KEY (userId) REFERENCES users(userId),
--     FOREIGN KEY (subsectionId) REFERENCES subsection(subsectionId)
-- );

--add submited and marked date?

CREATE TABLE subsection_scores (
    scoresId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    subsectionId INT,
    attempt INT,
    score FLOAT,
    maxMarks FLOAT,
    status VARCHAR(20),
    FOREIGN KEY (subsectionId) REFERENCES subsection(subsectionId),
    FOREIGN KEY (userId) REFERENCES users(userId)
);

