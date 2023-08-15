
--Insert into course Table:
INSERT INTO course (course_name, prerequisite, number_of_sections)
VALUES (?, ?, ?);

--Insert into users Table:
INSERT INTO users (email, password, name, surname)
VALUES (?, ?, ?, ?);

--Insert into admin_users Table:
INSERT INTO admin_users (email, password, name, surname, access_level)
VALUES (?, ?, ?, ?, ?);

--Insert into section Table:
INSERT INTO section (course_id, number_of_subsections)
VALUES (?, ?);

--Insert into subsection Table:
INSERT INTO subsection (section_id, postiton, type)
VALUES (?, ?, ?);

--Insert into text Table:
INSERT INTO text (subsection_id, heading, text)
VALUES (?, ?, ?);

--Insert into questions Table:
INSERT INTO questions (subsection_id, question_number, question_type, question_text, options, solution, marks, file_name)
VALUES (?, ?, ?, ?, ?, ?, ?, ?);

--Insert into user_answers Table:
INSERT INTO user_answers (user_id, question_id, question_text, answer_text, score, marked, feedback)
VALUES (?, ?, ?, ?, ?, ?, ?);

--Insert into course_registration Table:
INSERT INTO course_registration (user_id, course_id, status, current_section)
VALUES (?, ?, ?, ?);

--Insert into course_completion Table:
INSERT INTO course_completion (user_id, course_id, completion_date)
VALUES (?, ?, ?);

--Insert into section_completion Table:
INSERT INTO section_completion (user_id, section_id, completion_date)
VALUES (?, ?, ?);

--Insert into subsection_completion Table:
INSERT INTO subsection_completion (user_id, subsection_id, completion_date)
VALUES (?, ?, ?);

--Insert into subsection_scores Table:
INSERT INTO subsection_scores (user_id, attempt, subsection_id, score, passed)
VALUES (?, ?, ?, ?, ?);