import { useAppSelector, useAppDispatch } from '../hooks';
import { getStyles } from '../redux/selectors';
import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';
import { setTheme, removeTheme } from '../services/styles';
import { Theme } from '../const';
import { fetchStyles } from '../redux/api-actions';

export const ThemesPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const styles = useAppSelector(getStyles);

  const themes: {
    name: string;
    theme: Theme;
  }[] = [
    { name: 'Темная тема', theme: Theme.Dark },
    { name:'Светлая тема', theme: Theme.Light },
    { name: 'Синяя тема', theme: Theme.Blue }
  ];

  const handleTheme = (theme: Theme) => {
    removeTheme();
    setTheme(theme);
    dispatch(fetchStyles(theme));
  };

  return (
    <div className="themes" style={{backgroundColor: styles?.secondColor}}>
      <Header mainColor={styles?.mainColor} textColor={styles?.textColor} heading='Темы' />

      <ul className='themes__items'>
        {
          themes.map((theme) => (
            <li
              className='themes__item'
              key={theme.name}
              onClick={() => handleTheme(theme.theme)}
            >
              {theme.name}
            </li>
          ))
        }
      </ul>

      <Footer mainColor={styles?.mainColor} />
    </div>    
  );
}