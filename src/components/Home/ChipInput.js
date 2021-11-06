import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';

import { TextField } from '@mui/material';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.3),
}));

// Initial Array should be grabbed state from the data layer

export default function ChipsArray({ initialArray, setTags }) {
  const [newChip, setNewChip] = useState('');

  const handleDelete = (chipToDelete) => () => {
    setTags((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  // Creates a new tag then sends
  const handleTagEnter = (event) => {
    if (event.key === 'Enter') {
      const newTag = { key: initialArray.length, label: newChip };
      setTags((tags) => [...tags, newTag]);
      setNewChip('');
    }
  };

  return (
    <>
      {initialArray.length > 0 ? (
        <Paper
          sx={{
            display: 'flex',
            justifyContent: 'start',
            flexWrap: 'wrap',
            listStyle: 'none',
            p: 0.1,
          }}
          component="ul"
          elevation={0}
        >
          {initialArray.map((data) => {
            let icon;

            return (
              <ListItem key={data.key}>
                <Chip
                  color="primary"
                  icon={icon}
                  label={data.label}
                  onDelete={handleDelete(data)}
                  variant="outlined"
                />
              </ListItem>
            );
          })}
        </Paper>
      ) : (
        <br />
      )}

      <TextField
        name="search"
        variant="outlined"
        label="Search Tags"
        fullWidth
        value={newChip}
        onChange={(event) => setNewChip(event.target.value)}
        onKeyPress={handleTagEnter}
        sx={{
          marginBottom: 2,
        }}
      />
    </>
  );
}
