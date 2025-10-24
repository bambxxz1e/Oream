import HashtagSelector from "./component/HashtagSelector";
import ProgressBar from "./component/ProgressBar";
import EditableTitle from "./component/EditableTitle";
import Todolist from "./component/Todolist";

function App() {
  return (
    <div>
      <ProgressBar />
      <EditableTitle />
      <HashtagSelector />
      <Todolist/>
    </div>
  );
}

export default App;
