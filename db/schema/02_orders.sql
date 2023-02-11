DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  time_placed TIMESTAMP,
  time_estimated INTEGER,
  time_completed TIMESTAMP,
  total_cost INTEGER NOT NULL DEFAULT 0.00,
  is_completed BOOLEAN NOT NULL DEFAULT FALSE
);
