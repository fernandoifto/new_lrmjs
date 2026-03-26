'use client';

import VLibras from "vlibras-nextjs";

const VLibrasComponent = () => {
  return (
    <div>
      {/* O VLibras só funcionará em produção, conforme testes realizados */}
      {process.env.NODE_ENV === "production" && <VLibras />}
    </div>
  );
};

export default VLibrasComponent;
