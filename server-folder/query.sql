-- Table schema.
CREATE TABLE todo (
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(100) NOT NULL UNIQUE
);

