import database from "../db";

let db: ReturnType<typeof database> | null = null;

// Function to initialize the database safely
const getDb = () => {
  if (db) return db;

  // For development, create a minimal mock D1 if no real D1 is available
  const mockD1 = {
    prepare: () => ({
      bind: () => ({ all: () => Promise.resolve({ results: [] }) }),
      first: () => Promise.resolve(null),
      run: () => Promise.resolve({ success: true }),
    }),
    exec: () => Promise.resolve({ results: [] }),
    batch: () => Promise.resolve([]),
    dump: () => Promise.resolve(new ArrayBuffer(0)),
  } as unknown as D1Database;

  db = database(mockD1);
  return db;
};

// Function to initialize the actual database at runtime
export const initializeDatabase = (d1Database: D1Database) => {
  db = database(d1Database);
};

export { getDb as db };
