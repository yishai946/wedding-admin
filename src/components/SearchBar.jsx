import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function SearchBar({guestsList, openModal}) {
  const guests = guestsList.map((guest) => {
    const firstLetter = guest.name[0];
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...guest,
    };
  });

  return (
    <Autocomplete
      options={guests.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
      groupBy={(guest) => guest.firstLetter}
      getOptionLabel={(guest) => guest.name}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="חפש אורח" />}
      onChange={(event, value) => openModal(value)} 
      />
  );
}