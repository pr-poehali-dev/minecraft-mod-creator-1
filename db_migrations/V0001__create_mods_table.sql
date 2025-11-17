CREATE TABLE IF NOT EXISTS mods (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    version VARCHAR(50) NOT NULL,
    category VARCHAR(100),
    file_url TEXT,
    image_url TEXT,
    downloads INTEGER DEFAULT 0,
    file_size VARCHAR(50),
    minecraft_version VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_mods_category ON mods(category);
CREATE INDEX idx_mods_created_at ON mods(created_at DESC);

INSERT INTO mods (name, description, version, category, image_url, downloads, file_size, minecraft_version) VALUES
('CyberTech Arsenal', 'Футуристичное оружие и технологии будущего для Minecraft', '2.5.0', 'Оружие', 'https://cdn.poehali.dev/projects/40278f07-9abe-4f05-b8d9-d6b5a2742976/files/cfa35b98-3cf4-4613-a7e5-01af58af94c2.jpg', 1200000, '45 MB', '1.20.1'),
('Neon City Biomes', 'Неоновые города и киберпанк биомы с подсветкой', '1.8.3', 'Биомы', 'https://cdn.poehali.dev/projects/40278f07-9abe-4f05-b8d9-d6b5a2742976/files/cfa35b98-3cf4-4613-a7e5-01af58af94c2.jpg', 850000, '68 MB', '1.20.1'),
('Holo Interface', 'Голографические интерфейсы и HUD в стиле sci-fi', '3.1.0', 'Интерфейс', 'https://cdn.poehali.dev/projects/40278f07-9abe-4f05-b8d9-d6b5a2742976/files/cfa35b98-3cf4-4613-a7e5-01af58af94c2.jpg', 2300000, '32 MB', '1.19.4'),
('Neural Implants', 'Кибернетические улучшения и имплантаты для персонажа', '1.5.2', 'Способности', 'https://cdn.poehali.dev/projects/40278f07-9abe-4f05-b8d9-d6b5a2742976/files/cfa35b98-3cf4-4613-a7e5-01af58af94c2.jpg', 650000, '28 MB', '1.20.1'),
('Quantum Mobs', 'Киберпанк мобы с уникальными способностями', '2.0.1', 'Мобы', 'https://cdn.poehali.dev/projects/40278f07-9abe-4f05-b8d9-d6b5a2742976/files/cfa35b98-3cf4-4613-a7e5-01af58af94c2.jpg', 920000, '54 MB', '1.20.1'),
('Neon Blocks Pack', 'Светящиеся блоки с неоновой подсветкой для строительства', '4.2.0', 'Блоки', 'https://cdn.poehali.dev/projects/40278f07-9abe-4f05-b8d9-d6b5a2742976/files/cfa35b98-3cf4-4613-a7e5-01af58af94c2.jpg', 1500000, '76 MB', '1.20.1');
