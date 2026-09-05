import type { Preview } from "@storybook/react-vite";
import { withThemeByClassName } from "@storybook/addon-themes";
import "../src/styles/globals.css";

export const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: { dark: "dark", light: "light" },
      defaultTheme: "dark",
    }),
    (Story, ctx) => {
      const font = ctx.globals.font ?? "pretendard";
      const themes = { dark: "dark", light: "light" };
      const theme = ctx.globals.theme && ctx.globals.theme in themes ? ctx.globals.theme : "dark";
      const html = document.documentElement;
      html.classList.remove("dark", "light");
      html.classList.add(themes[theme]);
      html.dataset.font = font;
      return <Story />;
    },
  ],
  globalTypes: {
    font: {
      description: "Sans preset",
      toolbar: {
        title: "Font",
        items: ["pretendard", "wanted"],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { font: "pretendard" },
  parameters: {
    controls: { expanded: true },
    backgrounds: { disable: true },
    layout: "centered",
  },
};

export default preview;
