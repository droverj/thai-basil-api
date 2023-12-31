DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  user_image VARCHAR(500),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment VARCHAR(140) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NULL
);
