CREATE DATABASE "restaurant_manage"
    WITH OWNER "postgres"
    ENCODING 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TEMPLATE template0;
\c restaurant_manage
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";