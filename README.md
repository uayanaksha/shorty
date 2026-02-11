# Shorty: Url shortner backend application

## Used technologies

![bun](https://skillicons.dev/icons?i=bun)
![express](https://skillicons.dev/icons?i=express)
![mongodb](https://skillicons.dev/icons?i=mongodb)
![linux](https://skillicons.dev/icons?i=linux)

## Quickstart 

```bash
git clone https://github.com/uayanaksha/shorty --depth 1;
cd shorty;
bun install;
```

Add approprite environment variables to .env file

```bash
PORT=3300
HOST=http://localhost:3300/
DB_NAME=<db-name-here>
DB_URL=mongodb+srv://<username>:<credentials>@<cluster-name>.<hash>.mongodb.net/?appName=<custer-name>
HASH_KEY=<random-hash-here>
```

Run in development mode with:

```bash
bun dev
```

Build a compiled executable

```bash
bun run build
```

Run the executable

```bash
./dist/shorty
```

## Usage 

```bash
curl -X GET http:/[::1]:3300/
```

```bash
curl --json @sample.json  http://[::1]:3300/
```

```bash
xdg-open http://localhost:3300/698ccbe8d13d09cef18b831d
```
> [!NOTE]
> `xdg-open` is a linux exlusive utility
> macos supports `open` and windows supports `start` command for similar purposes.

## Upcomming

- Client side utility support
- Hash creation method needs improvement
- Optimize throughput time
- Migrate to postgres

## Caution 

This project does not showcase standard industry grade codebase, and does not promote best practices.
This codebase is 100% non-AI generated and will continue to be built and maintained by 
[@uayanaksha](https://github.com/uayanaksha).
