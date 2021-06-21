import { InitFile } from "../interfaces";
export declare const eslintConfig = "module.exports = {\n    root: true,\n    parser: \"@typescript-eslint/parser\",\n    plugins: [\n      \"@typescript-eslint\",\n    ],\n    extends: [\n      \"eslint:recommended\",\n      \"plugin:@typescript-eslint/eslint-recommended\",\n      \"plugin:@typescript-eslint/recommended\",\n    ],\n    parserOptions: {\n      ecmaVersion: 2020,\n      sourceType: \"module\",\n      ecmaFeatures: {}\n    },\n  \n    // === General rules =========================================================\n  \n    rules: {\n      // Omitted semicolons are hugely popular, yet within the compiler it makes\n      // sense to be better safe than sorry.\n      \"semi\": \"error\",\n  \n      // Our code bases uses 2 spaces for indentation, and we enforce it here so\n      // files don't mix spaces, tabs or different indentation levels.\n      \"indent\": [\"error\", 2, {\n        \"SwitchCase\": 1,\n        \"VariableDeclarator\": \"first\",\n        \"offsetTernaryExpressions\": true,\n        \"ignoredNodes\": [ // FIXME: something's odd here\n          \"ConditionalExpression > *\",\n          \"ConditionalExpression > * > *\",\n          \"ConditionalExpression > * > * > *\"\n        ]\n      }],\n  \n      // This is mostly visual style, making comments look uniform.\n      \"spaced-comment\": [\"error\", \"always\", {\n        \"markers\": [\"/\"],   // triple-slash\n        \"exceptions\": [\"/\"] // all slashes\n      }],\n  \n      // This tends to be annoying as it encourages developers to make everything\n      // that is never reassigned a 'const', sometimes semantically incorrect so,\n      // typically leading to huge diffs in follow-up PRs modifying affected code.\n      \"prefer-const\": \"off\",\n  \n      // It is perfectly fine to declare top-level variables with `var`, yet this\n      // rule doesn't provide configuration options that would help.\n      \"no-var\": \"off\",\n  \n      // Quite often, dealing with multiple related cases at once or otherwise\n      // falling through is exactly the point of using a switch.\n      \"no-fallthrough\": \"off\",\n  \n      // Typical false-positives here are `do { ... } while (true)` statements or\n      // similar, but the only option provided here is not checking any loops.\n      \"no-constant-condition\": [\"error\", { checkLoops: false }],\n  \n      // Functions are nested in blocks occasionally, and there haven't been any\n      // problems with this so far, so turning the check off.\n      \"no-inner-declarations\": \"off\",\n  \n      // Quite common in scenarios where an iteration starts at `current = this`.\n      \"@typescript-eslint/no-this-alias\": \"off\",\n  \n      // Disabled here, but enabled again for JavaScript files.\n      \"no-unused-vars\": \"off\",\n  \n      // Disabled here, but enabled again for TypeScript files.\n      \"@typescript-eslint/no-unused-vars\": \"off\",\n  \n      // Allow emptry functions for some of our base classes\n      \"@typescript-eslint/no-empty-function\": \"off\"\n    },\n    overrides: [\n  \n      // === TypeScript rules ====================================================\n  \n      {\n        files: [\n          \"**/*.ts\"\n        ],\n        rules: {\n          // Enforcing to remove function parameters on stubs makes code less\n          // maintainable, so we instead allow unused function parameters.\n          \"@typescript-eslint/no-unused-vars\": [\n            \"warn\", {\n              \"vars\": \"local\",\n              \"varsIgnorePattern\": \"^_|^[A-Z](?:From|To)?$\", // ignore type params\n              \"args\": \"none\",\n              \"ignoreRestSiblings\": false\n            }\n          ],\n        }\n      },\n  \n      // === AssemblyScript rules (extends TypeScript rules) ===============\n  \n      {\n        files: [\n          \"**/assembly/**/*.ts\"\n        ],\n        rules: {\n          // Namespaces are quite useful in AssemblyScript\n          \"@typescript-eslint/no-namespace\": \"off\",\n  \n          // There is actually codegen difference here\n          \"@typescript-eslint/no-array-constructor\": \"off\",\n  \n          // Sometimes it can't be avoided to add a @ts-ignore\n          \"@typescript-eslint/ban-ts-comment\": \"off\",\n  \n          // Utilized to achieve portability in some cases\n          \"@typescript-eslint/no-non-null-assertion\": \"off\",\n\n          \"no-multiple-empty-lines\": \"warn\",\n          \"no-new-object\": \"error\",\n          \"no-tabs\": \"warn\",\n          \"no-trailing-spaces\": \"warn\",\n          \"no-whitespace-before-property\": \"warn\",\n          \"object-curly-newline\": \"warn\",\n          \"semi\": \"warn\",\n          \"sort-vars\": \"warn\",\n          \"quotes\": \"warn\",\n          \"space-in-parens\": \"warn\",\n          \"space-infix-ops\": \"warn\"\n        }\n      },\n  \n      // === AssemblyScript Definition rules (extends TypeScript rules) ================\n  \n      {\n        files: [\n          \"**/assembly/**/*.d.ts\"\n        ],\n        rules: {\n          // Often required to achieve compatibility with TypeScript\n          \"@typescript-eslint/no-explicit-any\": \"off\",\n  \n          // Interfaces can be stubs here, i.e. not yet fully implemented\n          \"@typescript-eslint/no-empty-interface\": \"off\",\n  \n          // Definitions make use of `object` to model rather unusual constraints\n          \"@typescript-eslint/ban-types\": \"off\"\n        }\n      },\n  \n      \n  \n      // === AssemblyScript Test rules (extends TypeScript rules) ===============================\n  \n      {\n        files: [\n          \"**/assembly/__tests__/**/*.ts\"\n        ],\n        rules: {\n          // Tests typically include unusual code patterns on purpose. This is\n          // very likely not an extensive list, but covers what's there so far.\n          \"no-empty\": \"off\",\n          \"no-cond-assign\": \"off\",\n          \"no-compare-neg-zero\": \"off\",\n          \"no-inner-declarations\": \"off\",\n          \"no-constant-condition\": \"off\",\n          \"use-isnan\": \"off\",\n          \"@typescript-eslint/no-namespace\": \"off\",\n          \"@typescript-eslint/no-unused-vars\": \"off\",\n          \"@typescript-eslint/no-empty-function\": \"off\",\n          \"@typescript-eslint/no-non-null-assertion\": \"off\",\n          \"@typescript-eslint/no-extra-semi\": \"off\",\n          \"@typescript-eslint/no-inferrable-types\": \"off\",\n          \"@typescript-eslint/ban-types\": \"off\",\n          \"@typescript-eslint/triple-slash-reference\": \"off\",\n          \"@typescript-eslint/ban-ts-comment\": \"off\",\n          \"@typescript-eslint/no-extra-non-null-assertion\": \"off\",\n          \"@typescript-eslint/no-empty-interface\": \"off\"\n        }\n      },\n    ]\n  };\n";
export declare class EslintConfigFile extends InitFile {
    path: string;
    description: string;
    updateOldContent: null;
    getContent(): string;
}
