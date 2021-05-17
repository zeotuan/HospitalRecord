import React from 'react';
import AddEntryForm from './AddEntryForm';
import {EntryWithoutId} from '../../types';
import CustomBaseModal  from '../../components/CustomModal/CustomBaseModal';

interface Props /*extends BaseProps*/{
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: EntryWithoutId) => void;
    error?: string;
  }


const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <CustomBaseModal 
    modelHeader={"Add Entry Form"} 
    modalOpen={modalOpen} 
    onClose={onClose} 
    error={error} 
  >
    <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
  </CustomBaseModal>
);


export default AddEntryModal;