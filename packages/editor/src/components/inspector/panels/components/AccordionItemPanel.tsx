import SwitchControl from './../../controls/SwitchControl'

const AccordionItemPanel = () => {
  return (
    <>
      <SwitchControl label="Is open" name="isOpen" />
      <SwitchControl label="Default open" name="defaultIsOpen" />
    </>
  )
}

export default AccordionItemPanel
