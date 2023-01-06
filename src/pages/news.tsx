import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchNews } from '../redux/api-actions';
import { getNews, getStyles } from '../redux/selectors';

export const News = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const news = useAppSelector(getNews);
  const styles = useAppSelector(getStyles);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  return (
    <div className='news'>
      <header className='header news__header' style={{backgroundColor: styles?.mainColor}}>
        <div className='news__heading' style={{color: styles?.textColor}}>Новости</div>
      </header>
      {
        news.map((item) => (
          <div className='news__item' key={item.id} style={{backgroundColor: styles?.secondColor}}>
            <div className='news__title' style={{color: styles?.textColor}}>{item.title}</div>
            <div className='news__content' style={{color: styles?.textColor}}>{item.content}</div>
          </div>
        ))
      }
      <footer className='footer news__footer' style={{backgroundColor: styles?.mainColor}}>
        footer
      </footer>
    </div>
  );
};
