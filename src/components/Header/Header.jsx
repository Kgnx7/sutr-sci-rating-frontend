import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Link as RouterLink } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Link from '@material-ui/core/Link'

import { signOut } from '../../features/login/authSlice'
import groups from '../../constants/groups'
import { Can } from '../../components/Can'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  logoutBtn: {
    color: theme.palette.secondary.main,
  },
  sutrLogo: {
    width: 107,
    height: 107,
    margin: '0 auto',
  },
}))

export default function Header() {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const dispatch = useDispatch()
  const history = useHistory()
  const currentUser = useSelector((state) => state.auth.user)
  const isMenuOpen = Boolean(anchorEl)

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    const redirect = () => {
      history.replace('/login')
    }

    dispatch(signOut(redirect))
  }

  const handleProfile = (event) => {
    // event.stopPropagation();
  }

  const links = [
    {
      action: 'list',
      source: 'User',
      url: '/users',
      label: 'Список преподавателей',
    },
    {
      action: 'list',
      source: 'Faculty',
      url: '/faculties',
      label: 'Списк факультетов',
    },
    {
      action: 'list',
      source: 'RiaType',
      url: '/riaTypes',
      label: 'Виды РИД',
    },
  ]

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfile}>
        <Link component={RouterLink} to={`/users/get/${currentUser.id}`}>
          Профиль
        </Link>
      </MenuItem>
      <MenuItem onClick={handleLogout} className={classes.logoutBtn}>
        Выйти
      </MenuItem>
    </Menu>
  )

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Система расчета научного рейтинга СГУ
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <img
          src="/small_sutr_logo_blue.png"
          alt="Логотип СГУ"
          width="107px"
          height="107px"
          className={classes.sutrLogo}
        />
        <Typography variant="subtitle1" align="center" gutterBottom>
          Сочинский государственный университет
        </Typography>
        <Divider />
        <List>
          {links
            .filter((link) =>
              Array.isArray(link.roles)
                ? link.roles.some((role) => role === currentUser?.position)
                : true
            )
            .map((link) => (
              <Can I={link.action} a={link.source}>
                <Link component={RouterLink} to={link.url}>
                  <ListItem button key={link.url}>
                    <ListItemText>{link.label}</ListItemText>
                  </ListItem>
                </Link>
              </Can>
            ))}
        </List>
      </Drawer>
    </>
  )
}
