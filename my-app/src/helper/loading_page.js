
export function LoadingPage(props) {
    return (
        <div class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-600 opacity-75 flex flex-col items-center justify-center">
            <div class=" flex justify-center items-center">
                <div class="animate-spin rounded-full h-24 w-24 mb-8 border-b-2 border-white"></div>
            </div>
            <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
            <p class="w-1/3 text-center text-white">This may take a few seconds, please don't close this page.</p>
        </div>
    );
}