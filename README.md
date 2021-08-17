# nest-dynamic-module

[![npm@latest](https://img.shields.io/npm/v/@byndyusoft/nest-dynamic-module/latest.svg)](https://www.npmjs.com/package/@byndyusoft/nest-dynamic-module)
[![test workflow](https://github.com/Byndyusoft/nest-dynamic-module/actions/workflows/test.yaml/badge.svg?branch=master)](https://github.com/Byndyusoft/nest-dynamic-module/actions/workflows/test.yaml)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

DynamicModule helper for NestJS

## Requirements

- Node.js v12 LTS or later
- npm or yarn

## Install

```bash
npm install @byndyusoft/nest-dynamic-module
```

or

```bash
yarn add @byndyusoft/nest-dynamic-module
```

## Usage

Example usage:

```typescript
import {
  DynamicModuleHelper,
  TRegisterAsyncOptions,
} from "@byndyusoft/nest-dynamic-module";
import { DynamicModule, Inject, Injectable, Module } from "@nestjs/common";

class ExampleOptionsDto {
  public readonly connectionString!: string;
}

const EXAMPLE_OPTIONS_TOKEN = Symbol("EXAMPLE_OPTIONS_TOKEN");

@Injectable()
class ExampleProvider {
  public constructor(
    @Inject(EXAMPLE_OPTIONS_TOKEN)
    options: ExampleOptionsDto,
  ) {
    console.log(options.connectionString);
  }
}

@Module({})
class ExampleModule {
  public static registerAsync(
    options?: TRegisterAsyncOptions<ExampleOptionsDto>,
  ): DynamicModule {
    return DynamicModuleHelper.registerAsync(
      {
        module: ExampleModule,
        global: true,
        providers: [ExampleProvider],
        exports: [ExampleProvider],
      },
      EXAMPLE_OPTIONS_TOKEN,
      options,
    );
  }
}

class ConfigDto {
  public readonly exampleOptions!: ExampleOptionsDto;
}

@Module({
  imports: [
    ExampleModule.registerAsync({
      inject: [ConfigDto],
      useFactory: (config: ConfigDto) => config.exampleOptions,
    }),
  ],
})
class AppModule {}
```

## Maintainers

- [@Byndyusoft/owners](https://github.com/orgs/Byndyusoft/teams/owners) <<github.maintain@byndyusoft.com>>
- [@Byndyusoft/team](https://github.com/orgs/Byndyusoft/teams/team)

## License

This repository is released under version 2.0 of the
[Apache License](https://www.apache.org/licenses/LICENSE-2.0).
