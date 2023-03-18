import config from "@config/config";
import logger from "@config/logger";
import makeApp from "./app";

const app = makeApp();

app.listen(config.port, () => {
  logger.info(`Server is running at http://localhost:${config.port}`);
});
