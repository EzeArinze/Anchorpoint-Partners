export const AppComponent = () => {
  return (
    <div className="relative w-full aspect-[4/3] sm:aspect-[4/3] md:aspect-[16/9] lg:aspect-[21/9] rounded-2xl bg-white/5 p-6">
      {/* Header */}
      <div className="flex items-center gap-2 text-orange-400 mb-4">
        <svg
          className="size-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
        >
          <g fill="none">
            <path
              fill="#ff6723"
              d="M26 19.34c0 6.1-5.05 11.005-11.15 10.641c-6.269-.374-10.56-6.403-9.752-12.705c.489-3.833 2.286-7.12 4.242-9.67c.34-.445.689 3.136 1.038 2.742c.35-.405 3.594-6.019 4.722-7.991a.694.694 0 0 1 1.028-.213C18.394 3.854 26 10.277 26 19.34"
            />
            <path
              fill="#ffb02e"
              d="M23 21.851c0 4.042-3.519 7.291-7.799 7.144c-4.62-.156-7.788-4.384-7.11-8.739C9.07 14.012 15.48 10 15.48 10S23 14.707 23 21.851"
            />
          </g>
        </svg>
        <div className="text-base font-medium">Wealth Growth</div>
      </div>

      {/* Subtext */}
      <p className="text-sm text-foreground border-b border-white/10 pb-3">
        This year, your investments are outperforming last year’s average
        returns.
      </p>

      {/* Stats */}
      <div className="mt-4 space-y-3">
        <div>
          <span className="text-2xl font-semibold text-foreground">12.4%</span>
          <span className="text-xs text-muted-foreground ml-1">
            Avg. Return
          </span>
          <div className="mt-1 h-6 w-full rounded bg-gradient-to-r from-emerald-400 to-indigo-600 px-2 text-xs text-white flex items-center">
            2024
          </div>
        </div>

        <div>
          <span className="text-2xl font-semibold text-foreground">7.8%</span>
          <span className="text-xs text-muted-foreground ml-1">
            Avg. Return
          </span>
          <div className="mt-1 h-6 w-2/3 rounded bg-white/20 px-2 text-xs flex items-center">
            2023
          </div>
        </div>
      </div>
    </div>
  );
};
