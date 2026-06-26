import React from "react";

const ConfirmActionModal = ({
  open,
  title,
  message,
  confirmText,
  confirmColor = "bg-red-600 hover:bg-red-700",
  onConfirm,
  onClose,
}) => {

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">

        <h2 className="text-2xl font-black text-gray-900 mb-4">
          {title}
        </h2>

        <p className="text-gray-600 mb-8 leading-7">
          {message}
        </p>

        <div className="flex justify-end gap-4">

          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

<button
  onClick={onConfirm}
  className={`px-6 py-3 rounded-xl text-white font-semibold transition ${confirmColor}`}
>
  {confirmText}
</button>

        </div>

      </div>

    </div>
  );

};

export default ConfirmActionModal;