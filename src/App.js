"use client";

import React, { useEffect, useState, useRef } from 'react';
import { TopicClient, CredentialProvider, Configurations } from '@gomomento/sdk-web';

const token = "";

function App() {
  var [topicClient, setTopicClient] = useState(null);
  const topicClientRef = useRef(topicClient);
  const [isLoaded, setLoaded] = useState(false);

  const updateTopicClient = (client) => {
    topicClientRef.current = client;
    setTopicClient(client);
  };

  useEffect(() => {
    topicClientRef.current = topicClient;
  }, [topicClient]);

  useEffect(() => {
    async function setupMomento() {
      initializeTopicClient();
    }

    if (!topicClient) {
      setupMomento();
    }
  }, []);

  const initializeTopicClient = async () => {
    topicClient = new TopicClient({
      configuration: Configurations.Browser.v1(),
      credentialProvider: CredentialProvider.fromString({ authToken: token })
    });

    updateTopicClient(topicClient);

    await topicClient.subscribe('room', `join-room`, {
      onItem: (data) => setLoaded(true),
      onError: (err) => console.log(err)
    });
  };
  
  const subscribeMessage = async (newMessage) => {
    console.log(newMessage);
    
  };

  const loadQR = async (event) => {
    topicClient.publish('room', `join-room`, "join-room");
  };

  return (
    <div>
      <button onClick={loadQR}>
        データを取得
      </button>

      {isLoaded ? (
        <div>QRロード完了</div>
      ) : (
        <div>QRロード待ち</div>
      )}
    </div>
  );
};

export default App;