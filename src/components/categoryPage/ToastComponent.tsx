import Toast from 'react-bootstrap/Toast';

export default function ToastComponent() {
  return (
    <Toast className='category__toast' style={{ backgroundColor: '#fae2bf' }}>     
      <Toast.Body>Товар добавлен в корзину</Toast.Body>
    </Toast>
  );
}
