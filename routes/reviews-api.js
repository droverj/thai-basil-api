const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/:id', (req, res) => {
  return db.query(`
    SELECT *
    FROM reviews
    JOIN users
    ON users.id = reviews.user_id
    WHERE users.id = $1
  `, [req.params.id])
    .then(({ rows: userReviews }) => {
      res.json(userReviews);
    })
    .catch((error) => {
      console.error('Error fetching user reviews:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

router.get('/', (req, res) => {
  return db.query(`
    SELECT *
    FROM reviews
  `)
    .then(({ rows: reviews }) => {
      res.json(reviews);
    })
    .catch((error) => {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});


router.post("/", (req, res) => {
  const { user_id, rating, comment } = req.body;

  // Validate request data
  if (!user_id || !rating || !comment || rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Invalid data" });
  }

  // Check if a review already exists for the user
  db.query(
    "SELECT * FROM reviews WHERE user_id = $1",
    [user_id]
  )
    .then(({ rows: existingReviews }) => {
      if (existingReviews.length > 0) {
        return res.status(409).json({ error: "User already submitted a review" });
      }

      // If no existing review, insert the new review
      return db
        .query(
          `
          INSERT INTO reviews (user_id, rating, comment, created_at, updated_at)
          VALUES ($1, $2, $3, NOW(), NULL)
          RETURNING *
          `,
          [user_id, rating, comment]
        )
        .then(({ rows: [newReview] }) => {
          res.status(201).json(newReview);
        })
        .catch((error) => {
          console.error("Error inserting review:", error);
          res.status(500).json({ error: "Internal server error" });
        });
    })
    .catch((error) => {
      console.error("Error checking existing reviews:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

router.delete("/:id", (req, res) => {
  console.log(req.params);
  return db
    .query(
      `
      DELETE FROM reviews WHERE id = $1;
      `,
      [req.params.id]
    )
    .then(() => {
      res.json({ message: 'Review deleted successfully' });
    })
    .catch((error) => {
      console.error('Error deleting review:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});


module.exports = router;
