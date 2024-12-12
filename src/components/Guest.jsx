import React from "react";
import "../App.css"

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';

  function generate(element) {
    return [0].map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }

const Guest = ({guestData, openModal}) => { return (
    generate(
			<ListItem>
				<ListItemIcon>
					{guestData.isAttending ? (  
						<CheckIcon color="success" />
					) : (
						<CloseIcon color="error" />
					)} 
				</ListItemIcon>
				<ListItemText
					primary={guestData.name + " - " + guestData.guests}
					secondary={guestData.phone}
				/>
				<ListItemIcon>
					<button className="button" onClick={() => openModal(guestData)}>
						<MoreVertIcon />
					</button>
				</ListItemIcon>
			</ListItem>
		)
	)
}

export default Guest;