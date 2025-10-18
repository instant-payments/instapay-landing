import LightningIcon from '@/components/ui/icons/LightningIcon';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="flex flex-col items-center space-y-6">
        {/* Animated Lightning */}
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 blur-2xl opacity-50 animate-pulse">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full"></div>
          </div>

          {/* Lightning icon with animations */}
          <div className="relative flex items-center justify-center">
            <div className="animate-bounce">
              <div className="relative">
                <LightningIcon width={80} height={160} className="drop-shadow-2xl animate-pulse" />

                {/* Energy particles */}
                <div className="absolute -top-2 -right-2 w-3 h-3 bg-purple-500 rounded-full animate-ping"></div>
                <div
                  className="absolute -bottom-2 -left-2 w-2 h-2 bg-blue-500 rounded-full animate-ping"
                  style={{ animationDelay: '0.5s' }}
                ></div>
                <div
                  className="absolute top-1/2 -right-3 w-2 h-2 bg-purple-400 rounded-full animate-ping"
                  style={{ animationDelay: '0.3s' }}
                ></div>
                <div
                  className="absolute top-1/4 -left-3 w-2 h-2 bg-pink-400 rounded-full animate-ping"
                  style={{ animationDelay: '0.7s' }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading text with electric effect */}
        <div className="flex flex-col items-center space-y-3">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 bg-clip-text text-transparent animate-pulse">
              Loading
            </span>
            <span className="flex space-x-1">
              <span
                className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-bounce"
                style={{ animationDelay: '0ms' }}
              ></span>
              <span
                className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-bounce"
                style={{ animationDelay: '150ms' }}
              ></span>
              <span
                className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-bounce"
                style={{ animationDelay: '300ms' }}
              ></span>
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-40 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 via-purple-600 to-blue-500 rounded-full animate-pulse shadow-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
