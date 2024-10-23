import {web} from "./application/web";
import {logger} from "./application/logging";
import { env } from "./config/config";

web.listen(env.PORT, () => {
    logger.info("Listening on port 3000");
})