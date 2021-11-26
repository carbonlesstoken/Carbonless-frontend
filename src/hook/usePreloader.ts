import { useEffect, useState } from "preact/hooks";

const usePreloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timerId = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timerId);
  }, []);

  return { isLoading };
};

export default usePreloader;
