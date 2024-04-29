import ModalTemplate from 'components/templates/ModalTemplate/ModalTemplate';

export default () => {
  if (__DEV__) console.log('🏳️ - test');

  return <ModalTemplate style={{ height: '50%' }} title="test"></ModalTemplate>;
};
