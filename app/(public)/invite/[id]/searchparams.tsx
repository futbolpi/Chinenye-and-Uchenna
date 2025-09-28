import { createSearchParamsCache, parseAsString } from "nuqs/server";
// Note: import from 'nuqs/server' to avoid the "use client" directive

export const inviteParamsParsers = {
  // List your search param keys and associated parsers here:
  phoneNumber: parseAsString.withDefault(""),
};

export const searchParamsCache = createSearchParamsCache(inviteParamsParsers, {
  urlKeys: {
    // Remap them to read from shorter keys in the URL
    phoneNumber: "phone",
  },
});
