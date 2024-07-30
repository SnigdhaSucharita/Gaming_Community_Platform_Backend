const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

// Connect to SQLite database
(async () => {
  db = await open({ filename: "./database.sqlite", driver: sqlite3.Database });
  if (db) console.log("Connected to the SQLite database.");
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4-Assignment 2- Gaming Community Platform Backend." });
});

// YOUR ENDPOINTS GO HERE

async function fetchAllGames() {
  let query = "SELECT * FROM games";
  let response = await db.all(query, []);
  return { games: response };
}

app.get("/games", async (req, res) => {
  try {
    let result = await fetchAllGames();
    if(result.games.length === 0) {
      res.status(404).json({ message: "No games found." });
    }
    res.status(200).json(result);
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
})

async function fetchGameById(id) {
  let query = "SELECT * FROM games WHERE id = ?";
  let response = await db.all(query, [id]);
  return { game: response };
}

app.get("/games/details/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let result = await fetchGameById(id);
    if(result.game.length === 0) {
      res.status(404).json({ message: "No game by this id found." });
    }
    res.status(200).json(result);
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
})

async function fetchGamesByGenre(genre) {
  let query = "SELECT * FROM games WHERE genre = ?";
  let response = await db.all(query, [genre]);
  return { games: response };
}

app.get("/games/genre/:genre", async (req, res) => {
  let genre = req.params.genre;
  try {
    let result = await fetchGamesByGenre(genre);
    if(result.games.length === 0) {
      res.status(404).json({ message: "No games of this genre found." });
    }
    res.status(200).json(result);
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
})

async function fetchGamesByPlatform(platform) {
  let query = "SELECT * FROM games WHERE platform = ?";
  let response = await db.all(query, [platform]);
  return { games: response };
}

app.get("/games/platform/:platform", async (req, res) => {
  let platform = req.params.platform;
  try {
    let result = await fetchGamesByPlatform(platform);
    if(result.games.length === 0) {
      res.status(404).json({ message: "No games of this platform found." });
    }
    res.status(200).json(result);
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
})

async function fetchGamesSortedByRating() {
  let query = "SELECT * FROM games ORDER BY rating DESC";
  let response = await db.all(query, []);
  return { games: response };
}

app.get("/games/sort-by-rating", async (req, res) => {
  try {
    let result = await fetchGamesSortedByRating();
    if(result.games.length === 0) {
      res.status(404).json({ message: "No games found." });
    }
    res.status(200).json(result);
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
})

async function fetchAllPlayers() {
  let query = "SELECT * FROM players";
  let response = await db.all(query, []);
  return { players: response };
}

app.get("/players", async (req, res) => {
  try {
    let result = await fetchAllPlayers();
    if(result.players.length === 0) {
      res.status(404).json({ message: "No players found." });
    }
    res.status(200).json(result);
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
})

async function fetchPlayerById(id) {
  let query = "SELECT * FROM players WHERE id = ?";
  let response = await db.all(query, [id]);
  return { player: response };
}

app.get("/players/details/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let result = await fetchPlayerById(id);
    if(result.player.length === 0) {
      res.status(404).json({ message: "No player by this id found." });
    }
    res.status(200).json(result);
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
})

async function fetchPlayersByPlatform(platform) {
  let query = "SELECT * FROM players WHERE platform = ?";
  let response = await db.all(query, [platform]);
  return { players: response };
}

app.get("/players/platform/:platform", async (req, res) => {
  let platform = req.params.platform;
  try {
    let result = await fetchPlayersByPlatform(platform);
    if(result.players.length === 0) {
      res.status(404).json({ message: "No players of this platform found." });
    }
    res.status(200).json(result);
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
})

async function fetchPlayersSortedByRating() {
  let query = "SELECT * FROM players ORDER BY rating DESC";
  let response = await db.all(query, []);
  return { players: response };
}

app.get("/players/sort-by-rating", async (req, res) => {
  try {
    let result = await fetchPlayersSortedByRating();
    if(result.players.length === 0) {
      res.status(404).json({ message: "No players found." });
    }
    res.status(200).json(result);
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
})

async function fetchAllTournaments() {
  let query = "SELECT * FROM tournaments";
  let response = await db.all(query, []);
  return { tournaments: response };
}

app.get("/tournaments", async (req, res) => {
  try {
    let result = await fetchAllTournaments();
    if(result.tournaments.length === 0) {
      res.status(404).json({ message: "No tournaments found." });
    }
    res.status(200).json(result);
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
})

async function fetchTournamentById(id) {
  let query = "SELECT * FROM tournaments WHERE id = ?";
  let response = await db.all(query, [id]);
  return { tournament: response };
}

app.get("/tournaments/details/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let result = await fetchTournamentById(id);
    if(result.tournament.length === 0) {
      res.status(404).json({ message: "No tournament by this id found." });
    }
    res.status(200).json(result);
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
})

async function fetchTournamentByGameId(gameId) {
  let query = "SELECT * FROM tournaments WHERE gameId = ?";
  let response = await db.all(query, [gameId]);
  return { tournament: response };
}

app.get("/tournaments/game/:gameId", async (req, res) => {
  let gameId = req.params.gameId;
  try {
    let result = await fetchTournamentByGameId(gameId);
    if(result.tournament.length === 0) {
      res.status(404).json({ message: "No tournament by this gameId found." });
    }
    res.status(200).json(result);
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
})

async function fetchTournamentsSortedByPrizePool() {
  let query = "SELECT * FROM tournaments ORDER BY prizePool DESC";
  let response = await db.all(query, []);
  return { tournaments: response };
}

app.get("/tournaments/sort-by-prize-pool", async (req, res) => {
  try {
    let result = await fetchTournamentsSortedByPrizePool();
    if(result.tournaments.length === 0) {
      res.status(404).json({ message: "No tournaments found." });
    }
    res.status(200).json(result);
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});