import Toast from 'react-bootstrap/Toast';
import useAuth from '../../hooks/useAuth';

export default function ToastComponent() {
  const {isAuth}= useAuth();
  return (
    <Toast className='category__toast' style={{ backgroundColor: '#fae2bf' }}>     
      <Toast.Body>{isAuth? 'Товар добавлен в корзину': "Зарегистрируйтесь или войдите в аккаунт, чтобы добавлять товар в корзину"}</Toast.Body>
    </Toast>
  );
}
