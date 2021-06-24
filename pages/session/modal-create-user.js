import React, { useEffect, useRef, useState } from "react";
import { Input } from 'reactstrap';
import ReactDOM from "react-dom";
import styled from "styled-components";

const ModalCreateUser = ({ show, onClose }) => {
  const [name, setName] = useState("Name")
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
      setIsBrowser(true);
  }, []);

  const handleCloseClick = (e) => {
      e.preventDefault();
      localStorage.setItem('name', name);
      onClose();
  };

  const modalContent = show ? (
    <StyledModalOverlay>
      <StyledModal>
        <h1>You need an username to join this session</h1>
        <StyledModalBody>
          <Input defaultValue={name} onChange={(event) => setName(event.target.value)} />
        </StyledModalBody>
        <StyledModalFooter>
          <a href="#" onClick={handleCloseClick}>
            Join
          </a>
        </StyledModalFooter>
      </StyledModal>
    </StyledModalOverlay>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
};

const StyledModalBody = styled.div`
  padding-top: 10px;
`;

const StyledModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 25px;
`;

const StyledModal = styled.div`
  background: white;
  width: 500px;
  height: 600px;
  border-radius: 15px;
  padding: 15px;
`;

const StyledModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export default ModalCreateUser;