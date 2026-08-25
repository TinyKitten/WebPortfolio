import { defineConfig } from 'vite-plus';

// functions/ はFirebase Functions用の独立したnpmプロジェクトで、
// 独自のeslint(quotes: double)とtsconfigを持つ。ルートのtsconfig.jsonも
// excludeしているため、fmt/lintの対象からも外す。
const ignorePatterns = ['functions/**'];

export default defineConfig({
  fmt: { singleQuote: true, ignorePatterns },
  staged: {
    '*': 'vp check --fix',
  },
  lint: { options: { typeAware: true, typeCheck: true }, ignorePatterns },
});
