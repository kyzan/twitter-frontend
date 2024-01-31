import { useState, useEffect } from "react";

const useFetch = (url: string) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {

    if(localStorage.getItem("api_data")) {
      const jsonData: string | null = localStorage.getItem("api_data");
      console.log(jsonData);
      const data = JSON.parse(jsonData!);
      setData(data);
    }
    else {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("api_data", JSON.stringify(data));
        setData(data)
      });
    }
  }, [url]);

  return data;
};

export default useFetch;