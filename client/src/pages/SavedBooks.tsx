import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import { Navigate, useParams } from 'react-router-dom';
import { QUERY_ME } from '../utils/queries';
import { useMutation, useQuery } from '@apollo/client';
import { REMOVE_BOOK } from '../utils/mutations';

const SavedBooks = () => {

  // GraphQL for REMOVE_BOOK
  const [removeBook] = useMutation(REMOVE_BOOK);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId: string) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {

    // GraphQL mutation
      await removeBook({
        variables: {
          bookId: bookId
        },
      })

      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // GraphQl for QUERY_BOOK
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(QUERY_ME, {
    variables: {username: userParam },
  });

  const user = data?.me || data?.user;
  if(Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/saved" />;
  }
  if(loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className='text-light bg-dark p-5'>
        <Container>
          {user.username ? (
            <h1>Viewing {user.username}'s saved books!</h1>
          ) : (
            <h1>Viewing saved books!</h1>
          )}
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {user.savedBooks.length
            ? `Viewing ${user.savedBooks.length} saved ${
                user.savedBooks.length === 1 ? 'book' : 'books'
              }:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {user.savedBooks.map((book) => {
            return (
              <Col md='4'>
                <Card key={book.bookId} border='dark'>
                  {book.image ? (
                    <Card.Img
                      src={book.image}
                      alt={`The cover for ${book.title}`}
                      variant='top'
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button
                      className='btn-block btn-danger'
                      onClick={() => handleDeleteBook(book.bookId)}
                    >
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
