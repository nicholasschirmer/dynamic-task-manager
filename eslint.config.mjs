const rxjs = require( "eslint-plugin-rxjs")
const unusedImports = require ("eslint-plugin-unused-imports");
const globals = require ("globals");
const tsParser = require ("@typescript-eslint/parser");
const path = require ("node:path");
const js = require ("@eslint/js");

__filename = fileURLToPath(import.meta.url);
__dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@angular-eslint/recommended",
    "plugin:@angular-eslint/template/process-inline-templates",
), {
    plugins: {
        rxjs,
        "unused-imports": unusedImports,
    },

    languageOptions: {
        globals: {
            ...globals.node,
            ...globals.browser,
        },

        parser: tsParser,
        ecmaVersion: 5,
        sourceType: "commonjs",

        parserOptions: {
            project: ["./tsconfig.app.json", "./tsconfig.spec.json", "./tsconfig.json"],
            tsconfigRootDir: "C:\\Workspace\\Interview_prep\\dynamic-task-manager",
        },
    },

    rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/prefer-readonly": "error",
        semi: "off",
        "@typescript-eslint/semi": "error",

        "@angular-eslint/directive-selector": ["error", {
            type: "attribute",
            prefix: "app",
            style: "camelCase",
        }],

        "@angular-eslint/component-selector": ["error", {
            type: "element",
            prefix: "app",
            style: "kebab-case",
        }],

        "@typescript-eslint/naming-convention": ["error", {
            selector: "memberLike",
            format: ["camelCase"],
            leadingUnderscore: "forbid",
        }, {
            selector: "memberLike",
            modifiers: ["private"],
            format: ["camelCase"],
            leadingUnderscore: "require",
        }],

        "@typescript-eslint/member-ordering": ["error", {
            default: {
                memberTypes: [
                    "signature",
                    "call-signature",
                    "public-static-field",
                    "protected-static-field",
                    "private-static-field",
                    "#private-static-field",
                    "public-decorated-field",
                    "protected-decorated-field",
                    "private-decorated-field",
                    "public-instance-field",
                    "protected-instance-field",
                    "private-instance-field",
                    "#private-instance-field",
                    "public-abstract-field",
                    "protected-abstract-field",
                    "public-field",
                    "protected-field",
                    "private-field",
                    "#private-field",
                    "static-field",
                    "instance-field",
                    "abstract-field",
                    "decorated-field",
                    "field",
                    "static-initialization",
                    "public-constructor",
                    "protected-constructor",
                    "private-constructor",
                    "constructor",
                    "public-static-accessor",
                    "protected-static-accessor",
                    "private-static-accessor",
                    "#private-static-accessor",
                    "public-decorated-accessor",
                    "protected-decorated-accessor",
                    "private-decorated-accessor",
                    "public-instance-accessor",
                    "protected-instance-accessor",
                    "private-instance-accessor",
                    "#private-instance-accessor",
                    "public-abstract-accessor",
                    "protected-abstract-accessor",
                    "public-accessor",
                    "protected-accessor",
                    "private-accessor",
                    "#private-accessor",
                    "static-accessor",
                    "instance-accessor",
                    "abstract-accessor",
                    "decorated-accessor",
                    "accessor",
                    "public-static-get",
                    "protected-static-get",
                    "private-static-get",
                    "#private-static-get",
                    "public-decorated-get",
                    "protected-decorated-get",
                    "private-decorated-get",
                    "public-instance-get",
                    "protected-instance-get",
                    "private-instance-get",
                    "#private-instance-get",
                    "public-abstract-get",
                    "protected-abstract-get",
                    "public-get",
                    "protected-get",
                    "private-get",
                    "#private-get",
                    "static-get",
                    "instance-get",
                    "abstract-get",
                    "decorated-get",
                    "get",
                    "public-static-set",
                    "protected-static-set",
                    "private-static-set",
                    "#private-static-set",
                    "public-decorated-set",
                    "protected-decorated-set",
                    "private-decorated-set",
                    "public-instance-set",
                    "protected-instance-set",
                    "private-instance-set",
                    "#private-instance-set",
                    "public-abstract-set",
                    "protected-abstract-set",
                    "public-set",
                    "protected-set",
                    "private-set",
                    "#private-set",
                    "static-set",
                    "instance-set",
                    "abstract-set",
                    "decorated-set",
                    "set",
                    "public-static-method",
                    "protected-static-method",
                    "private-static-method",
                    "#private-static-method",
                    "public-decorated-method",
                    "protected-decorated-method",
                    "private-decorated-method",
                    "public-instance-method",
                    "protected-instance-method",
                    "private-instance-method",
                    "#private-instance-method",
                    "public-abstract-method",
                    "protected-abstract-method",
                    "public-method",
                    "protected-method",
                    "private-method",
                    "#private-method",
                    "static-method",
                    "instance-method",
                    "abstract-method",
                    "decorated-method",
                    "method",
                ],
            },
        }],

        "rxjs/finnish": ["error", {
            functions: false,
            methods: false,

            names: {
                "^(canActivate|canActivateChild|canDeactivate|canLoad|intercept|resolve|validate)$": false,
            },

            parameters: true,
            properties: true,
            strict: false,

            types: {
                "^EventEmitter$": false,
            },

            variables: true,
        }],

        "no-unused-vars": "off",
        "unused-imports/no-unused-imports": "error",

        "unused-imports/no-unused-vars": ["warn", {
            vars: "all",
            varsIgnorePattern: "^_",
            args: "after-used",
            argsIgnorePattern: "^_",
        }],

        eqeqeq: ["error", "always"],
    },
}];