import { useState, useEffect } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

type ToTheTopButtonProps = {
  secondColor: string | undefined;
  textColor: string | undefined;
}

export const ToTheTopButton = ({secondColor, textColor}: ToTheTopButtonProps): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;

    if (scrolled > 600) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTheTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  };

  useEffect(() => {
    const handleScroll = () => toggleVisible();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div
      className={`toTheTop ${visible ? 'visible' : 'hidden'}`}
      style={{backgroundColor: textColor}}
      onClick={scrollToTheTop}
    >
      <KeyboardArrowUpIcon style={{color: secondColor}} />
    </div>
  );
}
