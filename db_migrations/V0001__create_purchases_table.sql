-- Таблица для хранения покупок донатов
CREATE TABLE IF NOT EXISTS purchases (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(255) UNIQUE NOT NULL,
    player_name VARCHAR(50) NOT NULL,
    product_id VARCHAR(50) NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    price INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    payment_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    paid_at TIMESTAMP,
    issued_at TIMESTAMP
);

-- Индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_purchases_player_name ON purchases(player_name);
CREATE INDEX IF NOT EXISTS idx_purchases_order_id ON purchases(order_id);
CREATE INDEX IF NOT EXISTS idx_purchases_status ON purchases(status);
CREATE INDEX IF NOT EXISTS idx_purchases_created_at ON purchases(created_at DESC);

-- Комментарии к таблице
COMMENT ON TABLE purchases IS 'История покупок донатов игроками';
COMMENT ON COLUMN purchases.order_id IS 'Уникальный ID заказа';
COMMENT ON COLUMN purchases.player_name IS 'Игровой ник покупателя';
COMMENT ON COLUMN purchases.product_id IS 'ID привилегии (HERO, TITAN, etc)';
COMMENT ON COLUMN purchases.product_name IS 'Название товара';
COMMENT ON COLUMN purchases.price IS 'Стоимость в рублях';
COMMENT ON COLUMN purchases.status IS 'Статус: pending, paid, issued, failed';
COMMENT ON COLUMN purchases.payment_url IS 'Ссылка на оплату';
COMMENT ON COLUMN purchases.created_at IS 'Время создания заказа';
COMMENT ON COLUMN purchases.paid_at IS 'Время оплаты';
COMMENT ON COLUMN purchases.issued_at IS 'Время выдачи привилегии';
