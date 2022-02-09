import {useMemo} from "react";
import {
  BlockComponentDefinition,
  blocksRegionComponentDefinitions
} from "../layout";

type BlocksRegionsHookConfig = {
  region: string
}

const ascendingComparator = (a: BlockComponentDefinition, b: BlockComponentDefinition) =>
  (a.priority || 0) - (b.priority || 0);

const useBlocksRegions = ({region}: BlocksRegionsHookConfig) =>
  useMemo(() =>
      blocksRegionComponentDefinitions[region]?.sort(ascendingComparator) || [],
    [region]);

export default useBlocksRegions;
