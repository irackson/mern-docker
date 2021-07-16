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

-   dev compose cmd (from ./): $ `docker-compose -f docker-compose.dev.yml --env-file=dev.env up --build --remove-orphans`
-   or to run last image: $ `docker compose up -d` (`-d` for detached mode)
-   to stop running: $ `docker compose stop`

development server will give a port you to view, but that's the inner port... go to the one on the left of client 'ports' in the docker-compose file (specified in env)

to view db in MongoDB Compass, make sure to replace name of mongo docker service (ex. 'db') with 'localhost'

##### production with mongo auth

###### create production images

-   remove existing db volume if any:
    -   $ docker volume ls
    -   $ docker volume remove _existing-db_

1. run `docker-compose -f docker-compose.pre_prod.yml --env-file=preprod.env up --build --remove-orphans`
2. in new terminal...

    1. list containers with `docker ps`, then copy name of container with mongo image (should be `team-nrd_db_1`)
    2. enter mongo container with `docker exec -it team-nrd_db_1 bash`
    3. enter mongo shell with `mongo`
    4. switch to db admin with `use admin`
    5. create root user with MONGO_INITDB_ROOT_USERNAME and MONGO_INITDB_ROOT_PASSWORD from postprod.env

        ```language='bash'
        db.createUser(
            {
                user: "username123",
                pwd: "password123",
                roles:["root"]
            }
        );
        ```

3. exit mongo shell with `exit`
4. exit container shell with `exit`
5. shut down docker containers with `ctrl c`
6. recreate production environment with `docker-compose -f docker-compose.test_prod.yml --env-file=postprod.env up --build --remove-orphans`

###### upload production images to dockerhub

creating images

1. go to dockerhub and create repository (mine is ihomenasusdevr/nrd2):
2. `cd client && docker build . -t ihomenasusdevr/nrd2:client-depl -f ./Dockerfile.prod && docker push ihomenasusdevr/nrd2:client-depl && cd ..`
3. `cd server && docker build . -t ihomenasusdevr/nrd2:server-depl -f ./Dockerfile.prod && docker push ihomenasusdevr/nrd2:server-depl && cd ..`

Digital Ocean instructions

1. `docker-machine create --driver digitalocean --digitalocean-image "ubuntu-18-04-x64" --digitalocean-access-token yourtoken yourdropletname`
    - if the following error shows up, you can just skip to step 2, but if it annoys you...: Error creating machine: Error running provisioning: Unable to verify the Docker daemon is listening: Maximum number of retries (10) exceeded, don't worry, just `docker-machine regenerate-certs yourdropletname`. this will probably get stuck when copying certs to the remote machine. after a few minutes, ctrl c out, then proceed
    - mount to active state: `docker-machine use yourdropletname`
2. enter with: `docker-machine ssh yourdropletname`
3. install docker-compose with `apt install docker-compose`
4. docker pull client/server images (`docker pull ihomenasusdevr/nrd2:client-depl`, `docker pull ihomenasusdevr/nrd2:server-depl`)
5. `touch docker-compose.yml` --> `vim docker-compose.yml` --> copy/paste docker-compose.depl.yml
6. `touch .env` --> `vim .env` --> copy/paste postprod.env contents to .env
7. deploy app: `docker-compose up -d --force-recreate --remove-orphans`
8. exit ssh shell: `exit`

#### Useful commands

-   stop nginx: `sudo systemctl stop nginx`
-   check network stuff: `sudo netstat -nlp`
-   to run app from Docker Desktop, paste any of the non-hosting docker-compose file contents into docker-compose.yml
-   start docker (if error: "Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?"): on macos open the docker app
