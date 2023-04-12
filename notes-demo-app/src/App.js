import logo from './logo.svg';
import './App.css';
import { AppBar, Box, Button, Card, CardActions, CardContent, Grid, Modal, TextField, Toolbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Note from './components/Note';

function App()
{
  const [notes, setNotes] = useState([]);
  const [filteredList, setFitlerNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [openModal, setOpen] = useState(false);
  const [selId, setSelId] = useState(0);
  const [selTxt, setSelTxt] = useState('');
  const [selDesc, setSelDesc] = useState('');

  useEffect(() =>
  {
    loadData()
  }, []);
  const loadData = () =>
  {
    fetch("https://localhost:7272/api/Notes")
      .then(response => response.json())
      .then(data =>
      {
        setNotes(data);
        setFitlerNotes(data);
        setSearch('')
      }).catch(e =>
      {
        setNotes([]);
        setFitlerNotes([])
        setSearch('')
      })
  }
  const filterData = (val) =>
  {
    if (val !== '')
    {
      let list = notes.filter(note => note.title.toLowerCase().indexOf(val.toLowerCase()) > -1 || note.desc.toLowerCase().indexOf(val.toLowerCase()) > -1)
      setFitlerNotes(list);
    }
    else
    {
      setFitlerNotes(notes);
    }
  }

  const doSearch = (e) =>
  {
    setSearch(e.target.value);
    filterData(e.target.value)
  }
  const createNote = () =>
  {
    setSelId(0);
    setSelTxt('');
    setSelDesc('');
    setOpen(true)
  }

  const save = () =>
  {
    if (selTxt !== '' && selDesc != '')
    {
      if (selId === 0)
      {
        fetch('https://localhost:7272/api/Notes', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({ id: 0, title: selTxt, desc: selDesc })
        }).then(e =>
        {
          loadData();
          setOpen(false);
        }).catch(e =>
        {
          setOpen(false);
        });
      }
      else
      {

        fetch('https://localhost:7272/api/Notes', {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({ id: selId, title: selTxt, desc: selDesc })
        }).then(e =>
        {
          loadData();
          setOpen(false);
        }).catch(e =>
        {
          setOpen(false);
        });
      }
    }
    else
    {
      alert('Title and description is required')
    }
  }
  const edit = (id, txt, desc) =>
  {
    setSelId(id);
    setSelTxt(txt);
    setSelDesc(desc);
    setOpen(true)
  }
  const deleteNote = (id) =>
  {
    fetch(`https://localhost:7272/api/Notes/${id}`, {
      method: "DELETE",
    }).then(e =>
    {
      loadData();
      setOpen(false);
    }).catch(e =>
    {
      setOpen(false);
    });

  }

  return (
    // <div style={{ backgroundColor: '#fafaF0' }}>
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              Notes App
            </Typography>
            <TextField placeholder='Search...' style={{ marginLeft: 20 }} value={search} onChange={doSearch}></TextField>
          </Toolbar>
        </AppBar>
      </Box >
      <Modal open={openModal}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter Note Details
          </Typography>
          <TextField value={selTxt} placeholder='Title' fullWidth style={{ padding: 5 }} onChange={e => setSelTxt(e.target.value)}></TextField>
          <TextField rows={4} multiline value={selDesc} placeholder='Description' fullWidth style={{ padding: 5 }} onChange={e => setSelDesc(e.target.value)} ></TextField>
          <Button variant='contained' onClick={save}>Save</Button>
          <Button variant='contained' onClick={() => setOpen(false)}>Close</Button>
        </Box>
      </Modal>

      <Grid >
        <Grid lg={12} style={{ padding: 20, display: 'flex', justifyItems: 'center', alignItems: 'center', justifyContent: 'center' }} >
          <Button variant='outlined' style={{ width: 300, }} onClick={e => createNote()} >Take Note</Button>
        </Grid>
        <Grid lg={12} style={{ padding: 30 }} >
          <Grid item lg={12} xs={12}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              NOTES
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid container lg={12} style={{ padding: 30, }} >
        {
          filteredList?.length > 0 ? filteredList?.map(note =>
            <Grid item lg={12 / 5} style={{ padding: 10 }} >
              <Note note={note} edit={edit} deleteNote={deleteNote}></Note>
            </Grid>
          ) : 'No notes are added. Please click take a note button to add a note'
        }
      </Grid >
    </>
  );
}

export default App;
