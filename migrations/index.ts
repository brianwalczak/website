import * as migration_20260112_013837 from './20260112_013837';
import * as migration_20260112_023800 from './20260112_023800';
import * as migration_20260426_020650 from './20260426_020650';

export const migrations = [
  {
    up: migration_20260112_013837.up,
    down: migration_20260112_013837.down,
    name: '20260112_013837',
  },
  {
    up: migration_20260112_023800.up,
    down: migration_20260112_023800.down,
    name: '20260112_023800',
  },
  {
    up: migration_20260426_020650.up,
    down: migration_20260426_020650.down,
    name: '20260426_020650'
  },
];
