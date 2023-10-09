export function debounce<F extends (...args: any[]) => any>(
  cb: F,
  delay: number
): (...args: Parameters<F>) => void {
  let timeout: NodeJS.Timeout | null;

  return function executedFunction(...args: Parameters<F>) {
    const later = () => {
      clearTimeout(timeout!);
      cb(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, delay);
  };
}
