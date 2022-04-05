import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Slide,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';

interface DialogEditProps {
  name: string;
  price: number;
  description?: string;
  handleClickOpenEdit: () => void;
  handleCloseEdit: () => void;
  dialogEdit: boolean;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function DialogEdit({
  name,
  price,
  description,
  handleClickOpenEdit,
  handleCloseEdit,
  dialogEdit,
}: DialogEditProps): JSX.Element {
  return (
    <>
      <Button variant="outlined" onClick={handleClickOpenEdit}>
        Open full-screen dialog
      </Button>
      <Dialog
        fullScreen
        open={dialogEdit}
        onClose={handleCloseEdit}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleCloseEdit} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleCloseEdit}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText primary={name} secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary={price} secondary="Tethys" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary={description || ''} secondary="Titania" />
          </ListItem>
        </List>
      </Dialog>
    </>
  );
}
