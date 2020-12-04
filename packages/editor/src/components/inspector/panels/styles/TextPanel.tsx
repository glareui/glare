import React, { memo } from "react";
import { IconButton, ButtonGroup, useTheme } from "@chakra-ui/react";

import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  ChevronLeft,
  Bold,
  Italic,
} from "@geist-ui/react-icons";

import { ComboboxOption } from "@reach/combobox";

import ColorsControl from "./../../controls/ColorsControl";
import FormControl from "./../../controls/FormControl";
import InputSuggestion from "./../../inputs/InputSuggestion";

import { useForm } from "./../../../../hooks/useForm";
import usePropsSelector from "./../../../../hooks/usePropsSelector";

const TextPanel = () => {
  const { setValue, setValueFromEvent } = useForm();
  const theme = useTheme();

  const fontWeight = usePropsSelector("fontWeight");
  const fontStyle = usePropsSelector("fontStyle");
  const textAlign = usePropsSelector("textAlign");
  const fontSize = usePropsSelector("fontSize");
  const letterSpacing = usePropsSelector("letterSpacing");
  const lineHeight = usePropsSelector("lineHeight");

  return (
    <>
      <FormControl label="Style">
        <IconButton
          mr={1}
          aria-label="bold"
          icon={<Bold />}
          onClick={() => {
            setValue("fontWeight", fontWeight ? null : "bold");
          }}
          size="xs"
          colorScheme={fontWeight ? "whatsapp" : "gray"}
          variant={fontWeight ? "solid" : "outline"}>
          Bold
        </IconButton>
        <IconButton
          aria-label="italic"
          icon={<Italic />}
          onClick={() => {
            setValue("fontStyle", fontStyle === "italic" ? null : "italic");
          }}
          size="xs"
          colorScheme={fontStyle === "italic" ? "whatsapp" : "gray"}
          variant={fontStyle === "italic" ? "solid" : "outline"}>
          Italic
        </IconButton>
      </FormControl>

      <FormControl label="Text align">
        <ButtonGroup size="xs" isAttached>
          <IconButton
            aria-label="bold"
            icon={<AlignLeft />}
            onClick={() => {
              setValue("textAlign", "left");
            }}
            colorScheme={textAlign === "left" ? "whatsapp" : "gray"}
            variant={textAlign === "left" ? "solid" : "outline"}
          />

          <IconButton
            aria-label="italic"
            icon={<AlignCenter />}
            onClick={() => {
              setValue("textAlign", "center");
            }}
            colorScheme={textAlign === "center" ? "whatsapp" : "gray"}
            variant={textAlign === "center" ? "solid" : "outline"}
          />

          <IconButton
            aria-label="italic"
            icon={<AlignRight />}
            onClick={() => {
              setValue("textAlign", "right");
            }}
            colorScheme={textAlign === "right" ? "whatsapp" : "gray"}
            variant={textAlign === "right" ? "solid" : "outline"}
          />

          <IconButton
            aria-label="italic"
            icon={<AlignJustify />}
            onClick={() => {
              setValue("textAlign", "justify");
            }}
            colorScheme={textAlign === "justify" ? "whatsapp" : "gray"}
            variant={textAlign === "justify" ? "solid" : "outline"}
          />
        </ButtonGroup>
      </FormControl>

      <FormControl label="Font size" htmlFor="fontSize">
        <InputSuggestion
          value={fontSize}
          handleChange={setValueFromEvent}
          name="fontSize">
          {Object.keys(theme.fontSizes).map((option) => (
            <ComboboxOption key={option} value={option} />
          ))}
        </InputSuggestion>
      </FormControl>

      <ColorsControl withFullColor enableHues name="color" label="Color" />

      <FormControl label="Line height" htmlFor="lineHeight">
        <InputSuggestion
          value={lineHeight}
          handleChange={setValueFromEvent}
          name="lineHeight">
          {Object.keys(theme.lineHeights).map((option) => (
            <ComboboxOption key={option} value={option} />
          ))}
        </InputSuggestion>
      </FormControl>

      <FormControl label="Letter spacing" htmlFor="letterSpacing">
        <InputSuggestion
          value={letterSpacing}
          handleChange={setValueFromEvent}
          name="letterSpacing">
          {Object.keys(theme.letterSpacings).map((option) => (
            <ComboboxOption key={option} value={option} />
          ))}
        </InputSuggestion>
      </FormControl>
    </>
  );
};

export default memo(TextPanel);
