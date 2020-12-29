import { MenuItem, Box } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
// import { loadFromJSON } from "~utils/import"; # FIXME @glare/storage
import { useTree } from "@glare/tree";

const ImportMenuItem = () => {
  const components = useTree((state) => state.components);
  return (
    <MenuItem
      onClick={async () => {
        // const components = await loadFromJSON();
        // reset(components);
      }}>
      <Box mr={2} as={CheckIcon} />
      Import components
    </MenuItem>
  );
};

export default ImportMenuItem;
