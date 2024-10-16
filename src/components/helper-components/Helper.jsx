import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export const Helper = () => {
  const { scene, gl, camera } = useThree();
  const spotlightRef = useRef(null);

  const splHelper = useRef();

  // useEffect(() => {
  //   // This code will add the spotlight helper to the spotlight.
  //   if (spotlightRef.current) {
  //     if (splHelper.current) {
  //       scene.remove(splHelper.current);
  //     }
  //     splHelper.current = new THREE.SpotLightHelper(spotlightRef.current);

  //     // Updating the resolution of shadows by increasing the height and width of shadowmap
  //     spotlightRef.current.shadow.mapSize.height = 2048;
  //     spotlightRef.current.shadow.mapSize.width = 2048;
  //     // Lights in order to create a shadow also uses camera internally, we can access it and change the near and far points.
  //     spotlightRef.current.shadow.camera.near = 3;
  //     spotlightRef.current.shadow.camera.far = 20;
  //     // console.log((spotlightRef.current.shadow.camera.fov = 90));
  //     scene.add(splHelper.current);

  //     // In order to view the camera of the spotlight we created we will add camera helper.
  //     const spotLightCameraHelper = new THREE.CameraHelper(
  //       spotlightRef.current.shadow.camera
  //     );
  //     scene.add(spotLightCameraHelper);
  //   }
  //   // Camera helper to view the camera.
  //   // const prespectiveCameraHelper = new THREE.CameraHelper(camera);
  //   // scene.add(prespectiveCameraHelper);

  //   // This code will set the shadow property of the renderer to true.
  //   gl.shadowMap.enabled = true;
  // }, []);

  return (
    <>
      {/* <spotLight
        ref={spotlightRef}
        position={[0, 8, 6]}
        intensity={30}
        castShadow={false}
      />
      <spotLight
        ref={spotlightRef}
        position={[0, 8, -6]}
        intensity={100}
        castShadow={true}
      /> */}
      <ambientLight />
      <OrbitControls camera={camera} />
    </>
  );
};
