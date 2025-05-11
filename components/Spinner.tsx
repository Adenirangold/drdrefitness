function Spinner() {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0  h-full w-full z-50 flex items-center justify-start bg-white/10 backdrop-blur-sm">
      <div className="spinner absolute top-5 left-0 right-0"></div>
    </div>
  );
}

export default Spinner;
