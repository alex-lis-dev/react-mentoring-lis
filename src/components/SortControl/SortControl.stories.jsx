import sortOptions from "../../helpers/sortOptions";
import SortControl from "./SortControl";
import { fn } from "@storybook/test";

const meta = {
  component: SortControl,
  args: {
    currentSelection: sortOptions[0],
    onSortChange: fn(),
  },
};

export default meta;

export const Default = {};
