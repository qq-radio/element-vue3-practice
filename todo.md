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
