# SORA-SVL-Server: Local Cloud built for SVL Simulator

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

## Download from Docker Hub

The images built from this source repository are available on Docker Hub:

- [densosvic/sora-svl-server](https://hub.docker.com/repository/docker/densosvic/sora-svl-server)
- [densosvic/sora-svl-client](https://hub.docker.com/repository/docker/densosvic/sora-svl-client)
- [densosvic/sora-svl-mongo](https://hub.docker.com/repository/docker/densosvic/sora-svl-mongo)
- [densosvic/sora-svl-router](https://hub.docker.com/repository/docker/densosvic/sora-svl-router)
- [densosvic/sora-svl-docs](https://hub.docker.com/repository/docker/densosvic/sora-svl-docs)

## About the Project

[LGSVL Simulator](https://github.com/lgsvl/simulator) has been a powerful simulator that made many research projects possible. Unfortunately, LG has made the difficult decision to suspend active development of SVL Simulator, as of January 1, 2022. The official statement says the cloud will be up and running through at least **Thursday, June 30, 2022**.

The current version of the SVL Simulator cannot be used without a cloud that provides necessary information (e.g. assetGuid) and download endpoints for the SVL client.
As an effort to keep the tool available for future research, a draft for a local cloud has been started here.

If you want to contribute to the project, please consider joining our [Slack workspace](https://join.slack.com/t/sorasvl/shared_invite/zt-1ovwoq5f9-qO~Tv07irNmug7KkoYu46A).

## Disclaimer

Thank you for using and considering citing this project! It is important to know that SORA-SVL is just a web application necessary to use the SVL simulator developed by LG without additional modification.
To avoid potential confusion, **please avoid describing SORA-SVL as a simulator**! I am also adding the term "server" to the name of this project as of September 25, 2024, to avoid further confusion.
I would greatly appreciate it if you could cite this work in addition to the appropriate source (the SVL simulator) in your academic work!

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
3. Run `docker compose up --build -d`
4. Local SVL Cloud will be available at "http://localhost"
5. Add `config.yml` to the root directory of SVL client with the following content:

   ```toml
   headless: false
   read_only: false
   api_hostname: "localhost"
   api_port: 8181
   cloud_url: "http://localhost"
   ```

   > Note the cloud url starts with `http` (not `https`).
   > 
   > See documentation from [SVL archive](https://www.svlsimulator.com/docs/user-interface/config-and-cmd-line-params/).

6. Now, SVL Client can be used without WISE.

## Future Plans

- [ ] Gradually incorporate original LGSVL documentation
- [ ] Allow uploading sensor configuration
- [ ] Allow creating new simulation templates
- [ ] Allow creating new vehicle sensor configurations
- [ ] Add cluster feature to the cloud
- [x] Allow website to reflect client connection status.
- [x] Host assets at a different location

## Known Issues

- Unable to download WISE assets during Docker build

  The assets used in this build are downloaded from Amazon AWS S3 buckets hosted in `us-east-1`. These are public files but may not be available in all countries.
  
  For users in China, please download from [Baidu Drive](https://pan.baidu.com/s/1w_Ik7lPdefAalWR_c22DoQ?pwd=ey7p) and substitute these files for the downloads in the Dockerfile. Also see https://github.com/YuqiHuai/SORA-SVL/issues/84#issuecomment-2296465522 and https://github.com/YuqiHuai/SORA-SVL/issues/89#issuecomment-2370252260

- It is possible that permission settings related to Docker can cause project to fail (unable to load preview, unable to download assets). See https://github.com/YuqiHuai/SORA-SVL/issues/11#issuecomment-1173008100
- I recommend installing docker following instructions in https://docs.docker.com/engine/install/ubuntu/
- There may be issues with npm/docker image which causes `docker compose up -d` to fail, see https://github.com/YuqiHuai/SORA-SVL/issues/84#issuecomment-2296465522 and https://github.com/YuqiHuai/SORA-SVL/issues/89#issuecomment-2370252260
- There have been several issues related to failing to start the server when running the project in China. Please see the comments referenced above to configure NPM properly.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
