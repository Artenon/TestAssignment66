import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import PaletteIcon from '@mui/icons-material/Palette';

type FooterProps = {
  mainColor: string | undefined;
}

export const Footer = ({mainColor}: FooterProps): JSX.Element => (
  <footer className='footer news__footer' style={{backgroundColor: mainColor}}>
    <Link to={AppRoute.Main}><NewspaperIcon /></Link>
    <Link to={AppRoute.Themes}><PaletteIcon /></Link>
  </footer>
);
