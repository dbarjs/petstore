import React from 'react';
import { Form, Input, InputNumber } from 'antd';

interface Product {
  key: string;
  id: string;
  name: string;
  description: string;
  category: string;
  created_at: Date;
  updated_at: Date;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: string;
  inputType: 'number' | 'text';
  record: Product;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputType === 'number' ? <InputNumber /> : <Input />}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;
