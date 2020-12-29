import { MenuItem, Box } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
// import { saveAsJSON } from "~utils/import"; FIXME - @glare/storage

import { useTree } from "@glare/tree";

const ExportMenuItem = () => {
  const components = useTree((state) => state.components);
  return (
    <MenuItem onClick={() => null}>
      <Box mr={2} as={CheckIcon} />
      Save components
    </MenuItem>
  );
};

export default ExportMenuItem;
