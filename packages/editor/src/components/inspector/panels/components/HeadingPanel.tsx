import { memo } from 'react';
import { Select } from '@chakra-ui/react'
import { useForm } from './../../../../hooks/useForm'
import FormControl from './../../controls/FormControl'
import ChildrenControl from './../../controls/ChildrenControl'
import usePropsSelector from './../../../../hooks/usePropsSelector'
import SwitchControl from './../../controls/SwitchControl'

const HeadingPanel = () => {
  const { setValueFromEvent } = useForm()

  const size = usePropsSelector('size')
  const as = usePropsSelector('as')

  return (
    <>
      <ChildrenControl />
      <FormControl label="Size" htmlFor="size">
        <Select
          name="size"
          id="size"
          size="sm"
          value={size}
          onChange={setValueFromEvent}
        >
          <option>xs</option>
          <option>sm</option>
          <option>md</option>
          <option>lg</option>
          <option>xl</option>
          <option>2xl</option>
        </Select>
      </FormControl>
      <FormControl label="As">
        <Select
          size="sm"
          value={as || ''}
          onChange={setValueFromEvent}
          name="as"
        >
          <option>h1</option>
          <option>h2</option>
          <option>h3</option>
          <option>h4</option>
          <option>h5</option>
          <option>h6</option>
        </Select>
      </FormControl>

      <SwitchControl label="Truncated" name="isTruncated" />
    </>
  )
}

export default memo(HeadingPanel)
