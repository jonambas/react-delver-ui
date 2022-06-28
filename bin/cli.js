#! /usr/bin/env node
import { dirname } from 'path';
import meow from 'meow';
import { findUp } from 'find-up';
import { lib } from '../dist/cli.js';

const cli = meow(
  `
  Usage
    $ libby <command> [options...]
  Commands
    start          Starts the libby UI
    build          Builds the libby UI
    help           Displays this usage guide
	Options
    --help, -h     Displays this usage guide
    --version, -v  Displays version info
`,
  {
    importMeta: import.meta,
    flags: {
      help: {
        type: 'boolean',
        alias: 'h'
      },
      version: {
        type: 'boolean',
        alias: 'v'
      }
    }
  }
);

(async (command, flags) => {
  if (flags.version) {
    cli.showVersion(1);
  }

  if (command === 'help') {
    cli.showHelp();
    process.exit(1);
  }

  const configPath = await findUp('delver.config.js');

  if (!configPath) {
    console.error(
      'Please add delver.config.js to the root directory your project.'
    );
    process.exit(1);
  }

  const exit = () => {
    process.exit(1);
  };

  const delver = await lib(
    {
      cwd: dirname(configPath),
      configPath
    },
    exit
  );

  if (delver.hasOwnProperty(command)) {
    delver[command]();
  } else {
    cli.showHelp();
    process.exit(1);
  }
})(cli.input[0], cli.flags);
