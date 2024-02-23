import React, { useEffect, useState } from 'react';
import MainScreen from '../../Components/MainScreen';
import { Link } from 'react-router-dom';
import { Button, Card, Badge, Accordion } from 'react-bootstrap';
import axios from 'axios';

export default function MyNotes() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const { data } = await axios.get('/api/notes');
    setNotes(data)
  };
  console.log(notes);

  useEffect(() => {
    fetchNotes();
  }, []);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete')) {
    }
  };
  return (
    <>
      <MainScreen title='Welcome Back Mithun...'>
        <Link to='createnote'>
          <Button style={{ marginLeft: 10, marginBottom: 6 }} size='lg'>
            Create New Note
          </Button>
        </Link>
        {notes.map((note, index) => (
          <Accordion key={index}>
            <Card style={{ margin: 10 }}>
              <Card.Header style={{ display: 'flex' }}>
                <span
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                    flex: 1,
                    cursor: 'pointer',
                    alignSelf: 'center',
                    fontSize: 18,
                  }}
                >
                  <Accordion.Toggle as={Card.Text} variant='link' eventKey='0'>
                    {note.title}
                  </Accordion.Toggle>
                </span>

                <div>
                  <Button href={`/note/${note._id}`}>Edit</Button>
                  <Button
                    onClick={() => deleteHandler(note._id)}
                    variant='danger'
                    className='mx-2'
                  >
                    Delete
                  </Button>
                </div>
              </Card.Header>
              <Accordion.Collapse eventKey='0'>
                <Card.Body>
                  <h4>
                    <Badge variant='success'>Category-{note.category}</Badge>
                  </h4>
                  <blockquote className='blockquote mb-0'>
                    <p>{note.content}</p>
                    <footer className='blockquote-footer'>
                      Created On -Date
                    </footer>
                  </blockquote>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        ))}
      </MainScreen>
    </>
  );
}
