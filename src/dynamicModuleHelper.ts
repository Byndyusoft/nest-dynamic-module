/*
 * Copyright 2021 Byndyusoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { DynamicModule, FactoryProvider } from "@nestjs/common";

import { TRegisterAsyncOptions } from "./registerAsyncOptionsType";

export class DynamicModuleHelper {
  public static register<TConfig>(
    dynamicModule: DynamicModule,
    configToken?: FactoryProvider["provide"],
    config?: TConfig,
  ): DynamicModule {
    const providers = dynamicModule.providers ?? [];

    if (configToken && config !== undefined) {
      providers.push({
        provide: configToken,
        useValue: config,
      });
    }

    return {
      ...dynamicModule,
      providers,
    };
  }

  public static registerAsync<TConfig>(
    dynamicModule: DynamicModule,
    configToken?: FactoryProvider["provide"],
    options?: TRegisterAsyncOptions<TConfig>,
  ): DynamicModule {
    const providers = dynamicModule.providers ?? [];

    if (configToken && options?.useFactory) {
      providers.push({
        provide: configToken,
        inject: options.inject ?? [],
        useFactory: options.useFactory,
      });
    }

    return {
      ...dynamicModule,
      imports: [...(dynamicModule.imports ?? []), ...(options?.imports ?? [])],
      providers,
    };
  }
}
