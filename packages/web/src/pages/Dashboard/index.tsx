import React, { useCallback } from 'react';
import { Breadcrumb, Button, Layout, notification, PageHeader } from 'antd';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import ProductTable from '../../Components/ProductTable';

const { Content, Footer } = Layout;

const Dashboard: React.FC = () => {
  const history = useHistory();

  const { user, signOut } = useAuth();

  const handleSignOut = useCallback(() => {
    signOut();
    history.push('/signin');
    notification.info({
      message: 'User disconnected!',
    });
  }, [history, signOut]);

  return (
    <>
      <Layout>
        <PageHeader
          title="PetStore"
          subTitle={`Welcome ${user.name}`}
          extra={[
            <Button type="ghost" onClick={handleSignOut} key="1">
              Sign Out
            </Button>,
          ]}
        />
        <Content
          style={{
            margin: '0 auto',
            padding: '0 24px',
            maxWidth: '1200px',
            width: '100%',
          }}
        >
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Products</Breadcrumb.Item>
          </Breadcrumb>
          <ProductTable />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          PetStore © 2020 Created by @dbarjs
        </Footer>
      </Layout>
    </>
  );
};

export default Dashboard;
