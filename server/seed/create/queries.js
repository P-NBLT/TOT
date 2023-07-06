export {
  createAffinityQuery,
  createCommentsQuery,
  createFriendshipQuery,
  createPlanetsQuery,
  createPostsQuery,
  createPublicMessagesQuery,
  createUsersQuery,
};

const createPlanetsQuery = `CREATE TABLE planets (
    id serial PRIMARY KEY,
    name varchar(30) UNIQUE,
    rotation_period char(7),
    orbital_period char(7),
    diameter char(7),
    climate varchar(100),
    gravity varchar(40),
    terrain varchar(100),
    surface_water char(7),
    population char(13)
    );`;

const createAffinityQuery = ` CREATE TABLE affinity (
        id serial PRIMARY KEY,
        name varchar(30) NOT NULL UNIQUE
        );`;

const createUsersQuery = `CREATE TABLE users (
        id serial PRIMARY KEY,
        username varchar(50) NOT NULL,
        role varchar(20) NOT NULL,
        bot boolean NOT NULL,
        affinity_name varchar(30) REFERENCES affinity(name) NOT NULL,
        homeworld_name varchar(30) REFERENCES planets(name),
        email varchar(60) UNIQUE NOT NULL,
        created_at date default now()
        );
`;
const createPostsQuery = `CREATE TABLE posts (
        id serial PRIMARY KEY,
        user_id integer REFERENCES users(id),
        title varchar(50) NOT NULL,
        body text NOT NULL,
        likes integer default 0,
        created_at date default now()
        );`;

const createCommentsQuery = `CREATE TABLE "comments" (
        id serial PRIMARY KEY,
        user_id integer REFERENCES users(id),
        post_id integer REFERENCES posts(id),
        body text NOT NULL,
        likes integer DEFAULT 0,
        created_at date default now()
        );`;

const createFriendshipQuery = `CREATE TABLE friendship (
        requester_id integer NOT NULL,
        addressee_id integer NOT NULL,
        created_at date default now(),
        CONSTRAINT friendship_pk PRIMARY KEY(requester_id, addressee_id),
        CONSTRAINT friendship_to_requester_fk FOREIGN KEY (requester_id)
            REFERENCES users(id),
        CONSTRAINT friendship_to_addressee_fk FOREIGN KEY(addressee_id)
            REFERENCES users(id),
        CONSTRAINT firendship_are_distinct_ck CHECK (requester_id <> addressee_id)
        );`;

const createPublicMessagesQuery = `CREATE TABLE public_messages (
        id serial PRIMARY KEY,
        user_id integer REFERENCES users(id),
        body varchar(250) NOT NULL,
        status varchar(20) NOT NULL DEFAULT 'available',
        created_at date default now()
    );`;
