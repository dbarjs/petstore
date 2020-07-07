import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Form,
  Input,
  Layout,
  notification,
  Popconfirm,
  Space,
  Table,
} from 'antd';

import './styles.less';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import EditableCell from '../EditableCell';

const { Content } = Layout;

interface Product {
  key: string;
  id: string;
  name: string;
  description: string;
  category: string;
  created_at: Date;
  updated_at: Date;
}

const ProductTable: React.FC = () => {
  const { token } = useAuth();
  const [form] = Form.useForm();
  const [newProductForm] = Form.useForm();
  const [products, setProducts] = useState<Omit<Product, 'key'>[]>([]);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record: Product): boolean => record.key === editingKey;

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const { data } = await api.get('products/', {
        params: {
          per_page: 100,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(
        data.products.map((product: Product) => ({
          ...product,
          created_at: new Date(product.created_at),
          updated_at: new Date(product.updated_at),
        })),
      );
    }

    loadTransactions();
  }, [token]);

  const handleAdd = useCallback(
    async values => {
      const { data: product } = await api.post('products/', values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts([product, ...products]);
      notification.success({
        message: 'Product created!',
        description: 'You can now see the product in the table.',
      });
    },
    [products, token],
  );

  const handleSave = useCallback(
    async (key: React.Key) => {
      try {
        const productData = (await form.validateFields()) as Product;
        const newProducts = [...products];

        const index = products.findIndex(product => key === product.id);
        if (index > -1) {
          await api.put(
            `products/${key}`,
            {
              ...productData,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          const product = newProducts[index];
          newProducts.splice(index, 1, {
            ...product,
            ...productData,
          });
          setProducts(newProducts);
          setEditingKey('');
          notification.success({
            message: 'Product updated!',
            description: 'The product information has been updated.',
          });
        }
      } catch (errInfo) {
        notification.error({
          message: 'Error!',
          description: 'An error occurred while trying to update the product.',
        });
      }
    },
    [form, products, token],
  );

  const handleRemove = useCallback(
    async (key: React.Key) => {
      try {
        const index = products.findIndex(product => key === product.id);

        if (index > -1) {
          await api.delete(`products/${key}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const newProducts = [...products];
          newProducts.splice(index, 1);
          setProducts(newProducts);
          notification.success({
            message: 'Product removed!',
            description:
              'The selected product has been deleted from the database.',
          });
        }
      } catch (errInfo) {
        notification.error({
          message: 'Error!',
          description: 'An error occurred while trying to remove the product.',
        });
      }
    },
    [products, token],
  );

  const handleEdit = useCallback(
    (record: Product) => {
      form.setFieldsValue({ ...record });
      setEditingKey(record.key);
    },
    [form],
  );

  const handleCancel = useCallback(() => {
    setEditingKey('');
  }, []);

  const actionColumn: React.FC = (_: any, record: Product) => {
    const editable = isEditing(record);

    return editable ? (
      <span>
        <Button
          onClick={() => handleSave(record.key)}
          style={{ marginRight: 8 }}
        >
          Save
        </Button>
        <Popconfirm title="Sure to cancel?" onConfirm={handleCancel}>
          <Button>Cancel</Button>
        </Popconfirm>
      </span>
    ) : (
      <>
        <Space>
          <Button
            disabled={editingKey !== ''}
            onClick={(): void => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure delete this product?"
            onConfirm={(): Promise<void> => handleRemove(record.key)}
          >
            <Button danger disabled={editingKey !== ''}>
              Remove
            </Button>
          </Popconfirm>
        </Space>
      </>
    );
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      editable: true,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      editable: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      editable: true,
    },
    {
      title: 'Qty',
      dataIndex: 'quantity',
      editable: true,
      dataType: 'number',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      editable: true,
      dataType: 'number',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: actionColumn,
    },
  ];

  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Product) => ({
        record,
        inputType: col.dataType || 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Content>
      <Form
        form={newProductForm}
        name="newProductForm"
        layout="inline"
        style={{ marginBottom: 16 }}
        onFinish={handleAdd}
      >
        <Form.Item
          name="name"
          rules={[
            { required: true, message: 'Please input the product name.' },
          ]}
        >
          <Input placeholder="Product name" />
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !newProductForm.isFieldsTouched(true) ||
                !!newProductForm
                  .getFieldsError()
                  .filter(({ errors }) => errors.length).length
              }
            >
              Add new product
            </Button>
          )}
        </Form.Item>
      </Form>
      <Form form={form} component={false}>
        <Table
          bordered
          columns={mergedColumns}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          dataSource={products.map(product => ({
            ...product,
            key: product.id,
          }))}
          pagination={{ pageSize: 10 }}
          rowClassName={(): string => 'editable-row'}
          scroll={{ x: 'max-content' }}
        />
      </Form>
    </Content>
  );
};

export default ProductTable;
