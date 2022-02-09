import {FC} from "react";

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
