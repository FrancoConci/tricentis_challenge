/**
 * 
 * @param func Function to debounce
 * @param timeout Timeout in ms 
 * @returns Return type depends on the passed function
 */
export function debounce(func: any, timeout = 500) {
  let timer: any;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(null, args);
    }, timeout);
  };
}
