import React, { useRef, useEffect, KeyboardEvent } from "react";
import { Input } from "@chakra-ui/react";

import { useForm } from "./../../../hooks/useForm";
import usePropsSelector from "./../../../hooks/usePropsSelector";
import FormControl from "./FormControl";

import { useApp } from "./../../../store/app"; // FIXME

const ChildrenControl: React.FC = () => {

  const textInput = useRef<HTMLInputElement>(null);

  const focusInput = useApp((state) => state.inputTextFocused)
  const [toggleInputText] = useApp((state) => [state.toggleInputText])

  const { setValueFromEvent } = useForm();
  const children = usePropsSelector("children");
  const onKeyUp = (event: KeyboardEvent) => {
    if (event.keyCode === 13 && textInput.current) {
      textInput.current.blur();
    }
  };
  useEffect(() => {
    if (focusInput && textInput.current) {
      textInput.current.focus();
    } else if (focusInput === false && textInput.current) {
      textInput.current.blur();
    }
  }, [focusInput]);

  return (
    <FormControl htmlFor="children" label="Text">
      <Input
        id="children"
        name="children"
        size="sm"
        value={children}
        type="text"
        onChange={setValueFromEvent}
        ref={textInput}
        onKeyUp={onKeyUp}
        onBlur={() => {
          dispatch.app.toggleInputText(false);
        }}
      />
    </FormControl>
  );
};

export default ChildrenControl;
