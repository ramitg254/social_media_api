

USE social_media_db;

CREATE TABLE Users (
    id VARCHAR(40) PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Posts (
    id VARCHAR(40) PRIMARY KEY,
    user_id VARCHAR(40) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE Comments (
    id VARCHAR(40) PRIMARY KEY,
    user_id VARCHAR(40) NOT NULL,
    post_id VARCHAR(40) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES Posts(id) ON DELETE CASCADE
);

CREATE TABLE Friends(
    user_id1 VARCHAR(40) NOT NULL,
    user_id2 VARCHAR(40) NOT NULL,
    friendship_status ENUM('PENDING','ACCEPTED') DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id1, user_id2),
    FOREIGN KEY (user_id1) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id2) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE Likes(
    id VARCHAR(40) PRIMARY KEY,
    user_id VARCHAR(40) NOT NULL,
    post_id VARCHAR(40) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES Posts(id) ON DELETE CASCADE,
    UNIQUE (user_id, post_id)
);
