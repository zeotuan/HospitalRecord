import React from 'react';
import AddPatientForm, { PatientFormValues } from './AddPatientForm';
import CustomBaseModal from '../../CustomModal/CustomBaseModal';
interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: PatientFormValues) => void;
  error?: string;
}

const AddPatientModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <CustomBaseModal 
    modelHeader={"Add Patient Form"} 
    modalOpen={modalOpen} 
    onClose={onClose} 
    error={error} 
  >
    <AddPatientForm onSubmit={onSubmit} onCancel={onClose} />
  </CustomBaseModal>
);

export default AddPatientModal;
