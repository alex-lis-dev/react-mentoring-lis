import Search from "./Search";
import { fn } from "@storybook/test";

const meta = {
  component: Search,
  args: {
    initialQuery: null,
    placeholder: 'What do you want?',
    onSearch: fn(),
  },
};

export default meta;

export const Default = {};
