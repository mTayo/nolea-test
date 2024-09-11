import React, { Fragment, useEffect, useReducer } from "react";
import { Carousel } from "flowbite-react";
import { truncateMultilineText } from "utils/utils";
import dotIcon from 'assets/icons/dot.svg';
import { useAppSelector } from "redux-store/hooks";
import INews from "models/INews";

interface InitialState {
    newsListing: {
        latest_news: Array<INews>;
        main_news: Array<INews>;
        news_grid: Array<INews>;
    }
    isLoading: boolean;
}

const HomePage = () => {
    const { newsList } = useAppSelector((state) => state.news);

    const initialState: InitialState = {
        newsListing: {
            latest_news: [],
            main_news: [],
            news_grid: []
        },
        isLoading: false
    };
    const [state, setState]: any = useReducer((state: InitialState, newState: InitialState) => ({ ...state, ...newState }), initialState);
    const {newsListing, isLoading} = state;
   
    const handleGroupNews = (key: any) =>
        function group(array: any) {
            return array.reduce((acc: any, obj: any) => {
                const property = obj[key];
                acc[property] = acc[property] || [];
                acc[property].push(obj);
                return acc;
            }, {});
        };

    const groupNewsData = () => {
        const groupByCategory = handleGroupNews('category');
        const groupedNews = groupByCategory(newsList);
        setState({
            newsListing: {
                latest_news: groupedNews['latest-news'],
                main_news: groupedNews['main-news'],
                news_grid: groupedNews['news-grid'],
            }
        })
    };
    useEffect(()=> {
        groupNewsData();
    },[newsList]);

    const gridItem = (datum: any) => {
        const { imgsrc, id, headline } = datum;
        const style = {
          gridColumnEnd: `span ${getSpanEstimate(Number(id))}`,
          gridRowEnd: `span ${getSpanEstimate(Number(id))}`,
        }
      
        return (
            <div style={style} className="cursor-pointer relative ">
                <img src={imgsrc} alt="" className="w-full h-full object-cover  scale-95 transition-all duration-300 hover:scale-100 hover:bg-black rounded-lg" />
                <div className="z-10 text-2xl text-center w-full font-medium text-white absolute bottom-10  text-center p-4 xs:text-xl md:text-2xl">{truncateMultilineText(headline|| '', 30)}</div>
            </div>
        )
    };
      
    const getSpanEstimate = (size: number) => {
        if (size % 2 === 0) {
          return 2
        }
        return 1
    };

    return(
        <div className="w-full mt-3 lg:mt-10 xl:px-5 max-w-[1440px] mx-auto">
            <div className="grid grid-cols-4 gap-4">
                <div className="col-span-4 xl:col-span-1">
                    {newsListing?.latest_news?.map((main: INews, _i: number) => (
                        <div className={`pb-3 mb-3 ${_i+1 <  newsListing?.latest_news.length? 'border-b-2' : ''}`} key={_i}>
                            <img src={main?.thumbnail|| main?.imgurl} alt={main?.headline} className="group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-lg" />
                            <h3 className=" font-medium  ">{main?.headline}</h3>
                            <p className="m-0 mt-1 text-sm">{truncateMultilineText(main.content, 80)}</p>
                            <div className="text-xs mt-2 font-semibold">{main.time} | {main.region}</div>
                    </div>
                        
                    ))}
                </div>
                <div className="col-span-4 xl:col-span-2">
                    <div className="h-[50vh] w-full">
                        <Carousel leftControl={null} rightControl={null}>
                            {newsListing?.main_news?.map((main: INews, _i: number) => (
                                <div className="group relative w-full h-full  flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 flex-grow" key={_i}>
                                    <img src={main?.thumbnail || main?.imgurl} alt={main?.headline} className="absolute inset-0 h-full w-full   object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
                                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5 bg-black opacity-50"></div>
                                    <h3 className="z-10 text-2xl font-medium text-white absolute bottom-10  text-center p-4 xs:text-xl md:text-3xl">{main?.headline}</h3>
                                </div>
                                
                            ))}
                        </Carousel>
                    </div>
                    <div>
                        <div className="mt-3 mb-2">
                            <h1 className="text-2xl font-semibold">{newsListing?.main_news[0]?.headline || ''}</h1>
                            <p className="mt-2.5">{truncateMultilineText(newsListing?.main_news[0]?.content|| '', 200)}</p>
                            <div className="text-xs mt-2 font-semibold">{newsListing?.main_news[0]?.time || ''} | {newsListing?.main_news[0]?.region|| ''}</div>
                        </div>
                        
                        {newsListing?.main_news?.map((main: INews, _i: number) => (
                            <div className="font-normal flex items-center" key={_i}>
                                <img src={dotIcon}  className="w-[30px]"/> <div> {main.headline} </div>
                            </div>
                        ))}
                        
                    </div>
                </div>
                <div className="col-span-4 xl:col-span-1">
                {newsListing?.latest_news?.map((main: INews, _i: number) => (
                    <div className={`pb-3 mb-3 ${_i+1 <  newsListing?.latest_news.length? 'border-b-2' : ''}`} key={_i}>
                        <h3 className=" font-medium  text-lg">{main?.headline}</h3>
                        <p className="m-0 mt-1 text-sm">{truncateMultilineText(main.content, 80)}</p>
                        <div className="text-xs mt-2 font-semibold">{main.time} | {main.region}</div>
                    </div>
                        
                    ))}
                </div>
            </div>
            <div className="mt-4">
                <h3 className="font-bold text-4xl">News Grid</h3>

                    <div
                        className="fadein gridContainer mt-5"
                    > 
                        {newsListing?.news_grid?.map((news: INews, _i: number) =>(  
                            <Fragment key={_i}>   
                                {gridItem(news)}
                            </Fragment>
                        ))}
                    </div>
            </div>
        </div>
    )
};

export default HomePage;
