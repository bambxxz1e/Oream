import Navigatebar from "./component/navigatebar";
import Todolist from "./component/Todolist";

export default function SomePage() {
  return (
    <div style={{padding: 16}}>
      <Navigatebar initial="home" />
      <Todolist />
    </div>
  );
}
