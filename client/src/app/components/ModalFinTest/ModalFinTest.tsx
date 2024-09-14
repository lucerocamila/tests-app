import React, { useEffect, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

interface ModalFinTestProps {
  iconoSvg: React.ReactNode;
  text: string;
  nameButton: string;
  functionButon: () => void;
}

const ModalFinTest: React.FC<ModalFinTestProps> = ({iconoSvg, text, nameButton, functionButon}) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  useEffect(() => {
    onOpen()
  }, []);

  const handleAction = () => {
    functionButon()
    onOpenChange();
  };

  return (
    <>
      {/* <Button onPress={onOpen}>Open Modal</Button> */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
            <>
              <ModalHeader className="flex flex-col gap-1 justify-center items-center">
                <div className="w-10 h-10 rounded-full bg-green-400 text-white flex justify-center items-center text-lg">
                {iconoSvg} 
                </div>
              </ModalHeader>
              <ModalBody className="flex flex-col justify-center items-center text-md text-blue-700">
                <p>{text}</p>
              </ModalBody>
              <ModalFooter className="flex justify-center items-center gap-2">
                {/* <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button> */}
                <Button color="warning" onPress={handleAction}>
                  {nameButton}
                </Button>
              </ModalFooter>
            </>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalFinTest;


