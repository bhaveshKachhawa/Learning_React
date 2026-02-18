import './index.css';
import {createRoot} from 'react-dom/client';
import Test from './component/easy/Test';
//check app1 refactor

const root = createRoot(document.getElementById('root'));
root.render(<Test />);