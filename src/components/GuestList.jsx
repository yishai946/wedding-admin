import React, {useState} from "react";
import Guest from "./Guest";
import "../App.css";
import Loader from "./Loader";
import SearchBar from "./SearchBar";

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';


const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));
  
  const GuestList = ({ guests, deleteGuest, loading, amount }) => {
    const [selectedGuest, setSelectedGuest] = useState(null);
    const [open, setOpen] = useState(false);

    const openModal = (guest) => {
      setSelectedGuest(guest);
      setOpen(true);
    }

    const closeModal = () => {
      setOpen(false);
      setSelectedGuest(null);
    }

    const handleDelete = () => {
      deleteGuest(selectedGuest.id)
      closeModal();
    }

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: "50%",
      bgcolor: 'background.paper',
      borderRadius: 2,
      boxShadow: 24,
      p: 4,
    };

    return guests.length > 0 ? (
      <div>
        {selectedGuest &&
          <Modal
            open={open}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {loading ? (
                <div style={{display: "flex", width: "100%", justifyContent: "center", alignItems: "center"}}>
                  <Loader isVisible={loading} />
                </div>
              ) : (
                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                  <button className="button" onClick={handleDelete}>
                    {selectedGuest.isAttending ? (  
                      <CheckIcon color="success" />
					          ) : (
						          <CloseIcon color="error" />
					          )} 
                  </button>
                  <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <Typography id="modal-modal-title" variant="h5" component="h3">
                      {selectedGuest.name}
                    </Typography>
                    <br />
                    <Typography id="modal-modal-title" variant="h6" component="h4">
                      מגיעים: {selectedGuest.guests}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      {selectedGuest.phone}
                    </Typography>
                  </div>
                  <button className="button" onClick={handleDelete}>
                    <DeleteIcon />
                  </button>
                </div>
              )}
            </Box>
          </Modal>
        }

        <Grid item xs={12} md={6}>
          <div className="header">
            <Typography sx={{ mt: 4, mb: 2 }} variant="h4" component="div" style={{fontWeight: "bold"}}>
              אורחים: {amount}
            </Typography>
            <SearchBar guestsList={guests} openModal={openModal} />
          </div>
            <Demo>
              <List>
                {guests.map((guest, index) => 
                  <Guest guestData={guest} openModal={openModal} key={index} />
                )}
              </List>
            </Demo>
        </Grid>
      </div>
    ) : (
      <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
        <Loader isVisible={loading} />
      </div>
    )
    
}

export default GuestList;