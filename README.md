# DevOps Capstone

## MVP

**- Automated testing**
You will add automated tests to your application, covering as much functionality as possible. For example, unit tests can be written to confirm the functionality of your model layer, while integration tests can be written to test whether or not a given HTTP request will result in a response that conforms to expectations.

    Based on the previous lessons, Mocha and Chai can be used to test an Express application in addition to libraries such as Supertest for testing APIs. Other monolith applications in non-JavaScript languages tend to have preferred testing libraries associated with them, such as RSpec for Rails or jUnit for Java. If you choose to add testing to a React application, we recommend using the Jest and Enzyme libraries.

    To ensure you can meet all of the project requirements in a timely fashion, you should write a token amount of tests before moving on to the other deliverables. Once you have the full scaffolding set up, you can return to write more tests.

**- Deployment with Docker**  
 Use Docker to provide a container for your application. Docker offers detailed documentation for containerizing and deploying applications of all popular tech stacks, in addition to many learning resources and third-party guides and walk-throughs. If you rely on any third-party walk-throughs or guides, try to find the most recent resources that use a tech stack as closely related to your project as possible.

    Recall the use of Docker images to set up the basic tech stack requirements for your application. You will likely be able to find an official image to start from for your project. We recommend trying to containerize either a monolith application or the back-end API from a React-based project.

**- Continuous integration**
Your project will use Jenkins to set up a build pipeline. The build stage should install any necessary dependencies, such as Node modules, while the testing stage should run the automated tests you've written for your application.

    Finally, your pipeline should have a delivery stage that includes pushing code to a Git repository and/or deploying the application with tools such as Heroku.

LiveLink (frontend): <http://159.89.34.53/>
LiveLink (backend): <http://159.89.34.53:4000/>
Git Repo Link (frontend & backend):
