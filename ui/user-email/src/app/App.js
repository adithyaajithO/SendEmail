import { BrowserRouter } from "react-router-dom";
import {
  createMuiTheme,
  ThemeProvider,
  responsiveFontSizes
} from '@material-ui/core/styles';
import Routes from './Routes';

const App = ({ baseName }) => {
  let theme = createMuiTheme({});
  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme} >
      <BrowserRouter basename={baseName}>
        <Routes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
