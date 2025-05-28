import type { NextPage } from "next"; 
import VLibras from "vlibras-nextjs"; 

const VLibrasComponent: NextPage = () => { 
  return ( 
    <div>
      {/* O VLibras só funcionará em produção, conforme testes realizados */}
      {process.env.NODE_ENV === "production" && <VLibras />} 
    </div>
  ); 
}; 

export default VLibrasComponent;
