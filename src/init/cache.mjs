// node-cache is an in-memory cache.

// Import modules
import {getMust} from "../config.mjs";
import NodeCache from "node-cache";

// Initialize node-cache
const stdTTL = getMust("CACHE_MAX_TTL");
const cache = new NodeCache({stdTTL: parseInt(stdTTL)});

// Export as a function named useCache
export const useCache = () => cache;
