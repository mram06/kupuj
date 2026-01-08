import { useGetAdvertByIdQuery } from "@/features/ads/api/advertsApi";
import { useParams } from "react-router";
import { useState } from "react";
import { EditAdForm } from "@/features/ads/add-form/ui/EditAdForm";
import { Banner } from "@/shared/ui/Banner";

function EditAdPage() {
  const { id } = useParams();
  const { data: adData, isLoading } = useGetAdvertByIdQuery({ id });
  const [message, setMessage] = useState(null);

  const handleClose = () => {
    setMessage(null);
  };

  return (
    <>
      <Banner />
      <div className="container">
        {message && (
          <section className="max-w-194 m-auto pt-12">
            <div className="bg-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 text-center py-12">
              <div className="w-16 h-16 bg-emerald-200 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-emerald-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="subtitle text-emerald-600">Зміни збережено!</h2>
              <p className="text-gray-700">{message}</p>
              <button onClick={handleClose} className="btn-primary">
                Прикрити
              </button>
            </div>
          </section>
        )}
        {!message && (
          <section className="max-w-194 m-auto pt-12 pb-12">
            <h1 className="text-3xl font-bold mb-8">Редагування оголошення</h1>
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-emerald-500 rounded-full animate-spin"></div>
              </div>
            ) : (
              adData && <EditAdForm adData={adData} setMessage={setMessage} />
            )}
          </section>
        )}
      </div>
    </>
  );
}

export default EditAdPage;
