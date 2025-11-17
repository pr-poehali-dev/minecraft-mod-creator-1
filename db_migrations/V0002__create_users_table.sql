CREATE TABLE t_p76334343_minecraft_mod_creato.users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON t_p76334343_minecraft_mod_creato.users(email);
CREATE INDEX idx_users_created_at ON t_p76334343_minecraft_mod_creato.users(created_at);