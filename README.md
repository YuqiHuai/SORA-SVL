# SORA-SVL: Local Cloud built for SVL Simulator
---
## About the Project
[LGSVL Simulator](https://github.com/lgsvl/simulator) has been a powerful simulator that made many research projects possible. Unfortunately, LG has made the difficult decision to suspend active development of SVL Simulator, as of January 1, 2022. The official statement says the cloud will be up and running through at least **Thursday, June 30, 2022**.

The current version of SVL Simulator cannot be used without a cloud which provides necessary information (e.g. assetGuid) and download endpoints for SVL client.
As an effort to keep the tool available for future researches, a draft for a local cloud has been started here.

## Built With
1. [Docker](https://www.docker.com/)
2. [NGINX](https://www.nginx.com/) (Router)
3. [MongoDB](https://www.mongodb.com/) (Database)
4. [NodeJS](https://nodejs.org/en/) + [ExpressJS](https://expressjs.com/) (Server)
5. [React](https://reactjs.org/) (Client)


## Getting Started

### Current Version Supports:
1. Viewing maps, vehicles, plugins (previews)
2. Allow SVL Client to connect to a local cloud
3. Start an API Only Simulation

### To Run the Project
1. Install Docker
2. Clone the project
3. Download assets needed from [Google Drive](https://drive.google.com/drive/folders/1bv02d29z4lSB9SWzCBTUt0GjAb876oSR?usp=sharing) and unzip them in `server/assets`. (preview, maps, plugins, vehicles, hdmaps)
> Since the compressed file for entire maps directory is too large, you will have to manually download map asset individually from the Google Drive folder.
> Also, when downloading individual asset file, make sure there is no file extension. Google sometimes automatically adds ".zip" to the end, make sure to remove this from the filename.
> 
> UPDATE 2022-06-30: WISE provides geojson for some of the maps. To access those geojson, download `geojson.json` from Google Drive, and then import them into MongoDB.

4. Create `.env` file for server and client following the template (should be same as template, change if you know what you are doing) (The template refers to `server/.env.template` and `client/.env.template`)
5. Run `docker-compose up --build -d`
6. Local SVL Cloud will be available at "http://localhost"
7. Add `config.yml` to the root directory of SVL client with the following content:
   ```
   headless: false
   read_only: false
   api_hostname: "localhost"
   api_port: 8181
   cloud_url: "http://localhost"
   ```
8. Now, SVL Client can be used without WISE.

## Future Plans
- [ ] Allow uploading sensor configuration
- [ ] Allow creating new simulation templates
- [ ] Allow creating new vehicle sensor configurations
- [ ] Allow website to reflect client connection status
- [ ] Add cluster feature to the cloud

## Known Issues

- It is possible that permission settings related to Docker can cause project to fail (unable to load preview, unable to download assets). See https://github.com/YuqiHuai/SORA-SVL/issues/11#issuecomment-1173008100

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
