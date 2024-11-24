import React, {useEffect} from 'react'
import Image from 'next/image';
import {Modal, ModalContent, ModalHeader, ModalBody, useDisclosure} from "@nextui-org/modal";

function CustomLoader({isLoading}:any) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  useEffect(()=>{
    onOpen();
  },[])

  return (
    <div>
    {isLoading && (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <Image src={"/loader.gif"} alt="loader" width={300} height={300}
                className="w-[200px] h-[200px] mx-auto"
                />
                <h2 className='text-2xl font-bold text-center mt-5 text-primary'>
                  物語を生成中です...
                </h2>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    )}
    </div>
  )
}

export default CustomLoader