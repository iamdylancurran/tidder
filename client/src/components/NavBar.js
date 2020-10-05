import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: '2em',
    backgroundColor: '#fff',
  },
  categoryButton: {
    marginRight: theme.spacing(1),
  },
  selectedCategoryButton: {
    marginRight: theme.spacing(1),
    borderBottom: `2px solid ${theme.palette.primary.main}`,
  },
}));

const categoryList = [
  {
    id: 1,
    category: 'hot',
  },
  {
    id: 2,
    category: 'best',
  },
  {
    id: 3,
    category: 'top',
  },
  {
    id: 4,
    category: 'new',
  },
  {
    id: 5,
    category: 'rising',
  },
  {
    id: 6,
    category: 'controversial',
  },
];

const NavBar = ({ category, setCategory }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        color="transparent"
        style={{ boxShadow: 'none' }}
      >
        <Toolbar>
          <Box
            display="flex"
            flexGrow={1}
            alignItems="center"
            justifyContent="center"
          >
            {categoryList.map((item) => (
              <CategoryButton key={item.id} link={`/read/${item.category}`}>
                {item.category}
              </CategoryButton>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const CategoryButton = ({ link, children }) => {
  const classes = useStyles();

  return (
    <Button className={classes.categoryButton} href={link}>
      {children}
    </Button>
  );
};

export default NavBar;
