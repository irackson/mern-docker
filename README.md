_Title_:

# MERN with Docker

_Description_:

###### This Bootcamp capstone demonstrates a CI/CD workflow centered around Docker Containers and the MERN Stack

_Markdown_:

### Using a Full CRUD MERN stack app with JWT token authorization built in, which I created with a team of other remote developers while at General Assembly's Coding Bootcamp, this capstone transforms that original codebase into a Dockerized production level application with a CI/CD workflow.

### The end product is a DigitalOcean droplet that provisions an interactive composition of server, client, and mongo production images via Nginx.

###### Digital Ocean Droplet IP: <http://167.99.48.166/>

###### Nicer Link: <http://dockerized-mern.ianrackson.com/>

###### DockerHub Repo: <https://hub.docker.com/repository/docker/ihomenasusdevr/nrd2>

#### Checkout this Q&A on Docker with my General Assembly Instructor Ira Herman!

<div class="iframe-container"><iframe src="https://www.youtube-nocookie.com/embed/W5Xq3RdX5kc?start=581&modestbranding=1&rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

<!-- ###### Time spent learning to dockerize and host the _Run Hike Walk_ MERN app, which was originally coded without using docker by myself and a team of bootcamp peers!

[![wakatime](https://wakatime.com/badge/github/irackson/dockerized-mern.svg)](https://wakatime.com/badge/github/irackson/dockerized-mern)+[![wakatime](https://wakatime.com/badge/github/irackson/mern-docker.svg)](https://wakatime.com/badge/github/irackson/mern-docker) -->

<!-- ###### Git Repo: <https://github.com/irackson/mern-docker> -->

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

###### Frontend Readme (by Will Pratt)

> The frontend of this project was started on 21MAY21 and was edited multiple times. Then main focus of frontend was rendering a clean, colorful, and beautiful UI, full CRUD routes for the three pages (run, hike, scenic) of the On The Run app. The original creator of the repo was Katherine and the author of the first pull request was Garrett. After a couple days the team added Ian Rackson. All together they proceeded to put together an amazing app that was visually beautiful and functional. Will contributed authorization code as well. The success of the frontend was really driven by Garrett, Katherine, and Ian.

> The key features were the visual design, dark mode, and google maps. The reason these were key were because Users really enjoy compelling visual design, the ability to customize their experience of the app, and also like knowing or showing off where they have been or where they would like to go. These features really enhanced the UX and brought the app in line with other social media apps on the market.

> The big challenge was deployment. When deployment issues arose, Kathrine and Ian were key in editing the code to make sure it was deployable. Without the team of Ian and Katherine problem shooting deployment, this project would not have been as successful as it was.

> Going forward, a feature that would be extremely useful would be uploading pictures from a mobile device. Another feature would be being able to add the route a user travelled much like Strava.

> Ultimately, the On The Run app provides a simple way to post a user's run, hike, or scenic walk for all to see with a clean and colorful UI.

> In conclusion, this was a team effort. Everyone contributed key code and provided exceptional effort to make this app visually beautiful, functional, and the project successful.

###### Backend Live at (no-docker):

-   <https://seir-team-project.herokuapp.com/>

###### Backend Readme (by Will Pratt)

> The backend of this project was started on May 20, 2021 and was edited multiple times. Then main focus of backend was facilitating the creation of CRUD routes for the three pages (run, hike, scenic) of the On The Run site. The original author was Will Pratt. The QA/QC was Ian Rackson and Katherine Gomez. Both of whom edited this file up to the last minute and make this project an ultimate success.

> Besides the CRUD routes, the additional feature of authentication was added. This was to ensure users could: 1. not have anyone else edit/deface their activity posts. 2. only that authorized user could post under that username. This was a good exercise in authorizations in React for the team to problem shoot basic issues like tokens and how to logout.

> The big challenges for the backend came later in the development. the first challenge was authentication. Then, when deployment issues arose, Kathrine and Ian were key in editing the code to make sure it was deployable.

> Going forward, what would be an extremely useful feature would be uploading pictures from a mobile device. This would be in line with other social media apps on the market. Another feature would be being able to add the route a user travelled much like Strava.

> As it relates to features, a key user story/how might we is: "AAU, I would like to be able to post one of my favorite runs/hikes/scenic walks." In this case, How Might Users that are runners/hikers post about their amazing experiences? It could be Running in a beautiful city like San Francisco, Hiking the hill country of Texas, or their Scenic hike through the New Mexico "the Land of Enchantment". Users need to primarily be able to upload pictures and claim their run. Additionally they need to provide details like a title, location, difficulty, and distance. Potentially, the pictures and location could be used for future monetization. The pictures can be leveraged by influencers for their sponsors and location data for a range of purposes.

> Ultimately, the On The Run app provides a simple way to post a user's run, hike, or scenic walk for all to see with a clean and colorful UI.

> Once again, without the team of Ian, Katherine, and Will each contributing extremely important input to the backend, this project would not have been as successful as it was.

##### Instructions to run outside of docker (for comparison)

1. spin up mongo (from ./server): $ ~/mongodb/bin/mongod
2. touch env in server and add necessary variables
3. $ cd server && npm run dev
4. $ cd client && npm run start
