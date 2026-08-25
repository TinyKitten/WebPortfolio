<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Built-in Commands vs Scripts

`vp <name>` runs a built-in command. `vp run <name>` runs a `package.json` script or a `vite.config.ts` task. Scripts cannot overwrite built-ins, so `vp dev` and `vp run dev` may do different things. Check `package.json` and `vite.config.ts` first, and run `vp run <name>` when the project defines a script or task with that name.

## Tool Versions

Run `vp toolchain` to show versions and relationships in the active Vite+
release. Add a tool name to select part of the graph. For example, run
`vp toolchain vite`. Use `--global` to ignore the local `vite-plus` package. Use
`vp why <package>` to show the package-manager dependency graph.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->

<!--
以下は VITE PLUS マーカーの外側なので `vp config` による再生成で消えません。
vite-plus 0.3.0 の生成テンプレートから省かれたが、有用なので手動で残している内容です。
記載内容は vite-plus 0.3.0 (`vp help` / 各コマンドの `--help`) で確認済み。
-->

## Vite+ Command Reference

`vp help` を実行すればコマンド一覧が出ますが、頻用するものをまとめておきます。
`vp <command> --help` で個別のヘルプが見られます。

### Start

- create - Create a new project from a template
- migrate - Migrate an existing project to Vite+
- config - Configure hooks and agent integration
- hooks - Manage the Git hook dispatcher
- staged - Run linters on staged files
- install (`i`) - Install dependencies

### Develop

- dev - Run the development server
- check - Run format, lint, and TypeScript type checks
- lint - Lint code
- fmt (`format`) - Format code
- test - Run tests

### Execute

- run - Run tasks
- exec - Execute a command from local `node_modules/.bin`
- dlx - Execute a package binary without installing it as a dependency
- cache - Manage the task cache

### Build

- build - Build for production
- pack - Build libraries
- preview - Preview production build

### Manage Dependencies

Vite+ automatically detects and wraps the underlying package manager such as npm, pnpm, or Yarn through the `packageManager` field in `package.json` or package manager-specific lockfiles.

- add - Add packages to dependencies
- remove (`rm`, `un`, `uninstall`) - Remove packages from dependencies
- update (`up`) - Update packages to latest versions
- dedupe - Deduplicate dependencies
- outdated - Check for outdated packages
- why (`explain`) - Show why a package is installed
- info (`view`, `show`) - View package information from the registry
- link (`ln`) / unlink - Manage local package links
- pm - Forward a command to the package manager

### Inspect / Maintain

- toolchain - Show Vite+ tool versions and relationships

`env` (Node.js のバージョン管理) と `upgrade` (`vp` 自体の更新) はグローバルの `vp` CLI 専用で、
`node_modules/.bin/vp` 経由では実行できません。

## Common Pitfalls

- **Using the package manager directly:** Do not use npm, pnpm, or Yarn directly. Vite+ can handle all package manager operations.
- **Always use Vite+ commands to run tools:** Don't attempt to run `vp vitest` or `vp oxlint`. They do not exist. Use `vp test` and `vp lint` instead.
- **Do not install Vitest, Oxlint, Oxfmt, or tsdown directly:** Vite+ wraps these tools. They must not be installed directly. You cannot upgrade these tools by installing their latest versions. Always use Vite+ commands.
- **Use Vite+ wrappers for one-off binaries:** Use `vp dlx` instead of package-manager-specific `dlx`/`npx` commands.
- **Import JavaScript modules from `vite-plus`:** Instead of importing from `vite` or `vitest`, all modules should be imported from the project's `vite-plus` dependency. For example, `import { defineConfig } from 'vite-plus';` or `import { expect, test, vi } from 'vite-plus/test';`. You must not install `vitest` to import test utilities.
- **Type-Aware Linting:** There is no need to install `oxlint-tsgolint`, `vp lint --type-aware` works out of the box.
