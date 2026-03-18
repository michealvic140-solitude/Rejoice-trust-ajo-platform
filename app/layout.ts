{localStorage.getItem("maintenanceMode") === "true" && (
  <div className="bg-red-600 text-white text-center py-3 font-bold fixed top-[72px] left-0 right-0 z-40">
    {localStorage.getItem("maintenanceMessage") || "Server Maintenance in progress – please check back soon"}
  </div>
)}
