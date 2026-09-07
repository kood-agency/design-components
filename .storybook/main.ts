import type { StorybookConfig } from "@storybook/react-vite";

// GitHub Pages 배포(storybook-pages.yml)는 ui-test를 제외하고 빌드한다.
// 로컬 dev는 모든 스토리(src/components/ui-test 포함)를 보여준다.
const isDeploy = process.env.STORYBOOK_DEPLOY === "true";

const config: StorybookConfig = {
  stories: isDeploy
    ? [
        "../src/components/ui/**/*.stories.@(ts|tsx)",
        "../src/components/examples/**/*.stories.@(ts|tsx)",
      ]
    : ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-themes"],
  framework: { name: "@storybook/react-vite", options: {} },
};
export default config;
