CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, password) VALUES
      ('foo', '123'),
	  ('bar', '213'),
	  ('baz', '321');

-- CREATE TABLE todos (
--     id SERIAL PRIMARY KEY,
--     title VARCHAR(255) NOT NULL,
--     description TEXT,
--     completed BOOLEAN DEFAULT FALSE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE tags (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(50) NOT NULL UNIQUE
-- );

-- CREATE TABLE todo_tags (
--     todo_id INTEGER REFERENCES todos(id) ON DELETE CASCADE,
--     tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
--     PRIMARY KEY (todo_id, tag_id)
-- );

-- INSERT INTO todos (title, description, completed) VALUES
--       ('Buy groceries', 'Milk, eggs, bread', false),
--       ('Finish project', 'Complete the report by Friday', false),
--       ('Call mom', 'Catch up and plan visit', true),
--       ('Exercise', 'Go for a 30-minute run', false),
--       ('Read book', 'Finish chapter 5 of "The Great Gatsby"', false);
      
-- INSERT INTO tags (name) VALUES
--       ('personal'),
--       ('work'),
--       ('health'),
--       ('urgent'),
--       ('leisure');
      
-- INSERT INTO todo_tags (todo_id, tag_id) VALUES
--       (1, 1), (1, 4), -- Buy groceries: personal, urgent
--       (2, 2), (2, 4), -- Finish project: work, urgent
--       (3, 1),         -- Call mom: personal
--       (4, 3),         -- Exercise: health
--       (5, 1), (5, 5);  -- Read book: personal, leisure