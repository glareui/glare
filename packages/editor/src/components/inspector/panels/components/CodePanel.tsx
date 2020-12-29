import { memo } from 'react';
import ColorsControl from './../../controls/ColorsControl'
import ChildrenControl from './../../controls/ChildrenControl'

const CodePanel = () => {
  return (
    <>
      <ChildrenControl />
      <ColorsControl label="Color Scheme" name="colorScheme" />
    </>
  )
}

export default memo(CodePanel)
