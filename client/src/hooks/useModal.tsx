import { useState } from "@storybook/addons";
import React from "react";

interface ModalProps {
    children: React.ReactNode;
}

const useModal = (props: ModalProps) => {
    const [isOpen, setOpen] = useState(false);

    return { isOpen, setOpen };
}

export default useModal;