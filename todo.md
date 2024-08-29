basic-form

- submit reset button -> control byfooterAlign: left | right | center

function getPlaceholder(formItem: FormSchema) {

<!-- 这部分被去掉了，因为 element没有range-picker  之后要看下怎么去做 -->

if (formItem.component === 'range-picker') {
return ['开始时间', '结束时间']
}
return getMessage(formItem)
}

function addFormItemTimeFormat(formItem: FormSchema) {

<!-- 这里也是和上面一样，去掉了 因为antd有reange-cpiker element没有 -->

if (formItem.component === 'range-picker') {
return merge(
{
componentProps: {
format: formItem?.componentProps?.format || 'YYYY-MM-DD',
valueFormat: formItem?.componentProps?.valueFormat || 'YYYY-MM-DD',
},
},
formItem
)
}

return formItem
}

basic-table里的下面这3个被我删了，看起来好像写的很复杂，但其实只是表格的透传
没有必要做到 一个个过滤，之后透传v-for即可

/\*\*

- 表格单元格的插槽
  \*/
  const cellSlots = filterSlots(slots, getTableCellSlotName())
  /\*\*
- 表格单元格表头的插槽
  \*/
  const headerSlots = filterSlots(slots, getTableHeaderSlotName())
  /\*\*
- 表单单项的插槽
  \*/
  const fieldSlots = filterSlots(slots, getFieldSlotName())
