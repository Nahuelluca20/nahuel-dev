DROP TABLE IF EXISTS post;

CREATE TABLE IF NOT EXISTS post (
  id TEXT PRIMARY KEY,
  date TEXT,
  content TEXT,
  tags TEXT,
  title TEXT
);

INSERT INTO
  post (id, date, content, tags, title)
VALUES
  (
    'sarasa23d',
    '11/12/23',
    '# Remix prefetch: Get data early and cache it with PrefetchPageLinks This is a small',
    '[Remix pre-fetch cache]',
    'Remix prefetch data with PrefetchPageLinks'
  );