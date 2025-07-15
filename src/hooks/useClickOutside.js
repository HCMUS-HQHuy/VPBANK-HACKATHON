import { useEffect } from 'react';

/**
 * Hook tùy chỉnh để phát hiện click chuột ra bên ngoài một phần tử được tham chiếu.
 * @param {React.RefObject} ref - Ref trỏ đến phần tử cần theo dõi.
 * @param {Function} handler - Hàm sẽ được gọi khi có click ra ngoài.
 */
function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      // Nếu không có ref hoặc click vào chính phần tử đó, không làm gì cả
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    // Dọn dẹp listener khi component bị unmount
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]); // Chỉ chạy lại effect khi ref hoặc handler thay đổi
}

export default useClickOutside;