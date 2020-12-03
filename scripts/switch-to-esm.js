const replace = require("replace");

replace({
  regex: '"target":\\s+"(.+?)"',
  replacement: '"target": "esnext"',
  paths: ["packages/app/tsconfig.json"],
  recursive: false,
  silent: true,
});

replace({
  regex: '"module":\\s+"(.+?)"',
  replacement: '"module": "esnext"',
  paths: ["packages/app/tsconfig.json"],
  recursive: false,
  silent: true,
});

replace({
  regex: '"outDir":\\s+"(.+?)"',
  replacement: '"outDir": "lib/esm"',
  paths: ["packages"],
  include: "tsconfig.json",
  recursive: true,
  silent: true,
});
