import OperatorViewFullLayout from "./OperatorViewFullLayout";
import OperatorViewStandardLayout from "./OperatorViewStandardLayout";
import OperatorViewNoopLayout from "./OperatorViewNoopLayout";
import OperatorViewWideLayout from "./OperatorViewWideLayout";

export {default as OperatorViewStandardLayout} from "./OperatorViewStandardLayout";
export {default as OperatorViewNoopLayout} from "./OperatorViewNoopLayout";

export type OperatorLayout =
  typeof OperatorViewFullLayout |
  typeof OperatorViewStandardLayout |
  typeof OperatorViewNoopLayout |
  typeof OperatorViewWideLayout;

export const sidebarWidthExpanded = 280;
export const sidebarWidthCollapsed = 72;

export const detailDrawerWidth = 480;
