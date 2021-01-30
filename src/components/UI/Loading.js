import React, { useEffect, useState } from 'react';
import { LoadingIcon } from '../icons';

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  paddingTop: '1rem',
  paddingBottom: '5rem',
};

const Loading = ({ inline }) => {
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTimedOut(true);
    }, 120000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div style={{ ...containerStyle, height: !inline ? '85vh' : 'initial' }}>
      {!timedOut ? (
        <LoadingIcon />
      ) : (
        <div className="text-sm">Timeout. Please reload page</div>
      )}
    </div>
  );
};

export default Loading;
