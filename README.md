# ExpressDemo

![ExpressDemo](https://raw.githubusercontent.com/ansonhe97/rawimages/master/img/ExpressDemo.png)

This is a simple **CRUD project built using Node.js, Express, and MongoDB**. It provides basic functionality to create, read, update, and delete articles.

## Features

- Create new articles
- Read/Retrieve articles
- Update existing articles
- Delete articles
- Supports `Markdown` Blog
- Supports comments

![ExpressDemo-md](https://raw.githubusercontent.com/ansonhe97/rawimages/master/img/ExpressDemo-md.png)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your machine
- MongoDB running locally or on a remote server
- npm (Node Package Manager) installed

### NAS

```bash
$ sudo docker build -t expressdemo .
$ sudo docker stop expressapp
$ sudo docker rm expressapp
$ sudo docker run -d -p 4000:4000 --name expressapp --link mongodb:mongodb expressdemo
```

or

```bash
$ ./deploy.sh
```

## LICENSE
