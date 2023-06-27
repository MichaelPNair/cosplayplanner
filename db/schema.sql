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
    name TEXT
);

CREATE TABLE status (
    status_id SERIAL PRIMARY KEY,
    name TEXT
);

INSERT INTO task_type (name)
VALUES('Buy');
INSERT INTO task_type (name)
VALUES('Craft');

INSERT INTO status (name)
VALUES('Not Started');
INSERT INTO status (name)
VALUES('In Progress');
INSERT INTO status (name)
VALUES('Done');

-- insert dummy data for demo

INSERT INTO cosplays (name, source, picture_url, user_id)
VALUES ('Clive', 'Final Fantasy', 'https://www.truetrophies.com/imgs/l/068928/ffxvi-clive.jpg', 1);

INSERT INTO tasks (task_type_id, name, cost, time, description, status_id, cos_id)
VALUES (1, 'buy wig', '200', 1, 'Purchase wig from Arda', 1, 1);