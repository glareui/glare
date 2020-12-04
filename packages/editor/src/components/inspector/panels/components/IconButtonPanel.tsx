import React, { memo } from 'react'
import ColorsControl from './../../controls/ColorsControl'
import VariantsControl from './../../controls/VariantsControl'
import SizeControl from './../../controls/SizeControl'
import usePropsSelector from './../../../../hooks/usePropsSelector'
import SwitchControl from './../../controls/SwitchControl'
import IconControl from './../../controls/IconControl'

const IconButtonPanel = () => {
  const size = usePropsSelector('size')
  const variant = usePropsSelector('variant')

  return (
    <>
      <IconControl name="icon" label="Icon" />
      <SizeControl name="size" label="Size" value={size} />
      <ColorsControl label="Color" name="colorScheme" />
      <SwitchControl label="Loading" name="isLoading" />
      <SwitchControl label="Round" name="isRound" />
      <VariantsControl label="Variant" name="variant" value={variant} />
    </>
  )
}

export default memo(IconButtonPanel)
