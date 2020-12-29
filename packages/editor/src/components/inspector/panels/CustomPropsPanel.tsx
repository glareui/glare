import { memo, useState, FormEvent, ChangeEvent, useRef } from "react";

import {
  IconButton,
  Flex,
  Box,
  SimpleGrid,
  InputGroup,
  InputRightElement,
  Input,
  ButtonGroup,
} from "@chakra-ui/react";
import { EditIcon, SmallCloseIcon } from "@chakra-ui/icons";

import { useInspectorState } from "../../../contexts/InspectorContext";

import { useForm } from "./../../../hooks/useForm";
import { useTree } from "@glare/tree";

const SEPARATOR = "=";

const CustomPropsPanel = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const activePropsRef = useInspectorState();

  const selectedId = useTree((state) => state.selectedId);
  const component = useTree((state) => state.components[selectedId]);
  const [deleteProps] = useTree((state) => [state.deleteProps]);

  const { props, id } = component;
  const { setValue } = useForm();

  const [quickProps, setQuickProps] = useState("");
  const [hasError, setError] = useState(false);

  const onDelete = (propsName: string) => {
    deleteProps({
      id,
      name: propsName,
    });
  };

  const activeProps = activePropsRef || [];
  const customProps = Object.keys(props).filter(
    (propsName) => !activeProps.includes(propsName)
  );

  return (
    <>
      <form
        onSubmit={(event: FormEvent) => {
          event.preventDefault();

          const [name, value] = quickProps.split(SEPARATOR);

          if (name && value) {
            setValue(name, value);
            setQuickProps("");
            setError(false);
          } else {
            setError(true);
          }
        }}>
        <InputGroup mb={3} size="sm">
          <InputRightElement
            children={<Box as={SmallCloseIcon} color="gray.300" />}
          />
          <Input
            ref={inputRef}
            isInvalid={hasError}
            value={quickProps}
            placeholder={`props${SEPARATOR}value`}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setQuickProps(event.target.value)
            }
          />
        </InputGroup>
      </form>

      {customProps.map((propsName, i) => (
        <Flex
          key={propsName}
          alignItems="center"
          px={2}
          bg={i % 2 === 0 ? "white" : "gray.50"}
          fontSize="xs"
          justifyContent="space-between">
          <SimpleGrid width="100%" columns={2} spacing={1}>
            <Box fontWeight="bold">{propsName}</Box>
            <Box>{props[propsName]}</Box>
          </SimpleGrid>

          <ButtonGroup display="flex" size="xs" isAttached>
            <IconButton
              onClick={() => {
                setQuickProps(`${propsName}=`);
                if (inputRef.current) {
                  inputRef.current.focus();
                }
              }}
              variant="ghost"
              size="xs"
              aria-label="edit"
              icon={<EditIcon path="" />}
            />
            <IconButton
              onClick={() => onDelete(propsName)}
              variant="ghost"
              size="xs"
              aria-label="delete"
              icon={<SmallCloseIcon path="" />}
            />
          </ButtonGroup>
        </Flex>
      ))}
    </>
  );
};

export default memo(CustomPropsPanel);
