# eagletrt-telemetria-exporter

A local webapp made with **VueJs** and **NodeJs** to easily export the telemetry data of **[@eagleTRT](https://github.com/eagletrt)**.

## Export database data as json

<br />
<p align="center">
  <img src="https://github.com/euberdeveloper/eagletrt-telemetria-exporter/raw/master/docs/assets/demo_json.gif">
</p>
<br />

## Export database data as csv

<br />
<p align="center">
  <img src="https://github.com/euberdeveloper/eagletrt-telemetria-exporter/raw/master/docs/assets/demo_csv.gif">
</p>
<br />

## Fetching schema error

<br />
<p align="center">
  <img src="https://github.com/euberdeveloper/eagletrt-telemetria-exporter/raw/master/docs/assets/fetching_database_error.png">
</p>
<br />

## Exporting error

<br />
<p align="center">
  <img src="https://github.com/euberdeveloper/eagletrt-telemetria-exporter/raw/master/docs/assets/exporting_error.png">
</p>
<br />

## Server startup

<br />
<p align="center">
  <img src="https://github.com/euberdeveloper/eagletrt-telemetria-exporter/raw/master/docs/assets/server_start_log.gif">
</p>
<br />

## Server exporting log

<br />
<p align="center">
  <img src="https://github.com/euberdeveloper/eagletrt-telemetria-exporter/raw/master/docs/assets/server_export_log.gif">
</p>
<br />

## Project purpose

This project was made for **[@eagleTRT](https://github.com/eagletrt)**. The telemetry data are saved as a **MongoDB** in a **Raspberry** inside the car. The purpose of this project is giving a fast way to export the data as json or csv. The project is a **NodeJs** server running in the raspberry and serving a **VueJs** webapp. It should be used with desktop devices, in that mobile support was not needed.

## User usage

To see a demo, scroll up to the top of this README.

Usage:

1. The user types in a browser `http://IP:PORT`, where `IP` is the ip of the raspberry and `PORT` is the port of the server.
2. The webapp asks the server for the **database schema** and shows it.
3. Three columns are shown. The first shows the databases. When the user select a database, in the second column appear the collections of that database. The user can select or unselect collections by clicking on them. All the selected collections appear in the third column, organized by database. The selected collections can be unselected also by clicking them in the third column.
4. Once selected the collections to export, the user clicks the **JSON** or the **CSV** button, depending on the desidered format.
5. The webapp sends the request to the server and wait for a **zipped** file of the exported collections.
6. After the server answers to the webapp, the zip file named with a human-readable timestamp is **downloaded**. Then the webapp comes back to point `2`.

## Developer usage

To put the exporter in the raspberry:

1. Connect the raspberry to the internet.
2. Install NodeJs if it is not installed.
3. Clone the repository.
4. Open the terminal in the root directory of the repository.
5. Execute `npm i`.
6. Execute `npm run start`.

To change the server port or the mongodb uri:

1. Open the file `config.json`.
2. Set the property `PORT` as needed.
3. Set the property of the object`MONGO` as needed.

To change something in the frontend:

1. Open the terminal in the directory `vuejs` of the repository.
2. Execute `npm i`.
3. Make changes to the frontend source code.
4. See changes by executing `npm run serve` and open a browser in `http://IP:8080`. Start the server if backend api are needed.
5. Open the terminal in the root directory of the repository.
6. Execute `npm run build:frontend`.
7. Execute `npm run start` to start the server.

To change the api hostname of the frontend:

1. Open the file `vuejs/src/config.json` of this repository.
2. Change the `host` and the `port` properties as needed.
3. Open the terminal in the root directory of this repository.
4. Execute `npm run build:frontend`.
5. Execute `npm run start` to start the server.

Note: If you can not modify `vuejs/src/config.json`, you can pass url parameters to the webapp, such as `http://IP:PORT?hostname=localhost:2323` or `http://IP:PORT?host=localhost&port=2323`.
