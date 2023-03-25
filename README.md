# SORA-SVL: Local Cloud built for SVL Simulator

<p align="center">
    <a href="https://github.com/YuqiHuai/SORA-SVL/pulse">
      <img src="https://img.shields.io/github/last-commit/YuqiHuai/SORA-SVL?style=for-the-badge&logo=github&color=7dc4e4&logoColor=D9E0EE&labelColor=302D41"/>
    </a>
    <a href="https://github.com/YuqiHuai/SORA-SVL/releases/latest">
      <img src="https://img.shields.io/github/v/release/YuqiHuai/SORA-SVL?style=for-the-badge&logo=gitbook&color=59c9a5&logoColor=D9E0EE&labelColor=302D41"/>
    </a>
    <a href="https://github.com/YuqiHuai/SORA-SVL/stargazers">
      <img src="https://img.shields.io/github/stars/YuqiHuai/SORA-SVL?style=for-the-badge&logo=apachespark&color=eed49f&logoColor=D9E0EE&labelColor=302D41"/>
    </a>
    <a href="https://github.com/YuqiHuai/SORA-SVL/issues">
      <img src="https://img.shields.io/github/issues-closed/YuqiHuai/SORA-SVL?style=for-the-badge&logo=minutemailer&color=f24333&logoColor=D9E0EE&labelColor=302D41"/>
    </a>
    <a href="https://github.com/YuqiHuai/SORA-SVL/pulls">
      <img src="https://img.shields.io/github/issues-pr-closed/YuqiHuai/SORA-SVL?style=for-the-badge&logo=minutemailer&color=f24333&logoColor=D9E0EE&labelColor=302D41"/>
    </a>
    <a href="https://github.com/YuqiHuai/SORA-SVL/graphs/contributors">
      <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/YuqiHuai/SORA-SVL?style=for-the-badge&color=7D8CC4&logo=processwire&logoColor=D9E0EE&labelColor=302D41">
    </a>
</p>

---
## About the Project
[LGSVL Simulator](https://github.com/lgsvl/simulator) has been a powerful simulator that made many research projects possible. Unfortunately, LG has made the difficult decision to suspend active development of SVL Simulator, as of January 1, 2022. The official statement says the cloud will be up and running through at least **Thursday, June 30, 2022**.

The current version of SVL Simulator cannot be used without a cloud which provides necessary information (e.g. assetGuid) and download endpoints for SVL client.
As an effort to keep the tool available for future researches, a draft for a local cloud has been started here.

If you want to contribute to the project, please consider joining our [Slack workspace](https://join.slack.com/t/sorasvl/shared_invite/zt-1ovwoq5f9-qO~Tv07irNmug7KkoYu46A).

## Built With
1. [Docker](https://www.docker.com/)
2. [NGINX](https://www.nginx.com/) (Router)
3. [MongoDB](https://www.mongodb.com/) (Database)
4. [NodeJS](https://nodejs.org/en/) + [ExpressJS](https://expressjs.com/) (Server)
5. [React](https://reactjs.org/) (Client)
6. [Sphinx](https://www.sphinx-doc.org/en/master/) (docs)


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
> Also, when downloading individual asset file, make sure there is no file extension. Google sometimes automatically adds ".zip" to the end, make sure to remove this from the filename. See https://github.com/YuqiHuai/SORA-SVL/issues/33#issuecomment-1429161897
> 
> UPDATE 2022-06-30: WISE provides geojson for some of the maps. To access those geojson, download `geojson.json` from Google Drive, and then import them into MongoDB.

4. Create `.env` file for server and client following the template (should be same as template, change if you know what you are doing) (The template refers to `server/.env.template` and `client/.env.template`)
5. Run `docker compose up --build -d`
6. Local SVL Cloud will be available at "http://localhost"
7. Add `config.yml` to the root directory of SVL client with the following content:
   ```
   headless: false
   read_only: false
   api_hostname: "localhost"
   api_port: 8181
   cloud_url: "http://localhost"
   ```

   > Note the cloud url starts with `http` (not `https`)

8. Now, SVL Client can be used without WISE.

## Future Plans
- [ ] Gradually incorporate original LGSVL documentation
- [ ] Allow uploading sensor configuration
- [ ] Allow creating new simulation templates
- [ ] Allow creating new vehicle sensor configurations
- [ ] Add cluster feature to the cloud
- [x] Allow website to reflect client connection status.

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
