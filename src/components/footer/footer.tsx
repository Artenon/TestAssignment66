import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import PaletteIcon from '@mui/icons-material/Palette';

type FooterProps = {
  mainColor: string | undefined;
  textColor: string | undefined;
}

export const Footer = ({mainColor, textColor}: FooterProps): JSX.Element => (
  <footer className='footer news__footer' style={{backgroundColor: mainColor}}>
    <Link
      to={AppRoute.Main}
      style={{color: textColor}}
      className={`${AppRoute.Main === window.location.pathname && 'active'}`}
    >
      <NewspaperIcon />
    </Link>
    <Link
      to={AppRoute.Themes}
      style={{color: textColor}}
      className={`${AppRoute.Themes === window.location.pathname && 'active'}`}
    >
      <PaletteIcon />
    </Link>
  </footer>
);
