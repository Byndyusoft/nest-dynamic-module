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

/* eslint-disable max-classes-per-file */

import { DynamicModuleHelper } from "~/src";

const CONFIG_TOKEN = Symbol("CONFIG_TOKEN");

class TestModule {}

class TestImportedModule {}

class TestProvider {}

describe("DynamicModuleHelper", () => {
  describe(".register", () => {
    it("must add config to providers if providers exists", () => {
      expect(
        DynamicModuleHelper.register(
          {
            module: TestModule,
            providers: [TestProvider],
          },

          CONFIG_TOKEN,
          "config",
        ),
      ).toStrictEqual({
        module: TestModule,
        providers: [
          TestProvider,
          {
            provide: CONFIG_TOKEN,
            useValue: "config",
          },
        ],
      });
    });

    it("must add config to providers if providers don't exists", () => {
      expect(
        DynamicModuleHelper.register(
          {
            module: TestModule,
          },
          CONFIG_TOKEN,
          "config",
        ),
      ).toStrictEqual({
        module: TestModule,
        providers: [
          {
            provide: CONFIG_TOKEN,
            useValue: "config",
          },
        ],
      });
    });

    it("must don't add config to providers if config is undefined", () => {
      expect(
        DynamicModuleHelper.register(
          {
            module: TestModule,
          },
          CONFIG_TOKEN,
        ),
      ).toStrictEqual({
        module: TestModule,
        providers: [],
      });
    });
  });

  describe(".registerAsync", () => {
    it("must add config to providers if providers exists", () => {
      const useFactory = jest.fn();

      expect(
        DynamicModuleHelper.registerAsync(
          {
            module: TestModule,
            providers: [TestProvider],
          },
          CONFIG_TOKEN,
          {
            useFactory,
          },
        ),
      ).toStrictEqual({
        module: TestModule,
        imports: [],
        providers: [
          TestProvider,
          {
            provide: CONFIG_TOKEN,
            inject: [],
            useFactory,
          },
        ],
      });
    });

    it("must add config to providers if providers don't exists", () => {
      const useFactory = jest.fn();

      expect(
        DynamicModuleHelper.registerAsync(
          {
            module: TestModule,
          },
          CONFIG_TOKEN,
          {
            useFactory,
          },
        ),
      ).toStrictEqual({
        module: TestModule,
        imports: [],
        providers: [
          {
            provide: CONFIG_TOKEN,
            inject: [],
            useFactory,
          },
        ],
      });
    });

    it("must don't add config to providers if useFactory is undefined", () => {
      expect(
        DynamicModuleHelper.registerAsync(
          {
            module: TestModule,
          },
          CONFIG_TOKEN,
        ),
      ).toStrictEqual({
        module: TestModule,
        imports: [],
        providers: [],
      });
    });

    it("must use imports from dynamicModule", () => {
      expect(
        DynamicModuleHelper.registerAsync({
          module: TestModule,
          imports: [TestImportedModule],
        }),
      ).toStrictEqual({
        module: TestModule,
        imports: [TestImportedModule],
        providers: [],
      });
    });

    it("must use imports from options", () => {
      expect(
        DynamicModuleHelper.registerAsync(
          {
            module: TestModule,
          },
          CONFIG_TOKEN,
          {
            imports: [TestImportedModule],
          },
        ),
      ).toStrictEqual({
        module: TestModule,
        imports: [TestImportedModule],
        providers: [],
      });
    });

    it("must use inject from options", () => {
      const useFactory = jest.fn();

      expect(
        DynamicModuleHelper.registerAsync(
          {
            module: TestModule,
          },
          CONFIG_TOKEN,
          {
            inject: ["ConfigDto"],
            useFactory,
          },
        ),
      ).toStrictEqual({
        module: TestModule,
        imports: [],
        providers: [
          {
            provide: CONFIG_TOKEN,
            inject: ["ConfigDto"],
            useFactory,
          },
        ],
      });
    });
  });
});
