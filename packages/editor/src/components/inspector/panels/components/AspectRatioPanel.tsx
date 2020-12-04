import React from 'react'
import NumberControl from './../../controls/NumberControl'

const AspectRatioPanel = () => {
  return (
    <>
      <NumberControl label="Ratio" name="ratio" step={0.01} />
    </>
  )
}

export default AspectRatioPanel
