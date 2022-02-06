import {FC} from "react";

import OperatorViewFullLayout from "@platform/components/layout/OperatorViewFullLayout";
import OperatorViewStandardLayout from "@platform/components/layout/OperatorViewStandardLayout";
import OperatorViewNoopLayout from "./OperatorViewNoopLayout";

export {default as Dashboard} from "./Dashboard";
export {default as OperatorViewFullLayout} from "./OperatorViewFullLayout";
export {default as OperatorViewStandardLayout} from "./OperatorViewStandardLayout";
export {default as OperatorViewNoopLayout} from "./OperatorViewNoopLayout";

export type OperatorLayout =
  typeof OperatorViewFullLayout |
  typeof OperatorViewStandardLayout |
  typeof OperatorViewNoopLayout;

export const drawerWidthExpanded = 280;
export const drawerWidthCollapsed = 72;

export const blocksRegionComponentDefinitions: {
  [region: string]: BlockComponentDefinition[]
} = {};

export type BlockComponentDefinition = {
  Component: FC,
  region: string,
  priority: number
}

type RegisterBlockOptions = {
  Component: FC,
  region: string,
  priority: number
}

export function registerBlock(
  {
    Component,
    region,
    priority
  }: RegisterBlockOptions) {

  if (!blocksRegionComponentDefinitions[region]) {
    blocksRegionComponentDefinitions[region] = []
  }

  blocksRegionComponentDefinitions[region].push({
    Component,
    region,
    priority
  })
}
