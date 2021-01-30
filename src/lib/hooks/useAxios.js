import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { AXIOS_CONFIG as CONFIG } from '../config/Axios';

const useAxios = (url) => {
  const [data, setData] = useState(null);
  const cancelTokenSource = useMemo(() => axios.CancelToken.source(), []);

  useEffect(() => {
    (async (url) => {
      try {
        const response = await axios.get(url, {
          ...CONFIG,
          url,
          cancelToken: cancelTokenSource.token,
        });
        if (response.status === 200) {
          setData(response);
        } else {
          throw Error('Invalid response');
        }
      } catch (error) {
        axios.isCancel(error)
          ? console.log(error.message)
          : console.log({ error });
      }
    })(url);
    return () => {
      cancelTokenSource.cancel(`Request Aborted`);
    };
  }, [url, cancelTokenSource]);

  return data;
};

export default useAxios;
