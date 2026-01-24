import React from "react";
import ModalBase from "./ModalBase";

interface InstagramModalProps {
    isOpen: boolean;
    onClose: () => void;
    username?: string;
}

const InstagramModal: React.FC<InstagramModalProps> = ({ isOpen, onClose, username = "glvtecnologia" }) => {
    return (
        <ModalBase open={isOpen} onClose={onClose} size="xl" className="overflow-hidden">
            <div className="w-full h-[60vh] md:h-[500px]">
                <iframe
                    src={`https://www.instagram.com/${username}/embed`}
                    className="w-full h-full"
                    frameBorder="0"
                    allowFullScreen
                    title="Instagram"
                />
            </div>
        </ModalBase>
    );
};

export default InstagramModal;
