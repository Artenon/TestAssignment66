import { useEffect } from 'react';
import PullToRefresh from 'react-simple-pull-to-refresh';
import Loading from 'react-loading';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchNews } from '../redux/api-actions';
import { getNews, getStyles, getIsLoading } from '../redux/selectors';
import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';

export const NewsPage = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const news = useAppSelector(getNews);
  const styles = useAppSelector(getStyles);
  const isLoading = useAppSelector(getIsLoading);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const handleRefresh = async () => {
    await dispatch(fetchNews());
  }

  return (
      <div className='news'>
        <Header mainColor={styles?.mainColor} textColor={styles?.textColor} heading='Новости' />
        {
          isLoading
          ? <Loading type='spin' color={styles?.textColor} className='loading' />
          : 
          <PullToRefresh onRefresh={handleRefresh} pullDownThreshold={90} maxPullDownDistance={100} resistance={3}>
            <ul className='news__items'>
              {
                news.map((item) => (
                  <li className='news__item' key={item.id} style={{backgroundColor: styles?.secondColor}}>
                    <div className='news__title' style={{color: styles?.textColor}}>{item.title}</div>
                    <div className='news__content' style={{color: styles?.textColor}}>{item.content}</div>
                  </li>
                ))
              }
            </ul>
          </PullToRefresh>
        }
        <Footer mainColor={styles?.mainColor} />
      </div>
  );
};
