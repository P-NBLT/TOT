export {
  createAffinityQuery,
  createCommentsQuery,
  createFriendshipQuery,
  createPlanetsQuery,
  createPostsQuery,
  createPublicMessagesQuery,
  createUsersQuery,
  createProfileQuery,
  createMessageTableQuery,
  createUsersChatQuery,
  createChatsTableQuery,
};

const createPlanetsQuery = `CREATE TABLE planets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE,
    rotation_period CHAR(7),
    orbital_period CHAR(7),
    diameter CHAR(7),
    climate VARCHAR(100),
    gravity VARCHAR(40),
    terrain VARCHAR(100),
    surface_water CHAR(7),
    population CHAR(13)
    );`;

const createAffinityQuery = ` CREATE TABLE affinity (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL UNIQUE
        );`;

const createUsersQuery = `CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(60) UNIQUE,
        email_verification_token VARCHAR(250) UNIQUE,
        is_verified BOOLEAN DEFAULT false,
        password VARCHAR(255),
        oauth_provider VARCHAR(255),
        oauth_issuer VARCHAR(255),
        oauth_id VARCHAR(255),
        oauth_access_token VARCHAR(255),
        created_at DATE DEFAULT NOW()
        );
`;

const createProfileQuery = `CREATE TABLE profile (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) NOT NULL UNIQUE,
        username VARCHAR(50) NOT NULL,
        role VARCHAR(20) NOT NULL,
        bot BOOLEAN NOT NULL,
        side VARCHAR(20) NOT NULL,
        affinity_name VARCHAR(30) REFERENCES affinity(name) NOT NULL,
        homeworld_name VARCHAR(30) REFERENCES planets(name),
        created_at DATE DEFAULT NOW()
);`;

const createPostsQuery = `CREATE TABLE posts (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        title VARCHAR(50) NOT NULL,
        body text NOT NULL,
        likes INTEGER DEFAULT 0,
        created_at DATE DEFAULT NOW()
        );`;

const createCommentsQuery = `CREATE TABLE "comments" (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        post_id INTEGER REFERENCES posts(id),
        body text NOT NULL,
        likes INTEGER DEFAULT 0,
        created_at DATE DEFAULT NOW()
        );`;

const createFriendshipQuery = `CREATE TABLE friendship (
        requester_id INTEGER NOT NULL,
        addressee_id INTEGER NOT NULL,
        created_at DATE DEFAULT NOW(),
        CONSTRAINT friendship_pk PRIMARY KEY(requester_id, addressee_id),
        CONSTRAINT friendship_to_requester_fk FOREIGN KEY (requester_id)
            REFERENCES users(id),
        CONSTRAINT friendship_to_addressee_fk FOREIGN KEY(addressee_id)
            REFERENCES users(id),
        CONSTRAINT firendship_are_distinct_ck CHECK (requester_id <> addressee_id)
        );`;

const createPublicMessagesQuery = `CREATE TABLE public_messages (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        body VARCHAR(250) NOT NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'available',
        created_at DATE DEFAULT NOW()
    );`;

//chat_types is type of ENUM('1_to_1', 'group'))
const createChatsTableQuery = `CREATE TABLE chats (
        chat_id SERIAL PRIMARY KEY,
        chat_name VARCHAR(100),
        chat_type chat_types NOT NULL,
        creation_date DATE DEFAULT NOW()
        );`;

const createMessageTableQuery = `CREATE TABLE messages (
                    message_id SERIAL PRIMARY KEY,
                    chat_id INTEGER REFERENCES chats(chat_id),
                    user_id INTEGER REFERENCES users(id),
                    message TEXT NOT NULL,
                    created_at DATE DEFAULT NOW()
                );`;

const createUsersChatQuery = `CREATE TABLE users_chats (
        user_id INTEGER REFERENCES users(id),
        chat_id INTEGER REFERENCES chats(chat_id),
        PRIMARY KEY (user_id, chat_id),
        created_at DATE DEFAULT NOW()
        );`;
