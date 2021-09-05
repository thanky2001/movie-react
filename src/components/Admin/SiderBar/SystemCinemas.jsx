import React, { useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import { Link, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getParentCinemas } from '../../../actions/cinemas';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    siderbarTitle: {
        minHeight: 'unset !important',
        '& span': {
            fontWeight: '600'
        }
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
function LinkCustom(props) {
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
export default function SystemCinemas(props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const { parentCinemas } = useSelector(state => state.cinemasReducer);
    const dispatch = useDispatch()
    const { mobileOpen, handleDrawerToggle } = props;
    useEffect(() => {
        dispatch(getParentCinemas());
    }, [dispatch])

    const drawer = (
        <div>
            <List>
                <LinkCustom
                    to="/admin"
                    activeOnlyWhenExact={true}
                >
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <ListItemText primary='Quay lại trang chủ' />
                </LinkCustom>
                <ListItem className={classes.siderbarTitle}>
                    <ListItemText primary='HỆ TỐNG RẠP' />
                </ListItem>
                {parentCinemas && parentCinemas.map((ci, index) => {
                    return (
                        <LinkCustom
                            key = {index}
                            to={`/admin/quan-ly-lich-chieu/${ci.maHeThongRap}`}
                        >
                            <ListItemText primary={ci.tenHeThongRap} />
                        </LinkCustom>
                    )
                })}
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
