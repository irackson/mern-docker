# CAPSTONE DEVOPS [![wakatime](https://wakatime.com/badge/github/irackson/dockerized-mern.svg)](https://wakatime.com/badge/github/irackson/dockerized-mern)

## Instructions

### Development in/out of Docker

#### to run outside of docker container

1. spin up mongo (from ./server): $ ~/mongodb/bin/mongod
2. $ cd server && npm run dev
3. $ cd client && npm run start

#### Docker Instructions

care -- dev compose will overwrite prod compose and vice versa

##### development

-   dev compose cmd (from ./): $ docker-compose -f docker-compose.dev.yml up --build --remove-orphans
-   or to run last image: $ docker compose up (-d for detached mode)
-   to stop running: $ docker compose stop

development server will give a port you to view, but that's the inner port... go to the one on the left of client 'ports' in the docker-compose file (specified in env)

to view db in MongoDB Compass, make sure to replace name of mongo docker service (ex. 'db') with 'localhost'

##### production with mongo auth

###### create production images

-   remove existing db volume if any:
    -   $ docker volume ls
    -   $ docker volume remove _existing-db_

1. place contents of preprod.env file into .env
2. run `docker-compose -f docker-compose.pre_prod.yml up --build --remove-orphans`
3. in terminal...

    1. list containers with `docker ps`, then copy name of container with mongo image (should be `node-react-docker_db_1`)
    2. enter mongo container with `docker exec -it team-nrd_db_1 bash`
    3. enter mongo shell with `mongo`
    4. switch to db admin with `use admin`
    5. create root user with

        ```language='bash'
        db.createUser(
            {
                user: "username123",
                pwd: "password123",
                roles:["root"]
            }
        );
        ```

4. exit mongo shell with `exit`
5. exit container shell with `exit`
6. shut down docker containers with `ctrl c`

7. place contents of postprod.env file into .env
 <!-- 8. create production images with `docker-compose -f docker-compose.test_prod.yml up --build --remove-orphans` -->
8. create production images with `docker-compose -f docker-compose.test_prod.yml up --build --remove-orphans`

###### upload production images to dockerhub

creating images

1. go to dockerhub and create repository:
2. `cd client && docker build . -t ihomenasusdevr/nrd:client-depl -f ./Dockerfile.prod && docker push ihomenasusdevr/nrd:client-depl && cd ..`
3. `cd server && docker build . -t ihomenasusdevr/nrd:server-depl -f ./Dockerfile.prod && docker push ihomenasusdevr/nrd:server-depl && cd ..`

Digital Ocean instructions

1. `docker-machine create --driver digitalocean --digitalocean-image "ubuntu-18-04-x64" --digitalocean-access-token yourtoken yourdropletname`
2. mount to active state: `docker-machine use machine-name`
3. enter with: `docker-machine ssh machine-name`
4. install docker-compose with `apt install docker-compose`
5. docker pull client/server images
6. touch docker-compose.yml --> vim --> copy/paste docker-compose.depl.yml
7. touch .env --> vim --> copy/paste depl.env
