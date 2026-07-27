export const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
        <p>© {year} Hamropasal. All rights reserved.</p>
        <p>Retail management for Nepali businesses</p>
      </div>
    </footer>
  );
};
