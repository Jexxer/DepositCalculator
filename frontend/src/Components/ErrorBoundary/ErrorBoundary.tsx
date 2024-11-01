import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ErrorBoundary = () => {
  const error = useRouteError();

  const getErrorMessage = () => {
    if (isRouteErrorResponse(error)) {
      switch (error.status) {
        case 404:
          return "This page doesn't exist.";
        case 401:
          return "You aren't authorized to see this.";
        case 503:
          return "Looks like our API is down.";
        case 418:
          return "I'm a teapot (Error 418).";
        default:
          return "Something went wrong.";
      }
    }
    return "An unexpected error occurred.";
  };

  return (
    <Container maxWidth="sm" className="w-full h-full flex items-center justify-center h-screen content-center">
      <Box className="text-center p-4 rounded shadow-md bg-white">
        <Typography variant="h3" component="h1" className="text-gray-800">
          Oops!
        </Typography>
        <Typography variant="body1" className="text-gray-600 !mb-2">
          {getErrorMessage()}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/"
          className="bg-blue-500 hover:bg-blue-700"
        >
          Go Home
        </Button>
      </Box>
    </Container>
  );
}

export default ErrorBoundary;
