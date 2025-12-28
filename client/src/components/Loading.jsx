import React from "react";

const Loading = () => {
  return (
    <>
      <div className="loader"></div>
      <style>{`
        .loader {
          width: 15px;
          aspect-ratio: 1;
          border-radius: 50%;
          animation: l5 1s infinite linear alternate;
        }

        @keyframes l5 {
          0% {
            box-shadow: 20px 0 #A3E635, -20px 0 #A3E63520;
            background: #A3E635;
          }
          33% {
            box-shadow: 20px 0 #A3E635, -20px 0 #A3E63520;
            background: #A3E63520;
          }
          66% {
            box-shadow: 20px 0 #A3E63520, -20px 0 #A3E635;
            background: #A3E63520;
          }
          100% {
            box-shadow: 20px 0 #A3E63520, -20px 0 #A3E635;
            background: #A3E635;
          }
        }
      `}</style>
    </>
  );
};

export default Loading;
