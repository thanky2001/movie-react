import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
import TheatersIcon from '@material-ui/icons/Theaters';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import { Link, useRouteMatch } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        marginTop: '60px',
        width: drawerWidth,
        '& .MuiList-padding': {
            paddingTop: '0',
            paddingBottom: '0'
        },
        '& .MuiAccordionSummary-root': {
            width: '100%',
            padding: '0',
        },
        '& .MuiListItem-root': {
            paddingTop: '2px',
            paddingBottom: '2px',
            display: 'flex',
            minHeight: '60px'
        },
        '& .MuiListItemIcon-root': {
            alignItems: 'center',
            minWidth: '40px',
        },
        '& .MuiAccordionSummary-root.Mui-expanded': {
            minHeight: '48px'
        },
        '& .MuiAccordionSummary-content.Mui-expanded': {
            margin: '12px 0',
        },
        '& .MuiAccordion-root.Mui-expanded': {
            margin: '0',
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: '0',
        },
        '& .MuiAccordionDetails-root': {
            display: 'block',
            padding: '0'
        },
        '& .MuiAccordionDetails-root .MuiListItem-root': {
            paddingLeft: '57px'
        }
    },
}));
function LinkCustom  (props) {
    let match = useRouteMatch({
        path: props.to,
        exact: props.activeOnlyWhenExact
    });
    return (
        <Link className={`${match ? "admin-active" : ""} custom--link `} to={props.to}>
            <ListItem button >
                {props.children}
            </ListItem>
        </Link>
    );
}
export default function SiderBar(props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const { mobileOpen, handleDrawerToggle } = props;
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const drawer = (
        <div>
            <List>
                <Accordion elevation={0} component='li' expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <ListItem button >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <ListItemIcon><HomeIcon /></ListItemIcon>
                            <ListItemText primary='Home' />
                        </AccordionSummary>
                    </ListItem>
                    <AccordionDetails >
                        <LinkCustom
                            to="/"
                            activeOnlyWhenExact={true}
                        >
                            <ListItemText primary="Trang chủ" />
                        </LinkCustom>
                        <LinkCustom
                            to="/admin"
                            activeOnlyWhenExact={true}
                        >
                            <ListItemText primary="Trang quản lý" />
                        </LinkCustom>
                        <LinkCustom
                            to="/admin/thong-tin-tai-khoan"
                            activeOnlyWhenExact={true}
                        >
                            <ListItemText primary="Thông tin tài khoản" />
                        </LinkCustom>
                    </AccordionDetails>
                </Accordion>
                <LinkCustom
                    to="/admin/quan-ly-nguoi-dung"
                >
                    <ListItemIcon><GroupIcon /></ListItemIcon>
                    <ListItemText primary='Quản lý người dùng' />
                </LinkCustom>
                <LinkCustom
                    to="/admin/quan-ly-phim"
                >
                    <ListItemIcon><TheatersIcon /></ListItemIcon>
                    <ListItemText primary='Quản lý phim' />
                </LinkCustom>
                <LinkCustom
                    to="/admin/quan-ly-lich-chieu"
                >
                    <ListItemIcon><CalendarTodayIcon /></ListItemIcon>
                    <ListItemText primary='Quản lý lịch chiếu ' />
                </LinkCustom>
            </List>
        </div>
    );
    const container = window !== undefined ? () => window().document.body : undefined;
    return (
        <nav className={classes.drawer} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden mdUp implementation="css">
                <Drawer
                    container={container}
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {drawer}
                </Drawer>
            </Hidden>
            <Hidden smDown implementation="css">
                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    {drawer}
                </Drawer>
            </Hidden>
        </nav>
    )
}
