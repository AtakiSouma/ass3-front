import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const Forbidden = () => {
  const navigate = useNavigate();
  const link = localStorage.getItem('link');
  const linkObj = link ? JSON.parse(link) : {};

  const handleGoBack = () => {
    navigate(linkObj || '/account');
  };

  return (
    <Result
      status='403'
      title='403'
      subTitle='Bị chặn, bạn không có quyền truy cập chức năng này'
      extra={
        <Button type='primary' className='bg-blueAnt' onClick={handleGoBack}>
          Quay về
        </Button>
      }
    />
  );
};

export default Forbidden;
