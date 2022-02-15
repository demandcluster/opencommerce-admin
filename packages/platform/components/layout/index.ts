import OperatorViewFullLayout from "./OperatorViewFullLayout";
import OperatorViewStandardLayout from "./OperatorViewStandardLayout";
import OperatorViewNoopLayout from "./OperatorViewNoopLayout";

export {default as OperatorViewStandardLayout} from "./OperatorViewStandardLayout";
export {default as OperatorViewNoopLayout} from "./OperatorViewNoopLayout";

export type OperatorLayout =
  typeof OperatorViewFullLayout |
  typeof OperatorViewStandardLayout |
  typeof OperatorViewNoopLayout;

export const sidebarWidthExpanded = 280;
export const sidebarWidthCollapsed = 72;

export const detailDrawerWidth = 480;
