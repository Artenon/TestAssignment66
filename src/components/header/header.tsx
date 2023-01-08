import CachedIcon from '@mui/icons-material/Cached';
import { useAppDispatch } from '../../hooks';
import { fetchNews } from '../../redux/api-actions';

type HeaderProps = {
  mainColor: string | undefined;
  textColor: string | undefined;
  heading: string;
};

export const Header = ({mainColor, textColor, heading}: HeaderProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleRefresh = () => {
    dispatch(fetchNews());
  }

  return (
    <header className='header news__header' style={{backgroundColor: mainColor}}>
      <div className='news__heading' style={{color: textColor}}>{heading}</div>
      <div className="restart__icon" onClick={handleRefresh}><CachedIcon style={{color: textColor}} /></div>
    </header>
  );
};