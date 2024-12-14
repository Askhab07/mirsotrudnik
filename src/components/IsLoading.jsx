import { Spin } from 'antd';
import React from 'react';

const IsLoading = () => {
  return (
    <div className="min-w-full min-h-screen relative z-10 flex justify-center items-center gap-3 bg-white">
      <Spin size='large' />
    </div>
  );
};

export default IsLoading;
