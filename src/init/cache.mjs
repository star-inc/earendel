// Lavateinn - Tiny and flexible microservice framework.
// SPDX-License-Identifier: BSD-3-Clause (https://ncurl.xyz/s/mI23sevHR)

// cache-layer (legacy) is used for as an in-memory cache.
// NodeCache only can be allowed in "single" mode.

// Import modules
import NodeCache from "node-cache";

/**
 * Lavateinn Cache.
 * @class Cache
 * The unified cache layer for the application.
 */
class Cache {
    /**
     * The node-cache instance.
     * @type {NodeCache|undefined}
     */
    _cacheClient;

    /**
     * The Lavateinn cache instance.
     * @param {NodeCache} client - The cache client.
     */
    constructor(client) {
        this._cacheClient = client;
    }

    /**
     * Get the raw node-cache client.
     * @returns {any} The client.
     */
    rawClient() {
        return this._cacheClient;
    }

    /**
     * Check if a key exists in the cache.
     * @param {string} key - The cache key.
     * @returns {boolean} True if the key exists, false otherwise.
     */
    has(key) {
        return this._cacheClient.has(key);
    }

    /**
     * Get a cached value via its key.
     * @param {string} key - The cache key.
     * @returns {any} The cached element.
     */
    get(key) {
        return this._cacheClient.get(key);
    }

    /**
     * Get multiple cached keys at once.
     * @param {string[]} keys - An array of cache keys.
     * @returns {any[]} An array of cached elements.
     */
    mget(keys) {
        return this._cacheClient.mget(keys);
    }

    /**
     * Set a cached key with the given value.
     * @param {string} key - The cache key.
     * @param {any} value - The value to cache.
     * @param {number} ttl - The time to live for the cache.
     * @returns {boolean} True if the key is set, false otherwise.
     */
    set(key, value, ttl) {
        return this._cacheClient.set(key, value, ttl);
    }

    /**
     * Set multiple cached keys with the given values.
     * @param {object[]} keyValueSet - An array of object.
     * @returns {boolean} True if all keys are set, false otherwise.
     */
    mset(keyValueSet) {
        return this._cacheClient.mset(keyValueSet);
    }

    /**
     * Delete a cached values via their keys.
     * @param {string} keys - The cache key.
     * @returns {boolean} True if the key is deleted, false otherwise.
     */
    del(keys) {
        return this._cacheClient.del(keys);
    }

    /**
     * Set a key's time to live in seconds.
     * @param {string} key - The cache key.
     * @param {number} ttl - The time to live for the cache.
     * @returns {boolean} True if the key is set, false otherwise.
     */
    ttl(key, ttl) {
        return this._cacheClient.ttl(key, ttl);
    }

    /**
     * Get the time to live (TTL) of a cached value.
     * @param {string} key - The cache key.
     * @returns {number} The TTL in seconds.
     */
    getTTL(key) {
        return this._cacheClient.getTtl(key);
    }

    /**
     * List all keys within this cache
     * @returns {string[]} An array of all keys.
     */
    keys() {
        return this._cacheClient.keys();
    }

    /**
     * Get cache statistics.
     * @returns {object[]} An array of cache statistics.
     */
    getStats() {
        return this._cacheClient.getStats();
    }

    /**
     * Flush the whole data and reset the cache.
     * @returns {boolean} true if the cache is flushed.
     */
    flushAll() {
        return this._cacheClient.flushAll();
    }

    /**
     * This will clear the interval timeout which is set on checkperiod option.
     * @returns {boolean} true if the cache is cleared and closed.
     */
    close() {
        return this._cacheClient.close();
    }
}

// Construct the NodeCache client
const globalClient = new NodeCache();

/**
 * Composable cache.
 * @module src/init/cache
 * @param {boolean} [isLocal] - Whether the cache is local or global.
 * @returns {Cache} The cached layer
 */
export function useCache(isLocal = false) {
    // Construct the NodeCache client
    const client = isLocal ? new NodeCache() : globalClient;

    // Construct the cache layer
    return new Cache(client);
}
