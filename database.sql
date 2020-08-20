CREATE DATABASE "giphy_search_favorites";

-- You'll need a table for storing each giphy image favorite
-- Each favorite image can be assigned 1 of the following categories as a Foreign Key

-- Category table
CREATE TABLE "category" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (100) NOT NULL
);

-- Default categories. You may change them :)
INSERT INTO "category" ("name")
VALUES ('funny'), ('cohort'), ('cartoon'), ('nsfw'), ('meme');

CREATE TABLE "favorite" (
    "id" SERIAL PRIMARY KEY,
    "url" VARCHAR(200) NOT NULL,
    "description" VARCHAR(50),
    "category_id" INT REFERENCES "category"
);

INSERT INTO "favorite" ("url", "description", "category_id")
VALUES('https://media.giphy.com/media/3o7btSQvfKibGpkk9i/giphy.gif', 'we can do this', 2);
