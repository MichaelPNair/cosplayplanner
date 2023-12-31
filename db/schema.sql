CREATE DATABASE cosplayplanner;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT,
    password_digest TEXT
);

CREATE TABLE cosplays (
    cos_id SERIAL PRIMARY KEY,
    name TEXT,
    source TEXT,
    picture_url TEXT,
    user_id INTEGER
);

CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    task_type_id INTEGER,
    name TEXT,
    cost NUMERIC,
    time NUMERIC,
    description TEXT,
    status_id INTEGER,
    cos_id INTEGER
);

CREATE TABLE task_type (
    task_type_id SERIAL PRIMARY KEY,
    task_name TEXT
);

CREATE TABLE status (
    status_id SERIAL PRIMARY KEY,
    status_name TEXT
);

CREATE TABLE progress_pics (
    progress_pic_id SERIAL PRIMARY KEY,
    name TEXT,
    picture_url TEXT,
    cos_id INTEGER
);

INSERT INTO task_type (task_name)
VALUES('Buy');
INSERT INTO task_type (task_name)
VALUES('Craft');

INSERT INTO status (status_name)
VALUES('Not Started');
INSERT INTO status (status_name)
VALUES('In Progress');
INSERT INTO status (status_name)
VALUES('Done');

-- insert dummy data for demo

INSERT INTO cosplays (name, source, picture_url, user_id)
VALUES ('Clive', 'Final Fantasy', 'https://www.truetrophies.com/imgs/l/068928/ffxvi-clive.jpg', 1);

INSERT INTO tasks (task_type_id, name, cost, time, description, status_id, cos_id)
VALUES (1, 'buy wig', '200', 1, 'Purchase wig from Arda', 1, 1);

INSERT INTO tasks (task_type_id, name, cost, time, description, status_id, cos_id)
VALUES (2, 'make sword', '30', 5, 'Use foam from Lumins workshop', 2, 1);

INSERT INTO progress_pics (name, picture_url, cos_id)
VALUES ('Alibaba listing', 'https://ae01.alicdn.com/kf/S1bcf42a58b5c4e3aa6d00bba01525f86z/Adult-FF16-Clive-Rosfield-Costume-Cosplay-Final-Fantasy-XVI-Halloween-Outfit-Fancy-Main-Player-Character-Party.jpg_960x960.jpg', 1);

-- dummy user is Michael, pudding
INSERT INTO users (username, password_digest)
VALUES ('Michael', '$2b$10$HVNjA1asXLU/mcEjR9KDJO6/TotLNVuIXzY2v0a.LVeMNCec1g5WO');