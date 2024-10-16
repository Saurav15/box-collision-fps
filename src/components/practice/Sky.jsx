import React from "react";
import * as THREE from "three";

function Sky() {
  return (
    <>
      <mesh>
        <sphereGeometry args={[500, 32, 32]} />
        <meshBasicMaterial color={"#87CEEB"} side={THREE.BackSide} />
      </mesh>
    </>
  );
}

export default Sky;
