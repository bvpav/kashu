import React, { useRef, useEffect } from 'react';
import UnityView from '@azesmway/react-native-unity/src';
import { View } from 'react-native';

const UnityApp = () => {
  const unityRef = useRef<UnityView>(null);

  const unityData = {
    name: "I'm Stepa",
    age: 25,
  };

  const jsonedData = JSON.stringify(unityData);

  useEffect(() => {
    SendData(jsonedData);
  }, [jsonedData]);

  // delay function helps us control when to send the data to Unity in ms.
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Send Data function is used to send the data to Unity with a delay.
  async function SendData(data: any) {
    await delay(500);
    // postMessage takes 3 arguments: ReactToUnity is the game Object,
    // GetDatas is the function name we will send the data to in Unity, depends on hierarchy,
    // data is the data we will send.
    unityRef.current?.postMessage('ReactToUnity', 'GetDatas', data);
  }

  return (
    <View style={{ flex: 1 }}>
      <UnityView
        ref={unityRef}
        // style={{ flex: 1 }}
        onUnityMessage={(result) => {
          console.log('Message Here : ', result.nativeEvent.message);
        }}
      />
    </View>
  );
};

export default UnityApp;
