(self["webpackChunk_zzzzw_happy_ui"]=self["webpackChunk_zzzzw_happy_ui"]||[]).push([[935],{83585:function(n,e,t){"use strict";t.r(e),t.d(e,{default:function(){return b}});var i=t(68699),o=t(94043),a=t.n(o),l=t(94348),r="import React, { useEffect, useState } from 'react';\nimport FilterConditionSelect from '..';\nimport { IBaseField, IValue } from '..';\n\nexport default () => {\n  const [value, setValue] = useState<IValue>({\n    fieldId: 1,\n    conditionType: 'in',\n    values: ['\u5317\u4eac'],\n  });\n  const [dims, setDims] = useState<any[]>();\n\n  const fieldOptions: IBaseField[] = [\n    {\n      name: '\u57ce\u5e02',\n      value: 1,\n      fieldType: '1',\n    },\n    {\n      name: '\u4ef7\u683c',\n      value: 2,\n      fieldType: '2',\n    },\n  ];\n\n  useEffect(() => {\n    setTimeout(() => {\n      setDims(['\u5317\u4eac', '\u4e0a\u6d77']);\n    });\n  }, [value?.fieldId]);\n\n  const onChange = (value: IValue) => {\n    setValue(value);\n  };\n\n  return (\n    <FilterConditionSelect\n      value={value}\n      fieldOptions={fieldOptions}\n      onChange={onChange}\n      dimensions={dims}\n    />\n  );\n};",s="import React, { useState, useCallback, useEffect } from 'react';\nimport { Space, Select } from 'antd';\nimport { tagNumberConditionList, tagStringConditionList } from './config';\nimport FilterItem from './filters';\nimport './styles';\n\nconst Option = Select.Option;\n\nexport interface IBaseField {\n  name: string;\n  value: string | number;\n  fieldType: string;\n}\n\nexport interface IValue {\n  fieldId?: number | string;\n  conditionType?: string;\n  values?: Array<string | number>;\n}\n\ninterface FilterConditionSelectProps {\n  /**\n   * @description \u5b57\u6bb5\u9009\u62e9\u7ec4\u4ef6\u7684\u7c7b\u578b\uff0cselect\u8868\u793a\u4e0b\u62c9\u5217\u8868\uff0ctree-select\u8868\u793a\u6811\u5f62\u4e0b\u62c9\u5217\u8868\n   * @default select\n   */\n  fieldComponentType?: 'select' | 'tree-select';\n  /**\n   * @description \u5b57\u6bb5\u4e0b\u62c9\u5217\u8868\u6570\u636e\n   */\n  fieldOptions: IBaseField[];\n  /**\n   * @description \u9ed8\u8ba4\u503c\n   */\n  value?: IValue;\n  /**\n   * @description \u5b57\u6bb5\u7684\u7ef4\u5ea6\u503c\u5217\u8868\n   */\n  dimensions?: any[];\n  /**\n   * @description \u56de\u8c03\u51fd\u6570\n   */\n  onChange: (value: IValue) => void;\n}\n\nconst FilterConditionSelect: React.FC<FilterConditionSelectProps> = ({\n  value = {},\n  fieldOptions,\n  dimensions,\n  onChange,\n}) => {\n  const [fieldType, setFieldType] = useState<string>();\n  const [conditionType, setConditionType] = useState<string>();\n  const [values, setValues] = useState<any[]>([]);\n\n  /**\n   * \u521d\u59cb\u5316:\u7f16\u8f91\u65f6\u9700\u8981\u8bbe\u7f6etag\u3001conditionType\u3001values\n   */\n  useEffect(() => {\n    if (!value) return;\n    const fieldId = value.fieldId;\n    const field = fieldOptions.find((o: any) => o.value == fieldId);\n    setFieldType(field?.fieldType);\n    setConditionType(value.conditionType);\n    setValues(value.values || []);\n  }, [value, fieldOptions]);\n\n  /**\n   * \u5b57\u6bb5\u91cd\u65b0\u9009\u62e9\u540e\uff0c\u9700\u8981\u91cd\u7f6e\u7b5b\u9009\u6761\u4ef6\u548c\u503c\n   */\n  const onFieldSelect = useCallback(\n    (fieldId, field: any) => {\n      console.log(fieldId, field);\n      setFieldType(field.fieldType);\n      setConditionType(undefined);\n      setValues([]);\n      onChange({\n        fieldId,\n        conditionType: undefined,\n        values: [],\n      });\n    },\n    [setFieldType, setConditionType, setValues, onChange],\n  );\n\n  /**\n   * \u6761\u4ef6\u6539\u53d8\n   */\n  const onConditionChange = useCallback(\n    (conditionType: string) => {\n      let updateValues = values;\n      // between\u8981\u6e05\u7a7avalues\n      setConditionType(prev => {\n        if (prev === 'between') {\n          updateValues = [];\n        }\n        return conditionType;\n      });\n      onChange({\n        fieldId: value.fieldId,\n        conditionType,\n        values: updateValues,\n      });\n    },\n    [setConditionType, onChange, values, conditionType, value.fieldId],\n  );\n\n  /**\n   * \u7b5b\u9009\u503c\u6539\u53d8\n   */\n  const onValuesChange = useCallback(\n    (values: any) => {\n      setValues(values);\n      onChange({\n        fieldId: value.fieldId,\n        conditionType,\n        values,\n      });\n    },\n    [setValues, onChange, conditionType, value.fieldId],\n  );\n\n  /**\n   * \u6839\u636e\u5b57\u6bb5\u7c7b\u578b\u52a8\u6001\u83b7\u53d6\u6761\u4ef6\u5217\u8868\n   */\n  const getConditionOptions = useCallback(() => {\n    const conditions =\n      fieldType == '1' || fieldType == '3' ? tagStringConditionList : tagNumberConditionList;\n    return conditions.map(o => (\n      <Option value={o.value} key={o.value}>\n        {o.name}\n      </Option>\n    ));\n  }, [fieldType]);\n\n  return (\n    <Space>\n      <Select\n        className={'ui-filter-field-select'}\n        value={value?.fieldId}\n        placeholder={'\u8bf7\u9009\u62e9'}\n        onChange={onFieldSelect}\n      >\n        {fieldOptions.map(o => (\n          <Option key={o.value} value={o.value} fieldType={o.fieldType}>\n            {o.name}\n          </Option>\n        ))}\n      </Select>\n      {/*\u6761\u4ef6\u9009\u62e9*/}\n      {\n        <Select\n          className={'ui-filter-condition-select'}\n          value={conditionType}\n          onChange={onConditionChange}\n          placeholder={'\u8bf7\u9009\u62e9'}\n        >\n          {getConditionOptions()}\n        </Select>\n      }\n      {/*\u503c\u9009\u62e9*/}\n      {fieldType && conditionType && (\n        <FilterItem\n          dimensions={dimensions}\n          tagValueType={Number(fieldType)}\n          conditionType={conditionType}\n          values={values}\n          onChange={onValuesChange}\n        />\n      )}\n    </Space>\n  );\n};\n\nexport default FilterConditionSelect;",p="// \u7b5b\u9009\u6761\u4ef6\nexport const tagStringConditionList = [\n  { name: '\u5305\u542b', value: 'in' },\n  { name: '\u4e0d\u5305\u542b', value: 'not in' },\n];\n\nexport const tagNumberConditionList = [\n  { name: '\u5927\u4e8e', value: '>' },\n  { name: '\u5c0f\u4e8e', value: '<' },\n  { name: '\u7b49\u4e8e', value: '=' },\n  { name: '\u5927\u4e8e\u7b49\u4e8e', value: '>=' },\n  { name: '\u5c0f\u4e8e\u7b49\u4e8e', value: '<=' },\n  { name: '\u8303\u56f4', value: 'between' },\n];",u="import React from 'react';\nimport DateFilter from './DateFilter';\nimport SelectFilter from './SelectFilter';\nimport InputNumberFilter from './InputNumberFilter';\nimport TagSelectFilter from './TagSelectFilter';\nimport { FilterProps } from './types';\n\ninterface FilterItemProps {\n  disabled?: boolean;\n  dimensions?: any[];\n  tagValueType: number | string;\n  conditionType: string;\n  values: any[];\n  onChange: (values: any[]) => void;\n}\n\nexport default function FilterItem({\n  disabled = false,\n  dimensions,\n  tagValueType,\n  conditionType,\n  values,\n  onChange,\n}: FilterItemProps) {\n  let component = null;\n\n  const props: FilterProps = {\n    disabled,\n    dimensions,\n    conditionType,\n    values,\n    onChange,\n  };\n  switch (tagValueType) {\n    case 1:\n      component = <SelectFilter {...props} />;\n      break;\n    case 2:\n      component = <InputNumberFilter {...props} />;\n      break;\n    case 3:\n      component = <TagSelectFilter {...props} />;\n      break;\n    case 4:\n      component = <DateFilter {...props} />;\n      break;\n  }\n\n  return component;\n}",d="import React, { useCallback } from 'react';\nimport { DatePicker, Space } from 'antd';\nimport moment, { Moment } from 'moment';\nimport { FilterProps } from './types';\n\nexport default function DateFilter({ conditionType, values, onChange }: FilterProps) {\n  const getDate = useCallback((date: string): Moment | null => {\n    return date ? moment(date) : null;\n  }, []);\n  const disableDate = useCallback((current: Moment): boolean => {\n    return current && current > moment().endOf('day');\n  }, []);\n  if (conditionType === 'between') {\n    return (\n      <Space>\n        <DatePicker\n          className={'ui-filter-datepicker'}\n          placeholder={'\u8bf7\u9009\u62e9'}\n          value={getDate(values[0])}\n          disabledDate={disableDate}\n          showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}\n          onChange={(value, strValue) => onChange([strValue, values[1]])}\n        />\n        <DatePicker\n          className={'ui-filter-datepicker'}\n          placeholder={'\u8bf7\u9009\u62e9'}\n          value={getDate(values[1])}\n          disabledDate={disableDate}\n          showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}\n          onChange={(value, strValue) => onChange([values[0], strValue])}\n        />\n      </Space>\n    );\n  }\n  return (\n    <DatePicker\n      className={'ui-filter-datepicker'}\n      placeholder={'\u8bf7\u9009\u62e9'}\n      value={getDate(values[0])}\n      disabledDate={disableDate}\n      showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}\n      onChange={(value, strValue) => onChange([strValue])}\n    />\n  );\n}",c="import React from 'react';\nimport { Select } from 'antd';\nimport { FilterProps } from './types';\nconst Option = Select.Option;\n\nexport default function SelectFilter({ dimensions, values, onChange }: FilterProps) {\n  return (\n    <Select\n      className={'ui-filter-field-select'}\n      placeholder={'\u8bf7\u9009\u62e9'}\n      value={values}\n      mode={'multiple'}\n      maxTagCount={5}\n      optionLabelProp={'label'}\n      onChange={onChange}\n    >\n      {dimensions?.map((o: any) => (\n        <Option value={o} key={o}>\n          {o}\n        </Option>\n      ))}\n    </Select>\n  );\n}",m="import React from 'react';\nimport { Space, InputNumber } from 'antd';\nimport { FilterProps } from './types';\n\nexport default function InputNumberFilter({ conditionType, values, onChange }: FilterProps) {\n  if (conditionType === 'between') {\n    return (\n      <Space>\n        <InputNumber\n          className={'ui-filter-input-number'}\n          placeholder={'\u8bf7\u8f93\u5165'}\n          value={values[0]}\n          onChange={value => onChange([value, values[1]])}\n        />\n        <InputNumber\n          className={'ui-filter-input-number'}\n          placeholder={'\u8bf7\u8f93\u5165'}\n          value={values[1]}\n          onChange={value => onChange([values[0], value])}\n        />\n      </Space>\n    );\n  }\n  return (\n    <InputNumber placeholder={'\u8bf7\u8f93\u5165'} value={values[0]} onChange={value => onChange([value])} />\n  );\n}",f="import React from 'react';\nimport { Select } from 'antd';\nimport { FilterProps } from './types';\n\nexport default function TagSelectFilter({ values, onChange }: FilterProps) {\n  return (\n    <Select\n      className={'ui-filter-field-select'}\n      placeholder={'\u8bf7\u9009\u62e9'}\n      value={values}\n      mode={'tags'}\n      maxTagCount={5}\n      onChange={onChange}\n    ></Select>\n  );\n}",v="import './index.less';",g=".ui-filter-field-select {\n  min-width: 120px;\n  max-width: 200px;\n}\n\n.ui-filter-condition-select {\n  width: 100px;\n}\n\n.ui-filter-datepicker {\n  width: 180px;\n}\n\n.ui-filter-input-number {\n  min-width: 60px;\n}",y="import React from 'react';\nimport Alert from '../';\nimport '../style';\n\nexport default () => <Alert kind=\"warning\">\u8fd9\u662f\u4e00\u6761\u8b66\u544a\u63d0\u793a</Alert>;",h="import React from 'react';\nimport t from 'prop-types';\n\nexport interface AlertProps {\n  /**\n   * @description       Alert \u7684\u7c7b\u578b\n   * @default           'info'\n   */\n  kind?: 'info' | 'positive' | 'negative' | 'warning';\n}\n\nexport type KindMap = Record<Required<AlertProps>['kind'], string>;\n\nconst prefixCls = 'happy-alert';\n\nconst kinds: KindMap = {\n  info: '#5352ED',\n  positive: '#2ED573',\n  negative: '#FF4757',\n  warning: '#FFA502',\n};\n\nconst Alert: React.FC<AlertProps> = ({ children, kind = 'info', ...rest }) => (\n  <div\n    className={prefixCls}\n    style={{\n      background: kinds[kind],\n    }}\n    {...rest}\n  >\n    {children}\n  </div>\n);\n\nAlert.propTypes = {\n  kind: t.oneOf(['info', 'positive', 'negative', 'warning']),\n};\n\nexport default Alert;",C="import './index.less';",T="@popupPrefix: happy-alert;\n\n.@{popupPrefix} {\n  padding: 20px;\n  color: white;\n  background: white;\n  border-radius: 3px;\n}",b={"filterconditionselection-basic":{component:(0,l.dynamic)({loader:function(){var n=(0,i.Z)(a().mark((function n(){return a().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,Promise.all([t.e(315),t.e(669),t.e(975)]).then(t.bind(t,96659));case 2:return n.abrupt("return",n.sent.default);case 3:case"end":return n.stop()}}),n)})));function e(){return n.apply(this,arguments)}return e}()}),previewerProps:{sources:{_:{tsx:r},"index.tsx":{import:"..",content:s},"config.ts":{import:"./config",content:p},"filters/index.tsx":{import:"./filters",content:u},"DateFilter.tsx":{import:"./DateFilter",content:d},"SelectFilter.tsx":{import:"./SelectFilter",content:c},"InputNumberFilter.tsx":{import:"./InputNumberFilter",content:m},"TagSelectFilter.tsx":{import:"./TagSelectFilter",content:f},"styles/index.ts":{import:"./styles",content:v},"index.less":{import:"./index.less",content:g}},dependencies:{react:{version:">=16.9.0"},antd:{version:"4.17.3",css:"antd/dist/antd.css"},"react-dom":{version:">=16.9.0"},moment:{version:"2.29.1"}},componentName:"FilterConditionSelection",identifier:"filterconditionselection-basic"}},"alert-basic":{component:(0,l.dynamic)({loader:function(){var n=(0,i.Z)(a().mark((function n(){return a().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.e(899).then(t.bind(t,18555));case 2:return n.abrupt("return",n.sent.default);case 3:case"end":return n.stop()}}),n)})));function e(){return n.apply(this,arguments)}return e}()}),previewerProps:{sources:{_:{tsx:y},"index.tsx":{import:"../",content:h},"style/index.ts":{import:"../style",content:C},"index.less":{import:"./index.less",content:T}},dependencies:{react:{version:"16.14.0"},"prop-types":{version:"15.7.2"}},componentName:"alert",identifier:"alert-basic"}}}},74446:function(n,e,t){"use strict";t.r(e);var i=t(67294),o=t(96089);t(83585);e["default"]=n=>(i.useEffect((()=>{var e;null!==n&&void 0!==n&&null!==(e=n.location)&&void 0!==e&&e.hash&&o.AnchorLink.scrollToAnchor(decodeURIComponent(n.location.hash.slice(1)))}),[]),i.createElement(i.Fragment,null))},72022:function(n){"use strict";n.exports=JSON.parse('{"FilterConditionSelection":{"default":[{"identifier":"fieldComponentType","description":"\u5b57\u6bb5\u9009\u62e9\u7ec4\u4ef6\u7684\u7c7b\u578b\uff0cselect\u8868\u793a\u4e0b\u62c9\u5217\u8868\uff0ctree-select\u8868\u793a\u6811\u5f62\u4e0b\u62c9\u5217\u8868","type":"\\"select\\" | \\"tree-select\\"","default":"select"},{"identifier":"fieldOptions","description":"\u5b57\u6bb5\u4e0b\u62c9\u5217\u8868\u6570\u636e","type":"IBaseField[]","required":true},{"identifier":"value","description":"\u9ed8\u8ba4\u503c","type":"IValue","default":"{}"},{"identifier":"dimensions","description":"\u5b57\u6bb5\u7684\u7ef4\u5ea6\u503c\u5217\u8868","type":"any[]"},{"identifier":"onChange","description":"\u56de\u8c03\u51fd\u6570","type":"(value: IValue) => void","required":true}]},"alert":{"default":[{"identifier":"kind","description":"Alert \u7684\u7c7b\u578b","type":"\\"info\\" | \\"positive\\" | \\"negative\\" | \\"warning\\"","default":"info"}]}}')}}]);