import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NewsList.css';

const NewsList = () => {
    const [news, setNews] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedNews, setSelectedNews] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('http://192.168.1.7:5000/berita');
                setNews(response.data);
            } catch (error) {
                console.error('Error fetching the news data:', error);
            }
        };

        fetchNews();
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleNewsClick = (newsItem) => {
        setSelectedNews(newsItem);
    };

    const filteredNews = news.filter(item =>
        item.judul_berita.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Berita Hangat Java Web Media</h1>
            </header>
            <div className="dashboard-content">
                
                <main className="dashboard-main">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search news..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className="news-list">
                        {filteredNews.length > 0 ? (
                            filteredNews.map((item) => (
                                <div key={item.id} className="news-item" onClick={() => handleNewsClick(item)}>
                                    <h2>{item.judul_berita}</h2>
                                    
                                    <p className="news-summary">{item.summary}</p>
                                    <p className="news-keywords">{Array.isArray(item.keywords) ? item.keywords.join(', ') : item.keywords}</p>
                                </div>
                            ))
                        ) : (
                            <p className="no-news">No news available.</p>
                        )}
                    </div>
                    {selectedNews && (
                        <div className="news-preview">
                            <h2>{selectedNews.judul_berita}</h2>
                            
                            <p className="news-summary">{selectedNews.ringkasan}</p>
                            <p className="news-keywords">{Array.isArray(selectedNews.keywords) ? selectedNews.keywords.join(', ') : selectedNews.keywords}</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default NewsList;
