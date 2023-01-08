import { useEffect } from 'react';
import PullToRefresh from 'react-simple-pull-to-refresh';
import Loading from 'react-loading';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchMoreNews, fetchNews } from '../redux/api-actions';
import { changeNextPage } from '../redux/reducer';
import { getNews, getIsLoading, getCurrentStyles, getNextPage, getIsNextPageLoading } from '../redux/selectors';
import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';

export const NewsPage = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const news = useAppSelector(getNews);
  const isLoading = useAppSelector(getIsLoading);
  const currentStyles = useAppSelector(getCurrentStyles);
  const nextPage = useAppSelector(getNextPage);
  const isNextPageLoading = useAppSelector(getIsNextPageLoading);
  
  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  useEffect(() => {
    const checkPosition = () => {
      const height = document.body.offsetHeight;
      const screenHeight = window.innerHeight;
      const scrolled = window.scrollY;
      const threshold = height - screenHeight / 4;
      const currentPosition = scrolled + screenHeight;
  
      if (currentPosition >= threshold && !isNextPageLoading) {
        dispatch(fetchMoreNews(nextPage));
        dispatch(changeNextPage());
      }
    };

    window.addEventListener('scroll', checkPosition);
    window.addEventListener('resize', checkPosition);

    return () => {
      window.removeEventListener('scroll', checkPosition);
      window.removeEventListener('resize', checkPosition);
    }
  }, [dispatch, nextPage, isNextPageLoading]);

  const handleRefresh = async () => {
    await dispatch(fetchNews());
  };

  return (
    <section className='news' style={{backgroundColor: currentStyles?.secondColor}}>
      <Header mainColor={currentStyles?.mainColor} textColor={currentStyles?.textColor} heading='Новости' />
      {
        isLoading
        ? <div className="loading__wrapper"><Loading type='spin' color={currentStyles?.textColor} className='loading' /></div>
        : 
        <PullToRefresh
          onRefresh={handleRefresh}
          pullDownThreshold={90}
          maxPullDownDistance={100}
          resistance={3}
        >
          <ul className='news__items'>
            {
              news.map((item, index) => (
                <li className='news__item' key={`${item.id}-${index}`} style={{backgroundColor: currentStyles?.secondColor}}>
                  <div className='news__title' style={{color: currentStyles?.textColor}}>{item.title}</div>
                  <div className='news__content' style={{color: currentStyles?.textColor}}>{item.content}</div>
                </li>
              ))
            }
          </ul>
        </PullToRefresh>
      }
      <Footer mainColor={currentStyles?.mainColor} textColor={currentStyles?.textColor} />
    </section>
  );
};
