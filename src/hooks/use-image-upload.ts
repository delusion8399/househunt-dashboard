import { useState, useCallback } from "react";
import environments from "../environments";
const HOST = environments.HOST;

function useImageUpload(apiEndpoint) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const uploadImages = useCallback(
    async (images) => {
      setLoading(true);
      setError(null);
      setResponse(null);

      try {
        const formData = new FormData();
        for (const image of images) {
          formData.append("images", image);
        }

        let url = `${HOST}${apiEndpoint}`;

        const res = await fetch(url, {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        setResponse(data);
        return data;
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [apiEndpoint]
  );

  return { loading, error, response, uploadImages };
}

export default useImageUpload;
