CREATE TABLE IF NOT EXISTS settings (
  id INTEGER PRIMARY KEY CHECK (id=1),
  store_name TEXT DEFAULT 'Casa Doce Amor',
  whatsapp TEXT DEFAULT '5588993378148',
  pix TEXT DEFAULT '88993378148',
  instagram TEXT DEFAULT 'casa_doce_amor03',
  description TEXT DEFAULT 'Bolos e doces feitos com carinho em Croatá - CE.',
  monday TEXT DEFAULT '08:00-18:00', tuesday TEXT DEFAULT '08:00-18:00', wednesday TEXT DEFAULT '08:00-18:00', thursday TEXT DEFAULT '08:00-18:00', friday TEXT DEFAULT '08:00-18:00', saturday TEXT DEFAULT '08:00-18:00', sunday TEXT DEFAULT 'Fechado'
);
INSERT OR IGNORE INTO settings(id) VALUES(1);

CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_name TEXT NOT NULL DEFAULT '',
  customer_phone TEXT DEFAULT '',
  items_json TEXT NOT NULL,
  total REAL NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
