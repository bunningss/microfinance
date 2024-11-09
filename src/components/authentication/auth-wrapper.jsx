export function AuthWrapper({ children }) {
  return (
    <>
      <div className="flex items-center justify-center min-h-[calc(theme(height.screen)-140px)]">
        <div className="max-w-[500px] w-full shadow-regular rounded-md">
          {/* Main Form */}
          <div className="p-2 md:p-8">
            {/* Login / Register Form */}
            <div className="w-full">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
