import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Alert, AlertTitle, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useParams } from 'react-router-dom';
import api from '../components/API/Api';

interface Item {
  id: number;
  color: string;
  name: string;
  pantone_value: string;
  year: number;
}
const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [navigation, setNavigation] = useState(1);
  const [currentItem, setCurrentItem] = useState<number>(-1);
  const [modal, setModal] = useState(false);
  const [warning, setWarning] = useState({ open: false, message: '' });
  const [search, setSearch] = useState<number>(0);
  const { itemId } = useParams();

  // function that handle data fetch from API endpoint
  const fetchItems = useCallback(
    async (searchId = 0) => {
      try {
        let id = '0';
        if (searchId) {
          id = searchId.toString();
        } else if (!searchId && itemId) {
          id = itemId;
        }
        const prod = await api.get(
          id !== '0' ? `/${id}` : `?page=${navigation}&per_page=5`,
          {}
        );
        if (id === '0') {
          setItems(prod.data.data);
        } else {
          setItems([prod.data.data]);
        }
        setSearch(searchId);
      } catch (e: any) {
        if (e.message === 'Request failed with status code 404') {
          setWarning({
            open: true,
            message: `No such item with provided Id = ${searchId}`,
          });
        } else {
          setWarning({ open: true, message: e.message });
        }
        await fetchItems();
      }
    },
    [navigation, itemId]
  );
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // switching between pages
  const switchPage = (n: number) => {
    setNavigation((nav) => nav + n);
  };

  // handle input, filter results by id
  const searchChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const id: number =
      Number(e.target.value) > 0 ? Number(e.target.value) : Number(0);
    fetchItems(id);
  };

  // id of item provided to modal, presenting all item data
  const getId = (id: number, minus = 0) => {
    setCurrentItem(id - minus);
    setModal(true);
  };
  // function that handle modal close
  const closeModal = () => {
    setModal(false);
    setCurrentItem(-1);
  };

  return (
    <>
      {warning.open && (
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setWarning({ open: false, message: '' });
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          severity="error"
          sx={{ mb: 2 }}
        >
          <AlertTitle>Error</AlertTitle>
          {warning.message}
        </Alert>
      )}
      <Modal
        open={modal}
        onClose={() => closeModal()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            All item data:
          </Typography>
          {items && items.length > 0 && currentItem > -1 && (
            <>
              <Typography sx={{ mt: 2 }}>
                Id: {items[currentItem].id}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                Color: {items[currentItem].color}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                Name: {items[currentItem].name}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                Pantone value: {items[currentItem].pantone_value}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                Year: {items[currentItem].year}
              </Typography>
            </>
          )}
        </Box>
      </Modal>
      <TextField
        sx={{ mb: 1, width: 1 }}
        id="outlined-basic"
        label="Search"
        variant="outlined"
        type="number"
        value={search || ''}
        onChange={(e) => searchChange(e)}
      />
      <TableContainer component={Paper} sx={{ mb: 1 }}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Year</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items &&
              items.length > 0 &&
              items.map((item, id) => (
                <TableRow
                  key={item.id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    bgcolor: `${item.color}`,
                  }}
                  onClick={() => getId(id)}
                >
                  <TableCell component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.year}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {navigation === 1 ? (
        <Button variant="text" disabled>
          <ArrowBackIcon />
        </Button>
      ) : (
        <Button variant="text" onClick={() => switchPage(-1)}>
          <ArrowBackIcon />
        </Button>
      )}
      {items.length < 5 ? (
        <Button variant="text" disabled>
          <ArrowForwardIcon />
        </Button>
      ) : (
        <Button variant="text" onClick={() => switchPage(1)}>
          <ArrowForwardIcon />
        </Button>
      )}
    </>
  );
}
export default Home;
