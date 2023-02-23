import { CSSProperties } from 'react';
import Loading from 'react-loading';
import { useAppSelector, useAppDispatch } from '../hooks';
import { fetchStyles } from '../redux/api-actions';
import { getStyles, getCurrentStyles, getIsLoading } from '../redux/selectors';
import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';
import { removeStyles } from '../services/styles';
import { Styles } from '../types/types';

export const ThemesPage = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const styles = useAppSelector(getStyles);
  const isLoading = useAppSelector(getIsLoading);
  const currentStyles = useAppSelector(getCurrentStyles);

  const handleTheme = (chosenStyles: Styles) => {
    removeStyles();
    dispatch(fetchStyles(chosenStyles.name));
  };

  return (
    <section className='themes' style={{backgroundColor: currentStyles?.secondColor}}>
      <Header mainColor={currentStyles?.mainColor} textColor={currentStyles?.textColor} heading='Темы' />
      {
        isLoading
        ? <div className="loading__wrapper"><Loading type='spin' color={currentStyles?.textColor} className='loading' /></div>
        :
        <ul className='themes__items'>
        {
          styles.map((item) => {
            const itemStyles: CSSProperties = {
              border: `2px solid ${item.mainColor}`,
              backgroundColor: item.secondColor,
              color: item.textColor,
              boxShadow: `0 0 3px 1px ${item.mainColor}`
            };

            return (
              <li
                className='themes__item'
                key={item.id}
                onClick={() => handleTheme(item)}
                style={itemStyles}
              >
                {item.title}
              </li>
            );
          })
        }
      </ul>
      }
      <Footer mainColor={currentStyles?.mainColor} textColor={currentStyles?.textColor} />
    </section>    
  );
}