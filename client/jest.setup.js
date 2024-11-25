import '@testing-library/jest-dom';

jest.mock('./src/App.css', () => ({}));

jest.mock('./src/assets/landing-page-bg.avif', () => 'mocked-image-path');

jest.mock('react-responsive-carousel/lib/styles/carousel.min.css', () => ({}));

jest.mock("axios");

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
})); 

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));