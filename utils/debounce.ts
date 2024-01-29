export const debounce = <P>(callback: (args: P) => void, wait: number) => {
    let timeoutId:  NodeJS.Timeout 
    return (args: P) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        callback(args);
      }, wait);
    };
  }