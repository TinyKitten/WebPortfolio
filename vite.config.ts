import { defineConfig } from 'vite-plus';

export default defineConfig({
  fmt: { singleQuote: true },
  staged: {
    '*': 'vp check --fix',
  },
  lint: { options: { typeAware: true, typeCheck: true } },
});
