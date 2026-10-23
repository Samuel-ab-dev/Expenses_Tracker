import { useState } from "react";
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";
import { LuImage, LuX } from "react-icons/lu";
import { useTranslation } from "react-i18next";

interface EmojiPickerPopupProps {
  icon?: string;
  onSelect: (icon: string) => void;
}

const EmojiPickerPopup = ({ icon, onSelect }: EmojiPickerPopupProps) => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onSelect(emojiData.imageUrl);
    setIsOpen(false);
  };
  return (
    <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="w-12 h-12 flex items-center justify-center text-2xl bg-violet-100 text-primary rounded-lg hover:bg-violet-200 hover:text-purple-600 transition transform 100s">
          {icon ? (
            <img src={icon} alt="Income Icon" className="w-12 h-12" />
          ) : (
            <LuImage />
          )}
        </div>

        <span className="">
          {icon ? t("common.changeIcon") : t("common.addIcon")}
        </span>
      </div>

      {isOpen && (
        <div className="relative">
          <button
            className="w-7 h-7 flex items-center justify-center bg-slate-50 border border-gray-200 rounded-full absolute -top-2 -right-2 cursor-pointer z-10"
            onClick={() => setIsOpen(false)}
          >
            <LuX />
          </button>

          <EmojiPicker open={isOpen} onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
