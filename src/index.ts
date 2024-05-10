import { createServer } from "http";
import app from "./app";
import config from "./utils/config";

const server = createServer(app);

const { port } = config;

server.listen(port, () => console.log(`listending on port ${port}`));
