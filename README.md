# URL Shortening Service (TypeORM + MongoDB)

## Prerequisites:
- Install memcached `Ubuntu: apt-get install memcached` or `MacOS: brew install memcached`.
- Install MongoDB using this [link](https://docs.mongodb.com/manual/administration/install-community/).
- Install Node.js v12+ using this [link](https://nodejs.org/en/download/)


## Steps to run this project:

1. Run `npm i` command to install the dependencies.
2. Create `.env` by copying or renaming `.env.example`.
3. Replace variables in `.env` from local variables.   
4. Run `npm run debug` command to start the server.


## System Architecture

![alt System Architecture](https://pathlightprouploads.s3.amazonaws.com/system-architecture.png "URL Shortener")

- Using `memcached` for `LRU Caching`.
- Generating short url by hashing using `MD5` & then encoding it to `base64`.
- Can generate `64^8 = ~281 trillion` possible strings without collision.


## Improvements for Future
- Load Balancing
- Distributing Data across regions
- Missing User APIs
- Improved analytics
