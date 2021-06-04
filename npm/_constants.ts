export const INVALID_GREATER_THEN_214 =
  "Name length must be less equal than 214";
export const INVALID_START_WITH_DOT = "Name cannot start with a period";
export const INVALID_START_WITH_ = "Name cannot start with an underscore";
export const INVALID_LETTER_CASE = "Name can no longer contain capital letters";

export const INVALID_SPACIAL_CHAR =
  "Name contains only the characters a-z, 0-9 and -._";
export const INVALID_BLACKLIST = "Name is blacklisted";
export const INVALID_CORE_MODULES = "Name is a core module name";
export const BLACKLIST = ["node_modules", "favicon.ico"];
export const RegularLetter = /^[a-z\d_\-\.]+$/;

export const CORE_MODULES = [
  "assert",
  "buffer",
  "child_process",
  "cluster",
  "console",
  "constants",
  "crypto",
  "dgram",
  "dns",
  "domain",
  "events",
  "fs",
  "http",
  "https",
  "module",
  "net",
  "os",
  "path",
  "punycode",
  "querystring",
  "readline",
  "repl",
  "stream",
  "string_decoder",
  "sys",
  "timers",
  "tls",
  "tty",
  "url",
  "util",
  "vm",
  "zlib",
  "freelist",
  "v8",
  "process",
  "inspector",
  "async_hooks",
  "http2",
  "perf_hooks",
  "trace_events",
  "worker_threads",
  "wasi",
];
