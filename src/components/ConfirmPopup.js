import PopupWithForm from './PopupWithForm';

const ConfirmPopup = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onDeleteSubmit(props.selectedCard.id);
  };

  return (
    <PopupWithForm
      name='confirmPopup'
      title='Are you sure?'
      isOpen={props.isOpen}
      onClose={props.onClose}
      submitButtonTitle={props.submitButtonTitle}
      onSubmit={handleSubmit}
    />
  );
};

export default ConfirmPopup;
