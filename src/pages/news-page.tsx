import { useEffect } from 'react';
import PullToRefresh from 'react-simple-pull-to-refresh';
import Loading from 'react-loading';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchNews } from '../redux/api-actions';
import { getNews, getIsLoading, getCurrentStyles } from '../redux/selectors';
import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';

export const NewsPage = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const news = useAppSelector(getNews);
  const isLoading = useAppSelector(getIsLoading);
  const currentStyles = useAppSelector(getCurrentStyles);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const handleRefresh = async () => {
    await dispatch(fetchNews());
  };

  return (
    <div className='news'>
      <Header mainColor={currentStyles?.mainColor} textColor={currentStyles?.textColor} heading='Новости' />
      {
        isLoading
        ? <Loading type='spin' color={currentStyles?.textColor} className='loading' />
        : 
        <PullToRefresh
          onRefresh={handleRefresh}
          backgroundColor={currentStyles?.secondColor}
          pullDownThreshold={90}
          maxPullDownDistance={100}
          resistance={3}
        >
          <ul className='news__items'>
            {
              news.map((item) => (
                <li className='news__item' key={item.id} style={{backgroundColor: currentStyles?.secondColor}}>
                  <div className='news__title' style={{color: currentStyles?.textColor}}>{item.title}</div>
                  <div className='news__content' style={{color: currentStyles?.textColor}}>{item.content}</div>
                </li>
              ))
            }
          </ul>
        </PullToRefresh>
      }
      <Footer mainColor={currentStyles?.mainColor} />
    </div>
  );
};
