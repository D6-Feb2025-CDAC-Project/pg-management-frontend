import { Loader2 } from "lucide-react";
import React from "react";

function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <Loader2
        className="animate-spin text-purpleDarkScale-800"
        size={50} // bigger for visibility
        strokeWidth={1.5} // thicker lines
      />
    </div>
  );
}

export default Loader;
