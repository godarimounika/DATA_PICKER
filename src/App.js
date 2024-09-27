import logo from './logo.svg';
import './App.css';
import Calender from './components/Calender';
import DataPicker from './components/DataPicker';
import RecurrenceForm from './components/RecurrenceForm';

function App() {
  return (
    <div className="App">
     <DataPicker/>
     {/* <RecurrenceForm/> */}
     {/* <Calender/> */}
    </div>
  );
}

export default App;
