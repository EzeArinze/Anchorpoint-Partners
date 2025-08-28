// search-params.ts
import { parseAsInteger, parseAsString, createLoader } from "nuqs/server";

export const coordinatesSearchParams = {
  search: parseAsString.withDefault(""),
  offset: parseAsInteger.withDefault(0),
};

// create a loader for server components
export const loadSearchParams = createLoader(coordinatesSearchParams);
