import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddEntryForm from './AddEntryForm';
import {EntryWithoutId} from '../types';

// export interface BaseProps {
//   modalOpen: boolean;
//   onClose: () => void;
//   error?: string;
//   modelHeader:string;
//   onSubmit: (values:any) => void;
//   children:JSX.Element;
// }


// export const BaseModal = ({ modelHeader,modalOpen, onClose, error,children, onSubmit}: BaseProps) => {
//   children.props.onSubmit = onSubmit;
//   return (
//   <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
//     <Modal.Header>{modelHeader}</Modal.Header>
//     <Modal.Content>
//       {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
//       {children}
//     </Modal.Content>
//   </Modal>
//   )
// };

interface Props /*extends BaseProps*/{
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: EntryWithoutId) => void;
    error?: string;
  }


const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
      </Modal.Content>
    </Modal>
);


// const testModal = () => (
//   <BaseModal 
//     modelHeader={"what"} 
//     modalOpen={true} 
//     onClose={()=>{console.log("test");}} 
//     error={"error"} 
//     onSubmit={()=>{console.log('submit')}}
//   >
//     <AddEntryForm onSubmit={()=>{console.log("what")}} onCancel={()=>{console.log("close")}} />
//   </BaseModal>
// );


export default AddEntryModal;