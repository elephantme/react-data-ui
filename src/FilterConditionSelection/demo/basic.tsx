import React, { useEffect, useState } from 'react';
import FilterConditionSelect from '..';
import { IBaseField, IValue } from '..';

export default () => {
  const [value, setValue] = useState<IValue>({
    fieldId: 1,
    conditionType: 'in',
    values: ['北京'],
  });
  const [dims, setDims] = useState<any[]>();

  const fieldOptions: IBaseField[] = [
    {
      name: '城市',
      value: 1,
      fieldType: '1',
    },
    {
      name: '价格',
      value: 2,
      fieldType: '2',
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setDims(['北京', '上海']);
    });
  }, [value?.fieldId]);

  const onChange = (value: IValue) => {
    setValue(value);
  };

  return (
    <FilterConditionSelect
      value={value}
      fieldOptions={fieldOptions}
      onChange={onChange}
      dimensions={dims}
    />
  );
};
