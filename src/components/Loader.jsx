const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-bg-main">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <span className="mt-4 text-primary font-medium tracking-widest uppercase text-[10px]">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
