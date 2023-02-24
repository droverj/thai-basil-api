DROP TABLE IF EXISTS matches;

CREATE TABLE matches (
  id SERIAL PRIMARY KEY NOT NULL,
  pet_one INTEGER REFERENCES pets(id) ON DELETE CASCADE,
  pet_two INTEGER REFERENCES pets(id) ON DELETE CASCADE,
  pet_one_match BOOLEAN DEFAULT TRUE,
  pet_two_match BOOLEAN DEFAULT FALSE
);
