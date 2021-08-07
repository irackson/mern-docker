# DevOps Capstone by Ian Rackson

## Description: DevOps GA Module -- using my team's project from unit-3 as the codebase, this capstone aims to demonstrate a CI/CD workflow centered around Docker. The end product is a DigitalOcean droplet that provisions an interactive composition of server, client, and mongo production images via Nginx

### Checkout my walk-through!

<div class="iframe-container"><iframe src="https://www.youtube-nocookie.com/embed/W5Xq3RdX5kc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

###### Time spent learning to dockerize and host this already-coded MERN app:

[![wakatime](https://wakatime.com/badge/github/irackson/dockerized-mern.svg)](https://wakatime.com/badge/github/irackson/dockerized-mern)+[![wakatime](https://wakatime.com/badge/github/irackson/mern-docker.svg)](https://wakatime.com/badge/github/irackson/mern-docker)

###### Git Repo: <https://github.com/irackson/mern-docker>

###### Digital Ocean Droplet IP: <http://167.99.48.166/>

---

### Codebase from Bootcamp Team Project (unit-3) [![Netlify Status](https://api.netlify.com/api/v1/badges/d0575a8c-cbed-42fb-9fe3-bd43d0d2c47d/deploy-status)](https://app.netlify.com/sites/zen-lewin-23d62a/deploys)

##### Contributors

-   Ian Rackson: Frontend [![wakatime](https://wakatime.com/badge/github/katherinevgomez/Project-3-frontend.svg)](https://wakatime.com/badge/github/katherinevgomez/Project-3-frontend), Backend [![wakatime](https://wakatime.com/badge/github/katherinevgomez/Project-3-backend.svg)](https://wakatime.com/badge/github/katherinevgomez/Project-3-backend)
-   Garrett Dunlap: Frontend
-   Will Pratt: Backend
-   Katherine Gomez: Original Github Repo manager

###### Frontend Live at (no-docker):

-   <https://teamproject.ianrackson.com/>
-   <https://zen-lewin-23d62a.netlify.app/>

###### Backend Live at (no-docker):

-   <https://seir-team-project.herokuapp.com/>

##### Instructions to run outside of docker (for comparison)

1. spin up mongo (from ./server): $ ~/mongodb/bin/mongod
2. touch env in server and add necessary variables
3. $ cd server && npm run dev
4. $ cd client && npm run start

---

### Docker / Digital Ocean Instructions

##### To write code (development)

1. dev compose cmd (from ./): $ `docker-compose -f docker-compose.dev.yml --env-file=dev.env up --build --remove-orphans`

-   or to run last image: $ `docker compose up -d` (`-d` for detached mode)
-   to stop running: $ `docker compose stop`

###### Dev Notes

-   development server will log a port for you to view frontend app, but that's the inner port... go to the one on the left of client 'ports' in the docker-compose file (specified in env), or open the Docker app and click view in browser
-   to view local dev db in MongoDB Compass, make sure to replace name of mongo docker service (ex. 'db') with 'localhost'

##### To deploy (production)

###### Create production images locally

1. run `docker-compose -f docker-compose.pre_prod.yml --env-file=preprod.env up --build --remove-orphans`
2. in new terminal...

    1. list containers with `docker ps`, then copy name of container with mongo image (should be something like `root-dir_db_1`)
    2. enter mongo container with `docker exec -it root-dir_db_1 bash`
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

###### Local Prod Testing Notes

-   to view local dev db in MongoDB Compass, use uri with auth credentials in addition to using 'localhost' as cluster name
-   to run app from Docker Desktop
    1. paste any of the non-hosting docker-compose file contents into docker-compose.yml
    2. start docker (if error: "Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?")
    3. open the docker app
-   to remove existing db volume if desired: 4. $ docker volume ls 5. $ docker volume remove _existing-db_

###### Build and upload production images to dockerhub

1. go to dockerhub and create repository (mine is ihomenasusdevr/nrd2):
2. `cd client && docker build . -t ihomenasusdevr/nrd2:client-depl -f ./Dockerfile.prod && docker push ihomenasusdevr/nrd2:client-depl && cd ..`
3. `cd server && docker build . -t ihomenasusdevr/nrd2:server-depl -f ./Dockerfile.prod && docker push ihomenasusdevr/nrd2:server-depl && cd ..`

###### Deploy on Digital Ocean

1. `docker-machine create --driver digitalocean --digitalocean-image "ubuntu-18-04-x64" --digitalocean-access-token yourtoken yourdropletname`
    - if the following error shows up, you can just skip to step 2, but if it annoys you...: Error creating machine: Error running provisioning: Unable to verify the Docker daemon is listening: Maximum number of retries (10) exceeded, don't worry, just `docker-machine regenerate-certs yourdropletname`. this will probably get stuck when copying certs to the remote machine. after a few minutes, ctrl c out, then proceed
    - mount to active state: `docker-machine use yourdropletname`
2. ssh into droplet with: `docker-machine ssh yourdropletname`
3. install docker-compose with `apt install docker-compose`
4. docker pull client/server images (`docker pull ihomenasusdevr/nrd2:client-depl`, `docker pull ihomenasusdevr/nrd2:server-depl`)
5. `touch docker-compose.yml` --> `vim docker-compose.yml` --> copy/paste docker-compose.depl.yml
6. `touch .env` --> `vim .env` --> copy/paste postprod.env contents to .env
7. deploy app: `docker-compose up -d --force-recreate --remove-orphans`
8. exit ssh shell: `exit`

###### Useful linux droplet commands

-   stop nginx: `sudo systemctl stop nginx`
-   identify key ports: `sudo netstat -nlp`
