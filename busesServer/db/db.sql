USE harrys_db;

CREATE TABLE users(
	id_user BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(180) NOT NULL UNIQUE,
    name_user VARCHAR(90) NOT NULL,
    last_name_user VARCHAR(90) NOT NULL,
    cellphone VARCHAR(20) not null,
    image VARCHAR(255) NULL,
    password_user VARCHAR(255) NOT NULL,
    created_at timestamp(0) NOT NULL,
    update_at timestamp(0) NOT NULL
);


