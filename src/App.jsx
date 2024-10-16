import "./App.css";
import { Canvas } from "@react-three/fiber";
import BasicScene from "./components/BasicScene";
import { Helper } from "./components/helper-components/Helper";
import GroundGrass from "./components/practice/GroundGrass";
import Sky from "./components/practice/Sky";
import Practice from "./components/practice/Practice";

function App() {
  return (
    <>
      {/* Canvas is the thing that fiber gives us which automatically sets up the renderer and the camera. */}
      <Canvas>
        <axesHelper scale={[15, 15, 15]} />
        <Helper />
        {/* <BasicScene /> */}
        <Practice />
        <GroundGrass />
        <Sky />
      </Canvas>
    </>
  );
}

export default App;
