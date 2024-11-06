import React, { useEffect, useRef, useState } from "react";
import { LuConstruction } from "react-icons/lu";

const WipDisclaimer = () => {
  const [isModalOpen, setModalOpen] = useState(true);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  };

  useEffect(() => {
    const modalElement = modalRef.current;
    if (modalElement) {
      if (isModalOpen) {
        modalElement.showModal();
        console.log("OPENED");
      } else {
        modalElement.close();
        console.log("CLOSED");
      }
    }
  }, [isModalOpen]);

  return (
    <dialog
      ref={modalRef}
      onKeyDown={handleKeyDown}
      className="z-[2000] rounded-2xl border-2 border-zinc-900 bg-zinc-50 shadow-4xl"
    >
      <div className="flex flex-col">
        <LuConstruction className="mt-8 h-16 w-16 place-self-center" />
        <h1 className="mx-6 text-2xl font-bold">Disclaimer</h1>
        <p className="mx-6">
          This app is currently in development, so you may encounter occasional
          bugs, inactive links or unexpected behavior.
        </p>
        <button
          className="modal-close-btn m-8 inline-flex w-32 items-center justify-center place-self-end whitespace-nowrap rounded-md border-2 border-zinc-900 bg-zinc-900 px-4 py-2 font-medium text-zinc-100 shadow-lg hover:bg-zinc-50 hover:text-zinc-900"
          onClick={handleCloseModal}
        >
          Got it
        </button>
      </div>
    </dialog>
  );
};

export default WipDisclaimer;
