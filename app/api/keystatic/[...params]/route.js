
import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../keystatic.schema";

export const { POST, GET } = makeRouteHandler({
  config,
});
