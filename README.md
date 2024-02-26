# patient-dashboard

This repo is divided into two folders:

1. `/client`
This is a frontend React application. To run this:
- `cd /client`
- `npm install` (if it's your first time running this)
- `npm start`

2. `/server`
This is a backend Java spring boot application. To run this:
- Spin up a local Elasticsearch cluster on Docker. See https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html
- `cd /server`
- `mvn package`
- `mvn spring-boot:run`
