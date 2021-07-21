import { Box, makeStyles, Tab, Tabs } from '@material-ui/core'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { news, promotionalNews, reviews } from '../../../components/App/data/DataNews';
import { ToSlug } from '../../../utils/format';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            className="tab__panel"
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {value === index && (
                <div className='tab--child'>
                    {children}
                </div>
            )}
        </div>
    );
}
const useStyles = makeStyles((theme) => ({
    root: {
        padding: '40px 0',
        width: '100%',
        '& .MuiTabs-flexContainer': {
            justifyContent: 'center',
        },
        '& .PrivateTabIndicator-colorPrimary-4': {
            display: 'none'
        },
        '& .MuiButtonBase-root': {
            color: 'black',
            fontSize: '20px',
            fontWeight: '500',
            [theme.breakpoints.down('xs')]: {
                fontSize: '15px',
                fontWeight: 'bold'
            }
        },
        '& .MuiTab-textColorPrimary.Mui-selected': {
            color: '#fa5238'
        },
        '& .PrivateTabIndicator-colorPrimary-7': {
            backgroundColor: 'unset'
        },
        '& .PrivateTabIndicator-colorPrimary-6': {
            backgroundColor: 'transparent'
        },
        '& .news--link': {
            color: '#000',
            fontSize: '17px',
            fontWeight: '600'
        },
        '& a.news--link:hover': {
            color: '#fb4226',
            textDecoration: 'none'
        },
        '& .col--news': {
            [theme.breakpoints.down('xs')]: {
                width: '100% !important'
            }
        }
    },
}));
export default function News() {
    const classes = useStyles();
    const [value, setValue] = useState('one');
    const [index, setIndex] = useState('one');
    const handleChange = (event, newValue) => {
        setValue(newValue);
        setIndex(newValue)
    };
    const renderNews = () => {
        switch (index) {
            case 'one':
                return (
                    news.map((n, index) => {
                        return (
                            <div key={index} className='col--news'>
                                <div className="news--thumbail">
                                    <Link to={`/goc-dien-anh/${n.id}-${ToSlug(n.title)}`}>
                                        <img src={n.img} alt={n.img} />
                                    </Link>
                                </div>
                                <div className="news--info">
                                    <Link className="news--link" to={`/goc-dien-anh/${n.id}-${ToSlug(n.title)}`}>
                                        <p className="news--title">{n.title}</p>
                                    </Link>
                                    <p className="news--summary">{n.summary}</p>
                                </div>
                            </div>
                        )
                    })
                )
            case 'two':
                return (
                    reviews.map((n, index) => {
                        return (
                            <div key={index} className='col--news'>
                                <div className="news--thumbail">
                                    <Link  to={`/review/${n.id}-${ToSlug(n.title)}`}>
                                        <img src={n.img} alt={n.img} />
                                    </Link>
                                </div>
                                <div className="news--info">
                                    <Link  className="news--link" to={`/review/${n.id}-${ToSlug(n.title)}`}>
                                        <p className="news--title">{n.title}</p>
                                    </Link>
                                    <p className="news--summary">{n.summary}</p>
                                </div>
                            </div>
                        )
                    })
                )
            case 'three':
                return (
                    promotionalNews.map((n, index) => {
                        return (
                            <div key={index} className='col--news'>
                                <div className="news--thumbail">
                                    <Link to={`/khuyen-mai/${n.id}-${ToSlug(n.title)}`}>
                                        <img src={n.img} alt={n.img} />
                                    </Link>
                                </div>
                                <div className="news--info">
                                    <Link className="news--link" to={`/khuyen-mai/${n.id}-${ToSlug(n.title)}`}>
                                        <p className="news--title">{n.title}</p>
                                    </Link>
                                    <p className="news--summary">{n.summary}</p>
                                </div>
                            </div>
                        )
                    })
                )
            default:
                break;
        }
    }
    return (
        <div id="tin-tuc" className={classes.root}>
            <Box component="div" className="tab--child bg--new" ></Box>
            <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
            >
                <Tab value="one" label="Điện ảnh 24h" />
                <Tab value="two" label="Review" />
                <Tab value="three" label="Khuyến mãi" />
            </Tabs>
            <TabPanel value={value} index={index}>
                {renderNews()}
            </TabPanel>
        </div>
    )
}
