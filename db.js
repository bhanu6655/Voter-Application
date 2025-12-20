const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");

const db = new sqlite3.Database("./votingApp.db", (err) => {
  if (err) console.error(err.message);
  else console.log("Connected to SQLite database");
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS voters (
      voter_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT,
      has_voted INTEGER DEFAULT 0
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS candidates (
      candidate_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      party TEXT,
      password TEXT,
      votes INTEGER DEFAULT 0
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS votes (
      vote_id INTEGER PRIMARY KEY AUTOINCREMENT,
      voter_id INTEGER UNIQUE,
      candidate_id INTEGER,
      FOREIGN KEY (voter_id) REFERENCES voters(voter_id),
      FOREIGN KEY (candidate_id) REFERENCES candidates(candidate_id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS admins (
      admin_id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    )
  `);

  // Insert default admin (once)
  bcrypt.hash("admin123", 10).then((hash) => {
    db.run(
      `INSERT OR IGNORE INTO admins (username, password) VALUES (?, ?)`,
      ["admin", hash]
    );
  });
});

module.exports = db;
