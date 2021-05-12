import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';

export interface BaseProps {
  modalOpen: boolean;
  onClose: () => void;
  error?: string;
  modelHeader:string;
  children:JSX.Element;
}


 const CustomBaseModal = ({ modelHeader,modalOpen, onClose, error,children}: BaseProps) => {
  return (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>{modelHeader}</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      {children}
    </Modal.Content>
  </Modal>
  );
};

export default CustomBaseModal;

